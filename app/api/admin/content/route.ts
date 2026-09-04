import { revalidatePath } from "next/cache";
import { getCmsAdminUser } from "@/lib/supabase/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type Resource = "gallery" | "event" | "release";
type TableName = "gallery_items" | "appearances" | "releases";

const tables: Record<Resource, TableName> = {
  gallery: "gallery_items",
  event: "appearances",
  release: "releases",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim().slice(0, 2000) : fallback;
}

function has(data: Record<string, unknown>, key: string) {
  return Object.prototype.hasOwnProperty.call(data, key);
}

function safeUrl(value: unknown) {
  const candidate = text(value);
  if (!candidate) return "";
  if (candidate.startsWith("/")) return candidate;
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:" ? candidate : "";
  } catch {
    return "";
  }
}

function bool(value: unknown, fallback = true) {
  return typeof value === "boolean" ? value : fallback;
}

function resourceFrom(value: unknown): Resource | null {
  if (value === "gallery" || value === "event" || value === "release") return value;
  if (value === "events") return "event";
  if (value === "mixes" || value === "releases") return "release";
  return null;
}

function cmsSetupError(error: { code?: string; message?: string } | null | undefined) {
  if (error?.code === "PGRST205") {
    return "Supabase CMS tables are not set up yet. Apply the migration in supabase/migrations, then reload.";
  }
  return error?.message ?? "Supabase CMS request failed.";
}

async function requireAdmin() {
  return getCmsAdminUser();
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

  const settingsContent = isRecord(settings.data?.content) ? settings.data.content : {};
  return Response.json({
    settings: settingsContent,
    mixes: mixes.data ?? [],
    appearances: appearances.data ?? [],
    gallery: gallery.data ?? [],
    socials: Array.isArray(settingsContent.socials) ? settingsContent.socials : [],
    pressKit: pressKit.data?.content ?? {},
  });
}

export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Sign in with an approved CMS account." }, { status: 401 });

  const parsed = await readBody(request);
  if (!parsed.ok) return parsed.response;
  const resource = resourceFrom(parsed.body.resource);
  if (!resource) return Response.json({ error: "Choose a valid CMS collection." }, { status: 400 });
  if (!isRecord(parsed.body.data)) return Response.json({ error: "Add the fields for this item before saving." }, { status: 400 });

  const row = normalizeRow(resource, parsed.body.data, false);
  if (!row.ok) return Response.json({ error: row.error }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const sortOrder = await nextSortOrder(supabase, tables[resource]);
  if (sortOrder.error) return Response.json({ error: cmsSetupError(sortOrder.error) }, { status: 500 });

  const result = await supabase.from(tables[resource]).insert({ ...row.value, sort_order: sortOrder.value }).select("*").single();
  if (result.error) return Response.json({ error: cmsSetupError(result.error) }, { status: result.error.code === "PGRST205" ? 503 : 500 });

  revalidateSite();
  return Response.json({ item: result.data, saved: true });
}

export async function PATCH(request: Request) {
  return updateItem(request);
}

export async function PUT(request: Request) {
  return updateItem(request);
}

async function updateItem(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Sign in with an approved CMS account." }, { status: 401 });

  const parsed = await readBody(request);
  if (!parsed.ok) return parsed.response;
  const resource = resourceFrom(parsed.body.resource);
  const id = text(parsed.body.id);
  if (!resource || !id) return Response.json({ error: "A collection and item id are required." }, { status: 400 });
  if (!isRecord(parsed.body.data)) return Response.json({ error: "Add the fields for this item before saving." }, { status: 400 });

  const row = normalizeRow(resource, parsed.body.data, true);
  if (!row.ok) return Response.json({ error: row.error }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const result = await supabase.from(tables[resource]).update({ ...row.value, updated_at: new Date().toISOString() }).eq("id", id).select("*").single();
  if (result.error) return Response.json({ error: result.error.code === "PGRST116" ? "That item no longer exists." : cmsSetupError(result.error) }, { status: result.error.code === "PGRST205" ? 503 : 500 });

  revalidateSite();
  return Response.json({ item: result.data, saved: true });
}

export async function DELETE(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Sign in with an approved CMS account." }, { status: 401 });

  const parsed = await readBody(request);
  if (!parsed.ok) return parsed.response;
  const resource = resourceFrom(parsed.body.resource);
  const id = text(parsed.body.id);
  if (!resource || !id) return Response.json({ error: "A collection and item id are required." }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const result = await supabase.from(tables[resource]).delete().eq("id", id);
  if (result.error) return Response.json({ error: cmsSetupError(result.error) }, { status: result.error.code === "PGRST205" ? 503 : 500 });

  revalidateSite();
  return Response.json({ deleted: true });
}

async function readBody(request: Request): Promise<{ ok: true; body: Record<string, unknown> } | { ok: false; response: Response }> {
  try {
    const body = await request.json();
    if (!isRecord(body)) return { ok: false, response: Response.json({ error: "Request body must be an object." }, { status: 400 }) };
    return { ok: true, body };
  } catch {
    return { ok: false, response: Response.json({ error: "Request body must be valid JSON." }, { status: 400 }) };
  }
}

function normalizeRow(resource: Resource, data: Record<string, unknown>, partial: boolean): { ok: true; value: Record<string, unknown> } | { ok: false; error: string } {
  if (resource === "gallery") {
    const row: Record<string, unknown> = {};
    if (!partial || has(data, "src")) {
      const src = safeUrl(data.src);
      if (!src) return { ok: false, error: "Gallery items need an image URL or a public path such as /images/photo.jpg." };
      row.src = src;
    }
    if (!partial || has(data, "alt")) row.alt = text(data.alt, "SHEF archive image");
    if (!partial || has(data, "code")) row.code = text(data.code, "SHEF / ARCHIVE");
    if (!partial || has(data, "published")) row.published = bool(data.published, true);
    return { ok: true, value: row };
  }

  if (resource === "event") {
    const row: Record<string, unknown> = {};
    if (!partial || has(data, "year")) row.year = text(data.year, "2026");
    if (!partial || has(data, "city")) {
      row.city = text(data.city);
      if (!row.city) return { ok: false, error: "Events need a city or event location." };
    }
    if (!partial || has(data, "venue")) row.venue = text(data.venue, "Live session");
    if (!partial || has(data, "note")) row.note = text(data.note, "Featured set");
    if (!partial || has(data, "href")) row.href = safeUrl(data.href);
    if (!partial || has(data, "published")) row.published = bool(data.published, true);
    return { ok: true, value: row };
  }

  const row: Record<string, unknown> = {};
  if (!partial || has(data, "year")) row.year = text(data.year, "2026");
  if (!partial || has(data, "title")) {
    row.title = text(data.title);
    if (!row.title) return { ok: false, error: "Releases need a title." };
  }
  if (!partial || has(data, "note")) row.note = text(data.note, "SHEF session");
  if (!partial || has(data, "href")) {
    row.href = safeUrl(data.href);
    if (!row.href) return { ok: false, error: "Releases need a valid SoundCloud or external link." };
  }
  if (!partial || has(data, "previewUrl")) row.preview_url = safeUrl(data.previewUrl) || null;
  if (!partial || has(data, "coverImage")) row.cover_image = safeUrl(data.coverImage) || null;
  if (!partial || has(data, "published")) row.published = bool(data.published, true);
  return { ok: true, value: row };
}

async function nextSortOrder(supabase: ReturnType<typeof createSupabaseAdminClient>, table: TableName) {
  const result = await supabase.from(table).select("sort_order").order("sort_order", { ascending: false }).limit(1).maybeSingle();
  return { value: (result.data?.sort_order ?? -1) + 1, error: result.error };
}

function revalidateSite() {
  revalidatePath("/");
  revalidatePath("/press-kit");
}
