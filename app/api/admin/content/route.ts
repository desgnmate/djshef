import { revalidatePath } from "next/cache";
import { getCmsAdminUser } from "@/lib/supabase/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type CmsPayload = {
  settings?: Record<string, unknown>;
  mixes?: Array<Record<string, unknown>>;
  appearances?: Array<Record<string, unknown>>;
  gallery?: Array<Record<string, unknown>>;
  socials?: Array<Record<string, unknown>>;
  pressKit?: Record<string, unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim().slice(0, 2000) : fallback;
}

function list(value: unknown) {
  return Array.isArray(value) ? value.filter(isRecord).slice(0, 100) : [];
}

function cmsSetupError(error: { code?: string; message?: string } | null | undefined) {
  if (error?.code === "PGRST205") {
    return "Supabase CMS tables are not set up yet. Apply supabase/migrations/20260903103159_shef_cms.sql in the Supabase SQL Editor, then reload.";
  }
  return error?.message ?? "Supabase CMS request failed.";
}

async function requireAdmin() {
  const user = await getCmsAdminUser();
  if (!user) return null;
  return user;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Sign in with an approved CMS account." }, { status: 401 });

  const supabase = createSupabaseAdminClient();
  const [settings, mixes, appearances, gallery, pressKit] = await Promise.all([
    supabase.from("site_settings").select("content").eq("id", "site").maybeSingle(),
    supabase.from("releases").select("*").order("sort_order", { ascending: true }).order("year", { ascending: false }),
    supabase.from("appearances").select("*").order("sort_order", { ascending: true }).order("year", { ascending: false }),
    supabase.from("gallery_items").select("*").order("sort_order", { ascending: true }),
    supabase.from("press_kit").select("content").eq("id", "press").maybeSingle(),
  ]);

  const firstError = [settings, mixes, appearances, gallery, pressKit].find((result) => result.error)?.error;
  if (firstError) return Response.json({ error: cmsSetupError(firstError) }, { status: firstError.code === "PGRST205" ? 503 : 500 });

  return Response.json({
    settings: settings.data?.content ?? {},
    mixes: mixes.data ?? [],
    appearances: appearances.data ?? [],
    gallery: gallery.data ?? [],
    socials: isRecord(settings.data?.content) && Array.isArray(settings.data.content.socials) ? settings.data.content.socials : [],
    pressKit: pressKit.data?.content ?? {},
  });
}

export async function PUT(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Sign in with an approved CMS account." }, { status: 401 });

  let payload: CmsPayload;
  try {
    const body = await request.json();
    if (!isRecord(body)) throw new Error("Content must be a JSON object.");
    payload = body as CmsPayload;
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Invalid JSON." }, { status: 400 });
  }

  if (!isRecord(payload.settings) || !isRecord(payload.pressKit)) {
    return Response.json({ error: "The JSON must include settings and pressKit objects." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const settings = { ...payload.settings, socials: list(payload.socials ?? payload.settings.socials) };
  const settingsResult = await supabase.from("site_settings").upsert({ id: "site", content: settings, updated_at: new Date().toISOString() });
  const pressResult = await supabase.from("press_kit").upsert({ id: "press", content: payload.pressKit, updated_at: new Date().toISOString() });
  if (settingsResult.error || pressResult.error) {
    const error = settingsResult.error ?? pressResult.error;
    return Response.json({ error: cmsSetupError(error) }, { status: error?.code === "PGRST205" ? 503 : 500 });
  }

  const collectionResults = await Promise.all([
    replaceRows(supabase, "releases", list(payload.mixes).map((item, index) => ({
      year: text(item.year, "2026"), title: text(item.title, "SHEF release"), note: text(item.note, "SHEF session"),
      href: text(item.href ?? item.soundcloudUrl), preview_url: text(item.previewUrl ?? item.preview_url) || null,
      cover_image: text(item.coverImage ?? item.cover_image) || null, sort_order: index, published: item.published !== false,
    }))),
    replaceRows(supabase, "appearances", list(payload.appearances).map((item, index) => ({
      year: text(item.year, "2026"), city: text(item.city, "Melbourne"), venue: text(item.venue, "Live session"),
      note: text(item.note, "Featured set"), href: text(item.href), sort_order: index, published: item.published !== false,
    }))),
    replaceRows(supabase, "gallery_items", list(payload.gallery).map((item, index) => ({
      src: text(item.src), alt: text(item.alt, "SHEF archive image"), code: text(item.code, "SHEF / ARCHIVE"),
      sort_order: index, published: item.published !== false,
    }))),
  ]);

  const collectionError = collectionResults.find((result) => result.error)?.error;
  if (collectionError) return Response.json({ error: cmsSetupError(collectionError) }, { status: collectionError.code === "PGRST205" ? 503 : 500 });

  revalidatePath("/");
  revalidatePath("/press-kit");
  return Response.json({ saved: true, updatedBy: user.email });
}

async function replaceRows(
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  table: "releases" | "appearances" | "gallery_items",
  rows: Array<Record<string, unknown>>,
) {
  const existing = await supabase.from(table).select("id");
  if (existing.error) return existing;
  const ids = (existing.data ?? []).map((row) => row.id).filter((id): id is string => typeof id === "string");
  if (ids.length) {
    const deleted = await supabase.from(table).delete().in("id", ids);
    if (deleted.error) return deleted;
  }
  if (!rows.length) return { data: [], error: null };
  return supabase.from(table).insert(rows);
}
