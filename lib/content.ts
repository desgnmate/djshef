import { appearances as fallbackAppearances, gallery as fallbackGallery, mixes as fallbackMixes, socials as fallbackSocials } from "@/data/site";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type Release = {
  year: string;
  title: string;
  note: string;
  href: string;
  previewUrl?: string;
  coverImage?: string;
};

export type Appearance = {
  year: string;
  city: string;
  venue: string;
  note: string;
  href: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
  code: string;
};

export type Social = {
  label: string;
  href: string;
};

export type SiteContent = {
  settings: {
    heroKicker: string;
    heroTitle: string;
    heroEdition: string;
    flavourNotes: string[];
    heroBaseImage: string;
    heroCurtainImage: string;
    manifestoHeadline: [string, string];
    manifestoBody: string;
    manifestoRegion: [string, string];
    musicHeadline: [string, string];
    musicImageCode: string;
    musicImage: string;
    sessionsHeadline: [string, string];
    sessionsIntro: string;
    sessionsFeaturedLabel: string;
    sessionsVideo: string;
    sessionsVideoPoster: string;
    sessionsImageCode: string;
    aboutHeadline: [string, string];
    aboutLead: string;
    aboutParagraphs: string[];
    aboutImage: string;
    aboutImageAlt: string;
    aboutImageCode: string;
    archiveHeadline: string;
    archiveDirection: string;
    bookingHeadline: [string, string];
    bookingImage: string;
    bookingImageAlt: string;
    footerOrbitHeading: string;
    footerOrbitSubline: string;
    seoTitle: string;
    seoDescription: string;
    seoImage: string;
  };
  mixes: Release[];
  appearances: Appearance[];
  gallery: GalleryItem[];
  socials: Social[];
  pressKit: {
    eyebrow: string;
    headline: [string, string];
    lead: string;
    paragraphs: string[];
    facts: Array<{ label: string; value: string }>;
    portraitOne: string;
    portraitOneAlt: string;
    portraitTwo: string;
    portraitTwoAlt: string;
    portraitOneCaption: string;
    portraitTwoCaption: string;
    promoterNotes: Array<{ label: string; copy: string }>;
  };
};

export const fallbackSiteContent: SiteContent = {
  settings: {
    heroKicker: "DJ / AUS ↔ HCMC",
    heroTitle: "SHEF",
    heroEdition: "Cooking heat without a fixed recipe.",
    flavourNotes: ["House", "Hard bounce", "R&B", "Psytrance", "Techno", "No set menu"],
    heroBaseImage: "/images/shef-drive-1196.jpg",
    heroCurtainImage: "/images/shef-drive-orange-45450.jpg",
    manifestoHeadline: ["No set", "menu."],
    manifestoBody: "SHEF moves by instinct: soulful R&B into house, deep grooves into hard bounce, techno into psytrance. The only rule is that the room leaves hotter than it arrived.",
    manifestoRegion: ["Vietnamese–Australian", "HCMC · Melbourne · beyond"],
    musicHeadline: ["Fresh", "from the pass"],
    musicImageCode: "STEMS / NAARM",
    musicImage: "/images/shef-live.jpg",
    sessionsHeadline: ["Where she", "cooked"],
    sessionsIntro: "Club rooms, warehouse energy, radio airwaves, and an R&B world tour stop. Different settings; the same appetite.",
    sessionsFeaturedLabel: "featured sessions",
    sessionsVideo: "/videos/shef-stems-vault.mp4",
    sessionsVideoPoster: "/images/shef-stems-vault-poster.jpg",
    sessionsImageCode: "LIVE / MELBOURNE",
    aboutHeadline: ["Just a", "shef."],
    aboutLead: "Vietnamese–Australian roots. Melbourne club instincts. A growing orbit between Australia, HCMC, and wherever the next room is ready.",
    aboutParagraphs: [
      "SHEF is a cross-genre DJ who treats a set like a shared table: familiar flavours, unexpected combinations, and enough heat to keep everyone leaning in.",
      "Her public mixes move from deep house and R&B to techno, hard bounce, and psytrance. That range is the point. She reads the room first and serves the right plate next.",
    ],
    aboutImage: "/images/shef-green.jpg",
    aboutImageAlt: "SHEF in a green look surrounded by red roses",
    aboutImageCode: "AFTER HOURS / 2026",
    archiveHeadline: "Plates & places",
    archiveDirection: "Drag / scroll to travel",
    bookingHeadline: ["Put SHEF", "on the menu."],
    bookingImage: "/images/shef-drive-orange-45390.jpg",
    bookingImageAlt: "SHEF in a coral editorial portrait",
    footerOrbitHeading: "Melbourne ↔ HCMC",
    footerOrbitSubline: "House · Bounce · R&B · Techno",
    seoTitle: "SHEF — DJ / No Set Menu",
    seoDescription: "Official site for Vietnamese–Australian DJ SHEF. Listen to mixes spanning house, R&B, techno, hard bounce, and psytrance; view the press kit and booking information.",
    seoImage: "/images/shef-drive-1196.jpg",
  },
  mixes: fallbackMixes.map((mix) => ({ ...mix })),
  appearances: fallbackAppearances.map((appearance) => ({ ...appearance })),
  gallery: fallbackGallery.map((item) => ({ ...item, code: item.code.replace("—", "-") })),
  socials: fallbackSocials.map((social) => ({ ...social })),
  pressKit: {
    eyebrow: "Official electronic press kit / 2026",
    headline: ["No set menu.", "Always enough heat."],
    lead: "SHEF is a Vietnamese–Australian DJ working between Ho Chi Minh City and Australia, with Melbourne at the centre of her club story.",
    paragraphs: [
      "Her sets are built by feel rather than genre borders. House and deep grooves meet soulful R&B, hard bounce, techno, and psytrance, switching temperature without losing the room.",
      "Recent highlights include a Brisbane opening set for Jenevieve’s sold-out Crysalis Tour, a B2B at Melbourne’s Trieye underground warehouse rave, a STEMS Official appearance, and DG Radio: Episode 21 for Dangerous Goods.",
    ],
    facts: [
      { label: "Roots", value: "Vietnamese–Australian" },
      { label: "Orbit", value: "HCMC / Australia" },
      { label: "Club base", value: "Melbourne" },
      { label: "Format", value: "Cross-genre DJ" },
      { label: "Sound", value: "House / bounce / R&B" },
      { label: "Featured", value: "DG Radio 21" },
    ],
    portraitOne: "/images/shef-drive-1247.jpg",
    portraitOneAlt: "SHEF black leather press portrait",
    portraitTwo: "/images/shef-drive-orange-45422.jpg",
    portraitTwoAlt: "SHEF in a coral editorial look",
    portraitOneCaption: "Press portrait 01 / supplied folder",
    portraitTwoCaption: "Press portrait 02 / supplied folder",
    promoterNotes: [
      { label: "Event", copy: "Date, city, venue, event type, and expected capacity" },
      { label: "Lineup", copy: "Full bill, proposed set time, and requested set length" },
      { label: "Booth", copy: "Available players, mixer, monitor setup, and venue sound contact" },
      { label: "Travel", copy: "Transport, accommodation, visas, and ground-transfer plan where applicable" },
      { label: "Offer", copy: "Fee, currency, payment terms, and inclusions stated clearly" },
    ],
  },
};

function nonEmptyString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function stringArray(value: unknown, fallback: string[]) {
  return Array.isArray(value) && value.every((item) => typeof item === "string") && value.length ? value as string[] : fallback;
}

function headlinePair(value: unknown, fallback: [string, string]): [string, string] {
  const values = stringArray(value, fallback);
  return [values[0] ?? fallback[0], values[1] ?? fallback[1]];
}

type RawContent = {
  settings?: Record<string, unknown> | null;
  releases?: Array<Record<string, unknown>> | null;
  appearances?: Array<Record<string, unknown>> | null;
  gallery?: Array<Record<string, unknown>> | null;
  pressKit?: Record<string, unknown> | null;
};

function normalizeContent(raw: RawContent): SiteContent {
  const source = raw.settings ?? {};
  const settings = fallbackSiteContent.settings;
  const releaseItems = raw.releases?.filter((item) => typeof item.title === "string" && (typeof item.href === "string" || typeof item.soundcloudUrl === "string")).map((item) => ({
    year: nonEmptyString(item.year, "2026"),
    title: nonEmptyString(item.title, "SHEF release"),
    note: nonEmptyString(item.note, "SHEF session"),
    href: nonEmptyString(item.href ?? item.soundcloudUrl, "https://soundcloud.com/shef-699974995"),
    previewUrl: typeof (item.previewUrl ?? item.preview_url) === "string" ? (item.previewUrl ?? item.preview_url) as string : undefined,
    coverImage: typeof (item.coverImage ?? item.cover_image) === "string" ? (item.coverImage ?? item.cover_image) as string : undefined,
  })) ?? [];
  const appearanceItems = raw.appearances?.filter((item) => typeof item.city === "string").map((item) => ({
    year: nonEmptyString(item.year, "2026"),
    city: nonEmptyString(item.city, "Melbourne"),
    venue: nonEmptyString(item.venue, "Live session"),
    note: nonEmptyString(item.note, "Featured set"),
    href: nonEmptyString(item.href, "https://soundcloud.com/shef-699974995"),
  })) ?? [];
  const galleryItems = raw.gallery?.filter((item) => typeof item.src === "string").map((item) => ({
    src: nonEmptyString(item.src, settings.aboutImage),
    alt: nonEmptyString(item.alt, settings.aboutImageAlt),
    code: nonEmptyString(item.code, "SHEF / ARCHIVE"),
  })) ?? [];

  const press = raw.pressKit ?? {};
  const pressFacts = Array.isArray(press.facts) ? press.facts.filter((item): item is { label: string; value: string } => Boolean(item && typeof item === "object" && typeof (item as { label?: unknown }).label === "string" && typeof (item as { value?: unknown }).value === "string")) : [];
  const promoterNotes = Array.isArray(press.promoterNotes) ? press.promoterNotes.filter((item): item is { label: string; copy: string } => Boolean(item && typeof item === "object" && typeof (item as { label?: unknown }).label === "string" && typeof (item as { copy?: unknown }).copy === "string")) : [];

  return {
    settings: {
      heroKicker: nonEmptyString(source.heroKicker, settings.heroKicker),
      heroTitle: nonEmptyString(source.heroTitle, settings.heroTitle),
      heroEdition: nonEmptyString(source.heroEdition, settings.heroEdition),
      flavourNotes: stringArray(source.flavourNotes, settings.flavourNotes),
      heroBaseImage: nonEmptyString(source.heroBaseImage, settings.heroBaseImage),
      heroCurtainImage: nonEmptyString(source.heroCurtainImage, settings.heroCurtainImage),
      manifestoHeadline: headlinePair(source.manifestoHeadline, settings.manifestoHeadline),
      manifestoBody: nonEmptyString(source.manifestoBody, settings.manifestoBody),
      manifestoRegion: headlinePair(source.manifestoRegion, settings.manifestoRegion),
      musicHeadline: headlinePair(source.musicHeadline, settings.musicHeadline),
      musicImageCode: nonEmptyString(source.musicImageCode, settings.musicImageCode),
      musicImage: nonEmptyString(source.musicImage, settings.musicImage),
      sessionsHeadline: headlinePair(source.sessionsHeadline, settings.sessionsHeadline),
      sessionsIntro: nonEmptyString(source.sessionsIntro, settings.sessionsIntro),
      sessionsFeaturedLabel: nonEmptyString(source.sessionsFeaturedLabel, settings.sessionsFeaturedLabel),
      sessionsVideo: nonEmptyString(source.sessionsVideo, settings.sessionsVideo),
      sessionsVideoPoster: nonEmptyString(source.sessionsVideoPoster, settings.sessionsVideoPoster),
      sessionsImageCode: nonEmptyString(source.sessionsImageCode, settings.sessionsImageCode),
      aboutHeadline: headlinePair(source.aboutHeadline, settings.aboutHeadline),
      aboutLead: nonEmptyString(source.aboutLead, settings.aboutLead),
      aboutParagraphs: stringArray(source.aboutParagraphs, settings.aboutParagraphs),
      aboutImage: nonEmptyString(source.aboutImage, settings.aboutImage),
      aboutImageAlt: nonEmptyString(source.aboutImageAlt, settings.aboutImageAlt),
      aboutImageCode: nonEmptyString(source.aboutImageCode, settings.aboutImageCode),
      archiveHeadline: nonEmptyString(source.archiveHeadline, settings.archiveHeadline),
      archiveDirection: nonEmptyString(source.archiveDirection, settings.archiveDirection),
      bookingHeadline: headlinePair(source.bookingHeadline, settings.bookingHeadline),
      bookingImage: nonEmptyString(source.bookingImage, settings.bookingImage),
      bookingImageAlt: nonEmptyString(source.bookingImageAlt, settings.bookingImageAlt),
      footerOrbitHeading: nonEmptyString(source.footerOrbitHeading, settings.footerOrbitHeading),
      footerOrbitSubline: nonEmptyString(source.footerOrbitSubline, settings.footerOrbitSubline),
      seoTitle: nonEmptyString(source.seoTitle, settings.seoTitle),
      seoDescription: nonEmptyString(source.seoDescription, settings.seoDescription),
      seoImage: nonEmptyString(source.seoImage, settings.seoImage),
    },
    mixes: releaseItems.length ? releaseItems : fallbackSiteContent.mixes,
    appearances: appearanceItems.length ? appearanceItems : fallbackSiteContent.appearances,
    gallery: galleryItems.length ? galleryItems : fallbackSiteContent.gallery,
    socials: Array.isArray(source.socials) ? source.socials.filter((item): item is Social => Boolean(item && typeof item === "object" && typeof (item as { label?: unknown }).label === "string" && typeof (item as { href?: unknown }).href === "string")) : fallbackSiteContent.socials,
    pressKit: {
      eyebrow: nonEmptyString(press.eyebrow, fallbackSiteContent.pressKit.eyebrow),
      headline: headlinePair(press.headline, fallbackSiteContent.pressKit.headline),
      lead: nonEmptyString(press.lead, fallbackSiteContent.pressKit.lead),
      paragraphs: stringArray(press.paragraphs, fallbackSiteContent.pressKit.paragraphs),
      facts: pressFacts.length ? pressFacts : fallbackSiteContent.pressKit.facts,
      portraitOne: nonEmptyString(press.portraitOne, fallbackSiteContent.pressKit.portraitOne),
      portraitOneAlt: nonEmptyString(press.portraitOneAlt, fallbackSiteContent.pressKit.portraitOneAlt),
      portraitTwo: nonEmptyString(press.portraitTwo, fallbackSiteContent.pressKit.portraitTwo),
      portraitTwoAlt: nonEmptyString(press.portraitTwoAlt, fallbackSiteContent.pressKit.portraitTwoAlt),
      portraitOneCaption: nonEmptyString(press.portraitOneCaption, fallbackSiteContent.pressKit.portraitOneCaption),
      portraitTwoCaption: nonEmptyString(press.portraitTwoCaption, fallbackSiteContent.pressKit.portraitTwoCaption),
      promoterNotes: promoterNotes.length ? promoterNotes : fallbackSiteContent.pressKit.promoterNotes,
    },
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured) return fallbackSiteContent;

  try {
    const supabase = await createSupabaseServerClient();
    const [settingsResult, releasesResult, appearancesResult, galleryResult, pressKitResult] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", "site").maybeSingle(),
      supabase.from("releases").select("*").eq("published", true).order("sort_order", { ascending: true }).order("year", { ascending: false }),
      supabase.from("appearances").select("*").eq("published", true).order("sort_order", { ascending: true }).order("year", { ascending: false }),
      supabase.from("gallery_items").select("*").eq("published", true).order("sort_order", { ascending: true }),
      supabase.from("press_kit").select("*").eq("id", "press").maybeSingle(),
    ]);

    if (settingsResult.error || releasesResult.error || appearancesResult.error || galleryResult.error || pressKitResult.error) {
      return fallbackSiteContent;
    }

    return normalizeContent({
      settings: ((settingsResult.data as { content?: unknown } | null)?.content ?? settingsResult.data ?? null) as Record<string, unknown> | null,
      releases: (releasesResult.data ?? []) as Array<Record<string, unknown>>,
      appearances: (appearancesResult.data ?? []) as Array<Record<string, unknown>>,
      gallery: (galleryResult.data ?? []) as Array<Record<string, unknown>>,
      pressKit: ((pressKitResult.data as { content?: unknown } | null)?.content ?? pressKitResult.data ?? null) as Record<string, unknown> | null,
    });
  } catch {
    return fallbackSiteContent;
  }
}
