import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
if (!url || !key) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running cms:seed.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

const settings = {
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
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/shef.dj/" },
    { label: "SoundCloud", href: "https://soundcloud.com/shef-699974995" },
    { label: "DG Radio 21", href: "https://soundcloud.com/dangerous-goods-ent/dg-radio-episode-21-shef" },
  ],
};

const mixes = [
  { year: "2026", title: "Mild High Club — Gangnam KRR", note: "Deep house · Seoul", href: "https://soundcloud.com/shef-699974995/mild-high-club-12-4-26", sort_order: 0, published: true },
  { year: "2026", title: "Jenevieve’s Crysalis Tour", note: "Brisbane opening set · R&B & soul", href: "https://soundcloud.com/shef-699974995/jenevieves-set-bris", sort_order: 1, published: true },
  { year: "2026", title: "DG Radio: Episode 21", note: "Dangerous Goods radio session", href: "https://soundcloud.com/dangerous-goods-ent/dg-radio-episode-21-shef", sort_order: 2, published: true },
  { year: "2025", title: "Psytrance Freestyle Mix", note: "Psytrance · freestyle session", href: "https://soundcloud.com/shef-699974995/psytrance-freestyle-mix-2025-07-13", preview_url: "/audio/shef-psytrance-preview.mp3", cover_image: "/images/shef-soundcloud-banner.jpg", sort_order: 3, published: true },
];

const appearances = [
  { year: "2026", city: "Brisbane", venue: "Jenevieve — Crysalis Tour", note: "Opening set", href: "https://soundcloud.com/shef-699974995/jenevieves-set-bris", sort_order: 0, published: true },
  { year: "2026", city: "Naarm / Melbourne", venue: "STEMS Official", note: "Co-curated with SPN Haus", href: "https://www.instagram.com/stemsofficial.wav/reel/DYgnju0zg4Q/", sort_order: 1, published: true },
  { year: "2026", city: "DG Radio", venue: "Dangerous Goods — Episode 21", note: "Featured mix", href: "https://soundcloud.com/dangerous-goods-ent/dg-radio-episode-21-shef", sort_order: 2, published: true },
  { year: "2025", city: "Melbourne", venue: "Trieye Underground Warehouse", note: "B2B with Marianna", href: "https://soundcloud.com/shef-699974995/trieye-shef-b2b-marianna", sort_order: 3, published: true },
];

const gallery = [
  ["/images/shef-drive-1196.jpg", "SHEF in a black leather studio portrait", "PORTRAIT-01"],
  ["/images/shef-drive-1247.jpg", "SHEF in a black leather studio portrait", "PORTRAIT-02"],
  ["/images/shef-drive-orange-45422.jpg", "SHEF in a coral editorial portrait", "CORAL-03"],
  ["/images/shef-drive-orange-45287.jpg", "SHEF in a coral editorial portrait", "CORAL-04"],
  ["/images/shef-drive-orange-45390.jpg", "SHEF in a coral editorial portrait", "CORAL-05"],
  ["/images/shef-drive-orange-45450.jpg", "SHEF seated in a chainmail editorial look", "CHAIN-06"],
].map(([src, alt, code], sort_order) => ({ src, alt, code, sort_order, published: true }));

const pressKit = {
  eyebrow: "Official electronic press kit / 2026",
  headline: ["No set menu.", "Always enough heat."],
  lead: "SHEF is a Vietnamese–Australian DJ working between Ho Chi Minh City and Australia, with Melbourne at the centre of her club story.",
  paragraphs: [
    "Her sets are built by feel rather than genre borders. House and deep grooves meet soulful R&B, hard bounce, techno, and psytrance, switching temperature without losing the room.",
    "Recent highlights include a Brisbane opening set for Jenevieve’s sold-out Crysalis Tour, a B2B at Melbourne’s Trieye underground warehouse rave, a STEMS Official appearance, and DG Radio: Episode 21 for Dangerous Goods.",
  ],
  facts: [
    { label: "Roots", value: "Vietnamese–Australian" }, { label: "Orbit", value: "HCMC / Australia" },
    { label: "Club base", value: "Melbourne" }, { label: "Format", value: "Cross-genre DJ" },
    { label: "Sound", value: "House / bounce / R&B" }, { label: "Featured", value: "DG Radio 21" },
  ],
  portraitOne: "/images/shef-drive-1247.jpg", portraitOneAlt: "SHEF black leather press portrait",
  portraitTwo: "/images/shef-drive-orange-45422.jpg", portraitTwoAlt: "SHEF in a coral editorial look",
  portraitOneCaption: "Press portrait 01 / supplied folder", portraitTwoCaption: "Press portrait 02 / supplied folder",
  promoterNotes: [
    { label: "Event", copy: "Date, city, venue, event type, and expected capacity" },
    { label: "Lineup", copy: "Full bill, proposed set time, and requested set length" },
    { label: "Booth", copy: "Available players, mixer, monitor setup, and venue sound contact" },
    { label: "Travel", copy: "Transport, accommodation, visas, and ground-transfer plan where applicable" },
    { label: "Offer", copy: "Fee, currency, payment terms, and inclusions stated clearly" },
  ],
};

async function seed() {
  const operations = [
    supabase.from("site_settings").upsert({ id: "site", content: settings }),
    supabase.from("press_kit").upsert({ id: "press", content: pressKit }),
    supabase.from("releases").delete().not("id", "is", null),
    supabase.from("appearances").delete().not("id", "is", null),
    supabase.from("gallery_items").delete().not("id", "is", null),
  ];
  const results = await Promise.all(operations);
  const failure = results.find((result) => result.error);
  if (failure?.error) throw failure.error;
  const inserts = await Promise.all([
    supabase.from("releases").insert(mixes),
    supabase.from("appearances").insert(appearances),
    supabase.from("gallery_items").insert(gallery),
  ]);
  const insertFailure = inserts.find((result) => result.error);
  if (insertFailure?.error) throw insertFailure.error;
  console.log("Seeded SHEF content into Supabase.");
}

seed().catch((error) => { console.error(error.message ?? error); process.exit(1); });
