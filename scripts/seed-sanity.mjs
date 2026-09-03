import { createReadStream, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before running cms:seed.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2026-03-01", useCdn: false, token });
const root = process.cwd();
const imageCache = new Map();
const fileCache = new Map();

async function uploadAsset(kind, relativePath) {
  const cache = kind === "image" ? imageCache : fileCache;
  if (cache.has(relativePath)) return cache.get(relativePath);
  const absolutePath = resolve(root, relativePath);
  if (!existsSync(absolutePath)) throw new Error(`Missing asset: ${relativePath}`);
  const asset = await client.assets.upload(kind, createReadStream(absolutePath), { filename: relativePath.split("/").pop() });
  const reference = { _type: kind === "image" ? "image" : "file", asset: { _type: "reference", _ref: asset._id } };
  cache.set(relativePath, reference);
  return reference;
}

const image = (filename) => uploadAsset("image", `public/images/${filename}`);
const file = (filename) => uploadAsset("file", `public/${filename}`);

const releases = [
  { _id: "release-mild-high-club", year: "2026", title: "Mild High Club — Gangnam KRR", note: "Deep house · Seoul", href: "https://soundcloud.com/shef-699974995/mild-high-club-12-4-26", order: 1 },
  { _id: "release-crysalis-tour", year: "2026", title: "Jenevieve’s Crysalis Tour", note: "Brisbane opening set · R&B & soul", href: "https://soundcloud.com/shef-699974995/jenevieves-set-bris", order: 2 },
  { _id: "release-dg-radio-21", year: "2026", title: "DG Radio: Episode 21", note: "Dangerous Goods radio session", href: "https://soundcloud.com/dangerous-goods-ent/dg-radio-episode-21-shef", order: 3 },
  { _id: "release-psytrance-freestyle", year: "2025", title: "Psytrance Freestyle Mix", note: "Psytrance · freestyle session", href: "https://soundcloud.com/shef-699974995/psytrance-freestyle-mix-2025-07-13", order: 4 },
];

const appearances = [
  { _id: "appearance-brisbane", year: "2026", city: "Brisbane", venue: "Jenevieve — Crysalis Tour", note: "Opening set", href: "https://soundcloud.com/shef-699974995/jenevieves-set-bris", order: 1 },
  { _id: "appearance-naarm", year: "2026", city: "Naarm / Melbourne", venue: "STEMS Official", note: "Co-curated with SPN Haus", href: "https://www.instagram.com/stemsofficial.wav/reel/DYgnju0zg4Q/", order: 2 },
  { _id: "appearance-dg-radio", year: "2026", city: "DG Radio", venue: "Dangerous Goods — Episode 21", note: "Featured mix", href: "https://soundcloud.com/dangerous-goods-ent/dg-radio-episode-21-shef", order: 3 },
  { _id: "appearance-trieye", year: "2025", city: "Melbourne", venue: "Trieye Underground Warehouse", note: "B2B with Marianna", href: "https://soundcloud.com/shef-699974995/trieye-shef-b2b-marianna", order: 4 },
];

const gallery = [
  ["shef-drive-1196.jpg", "SHEF in a black leather studio portrait", "PORTRAIT-01", 1],
  ["shef-drive-1247.jpg", "SHEF in a black leather studio portrait", "PORTRAIT-02", 2],
  ["shef-drive-orange-45422.jpg", "SHEF in a coral editorial portrait", "CORAL-03", 3],
  ["shef-drive-orange-45287.jpg", "SHEF in a coral editorial portrait", "CORAL-04", 4],
  ["shef-drive-orange-45390.jpg", "SHEF in a coral editorial portrait", "CORAL-05", 5],
  ["shef-drive-orange-45450.jpg", "SHEF seated in a chainmail editorial look", "CHAIN-06", 6],
];

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  heroKicker: "DJ / AUS ↔ HCMC",
  heroTitle: "SHEF",
  heroEdition: "Cooking heat without a fixed recipe.",
  flavourNotes: ["House", "Hard bounce", "R&B", "Psytrance", "Techno", "No set menu"],
  manifestoHeadline: ["No set", "menu."],
  manifestoBody: "SHEF moves by instinct: soulful R&B into house, deep grooves into hard bounce, techno into psytrance. The only rule is that the room leaves hotter than it arrived.",
  manifestoRegion: ["Vietnamese–Australian", "HCMC · Melbourne · beyond"],
  musicHeadline: ["Fresh", "from the pass"],
  musicImageCode: "STEMS / NAARM",
  sessionsHeadline: ["Where she", "cooked"],
  sessionsIntro: "Club rooms, warehouse energy, radio airwaves, and an R&B world tour stop. Different settings; the same appetite.",
  sessionsFeaturedLabel: "featured sessions",
  sessionsImageCode: "LIVE / MELBOURNE",
  aboutHeadline: ["Just a", "shef."],
  aboutLead: "Vietnamese–Australian roots. Melbourne club instincts. A growing orbit between Australia, HCMC, and wherever the next room is ready.",
  aboutParagraphs: [
    "SHEF is a cross-genre DJ who treats a set like a shared table: familiar flavours, unexpected combinations, and enough heat to keep everyone leaning in.",
    "Her public mixes move from deep house and R&B to techno, hard bounce, and psytrance. That range is the point. She reads the room first and serves the right plate next.",
  ],
  aboutImageAlt: "SHEF in a green look surrounded by red roses",
  aboutImageCode: "AFTER HOURS / 2026",
  archiveHeadline: "Plates & places",
  archiveDirection: "Drag / scroll to travel",
  bookingHeadline: ["Put SHEF", "on the menu."],
  bookingImageAlt: "SHEF in a coral editorial portrait",
  footerOrbitHeading: "Melbourne ↔ HCMC",
  footerOrbitSubline: "House · Bounce · R&B · Techno",
  seoTitle: "SHEF — DJ / No Set Menu",
  seoDescription: "Official site for Vietnamese–Australian DJ SHEF. Listen to mixes spanning house, R&B, techno, hard bounce, and psytrance; view the press kit and booking information.",
  socials: [
    { _key: "instagram", label: "Instagram", href: "https://www.instagram.com/shef.dj/" },
    { _key: "soundcloud", label: "SoundCloud", href: "https://soundcloud.com/shef-699974995" },
    { _key: "dg-radio", label: "DG Radio 21", href: "https://soundcloud.com/dangerous-goods-ent/dg-radio-episode-21-shef" },
  ],
};

const pressKit = {
  _id: "pressKit",
  _type: "pressKit",
  eyebrow: "Official electronic press kit / 2026",
  headline: ["No set menu.", "Always enough heat."],
  lead: "SHEF is a Vietnamese–Australian DJ working between Ho Chi Minh City and Australia, with Melbourne at the centre of her club story.",
  paragraphs: [
    "Her sets are built by feel rather than genre borders. House and deep grooves meet soulful R&B, hard bounce, techno, and psytrance, switching temperature without losing the room.",
    "Recent highlights include a Brisbane opening set for Jenevieve’s sold-out Crysalis Tour, a B2B at Melbourne’s Trieye underground warehouse rave, a STEMS Official appearance, and DG Radio: Episode 21 for Dangerous Goods.",
  ],
  facts: [
    { _key: "roots", label: "Roots", value: "Vietnamese–Australian" },
    { _key: "orbit", label: "Orbit", value: "HCMC / Australia" },
    { _key: "base", label: "Club base", value: "Melbourne" },
    { _key: "format", label: "Format", value: "Cross-genre DJ" },
    { _key: "sound", label: "Sound", value: "House / bounce / R&B" },
    { _key: "featured", label: "Featured", value: "DG Radio 21" },
  ],
  portraitOneAlt: "SHEF black leather press portrait",
  portraitTwoAlt: "SHEF in a coral editorial look",
  portraitOneCaption: "Press portrait 01 / supplied folder",
  portraitTwoCaption: "Press portrait 02 / supplied folder",
  promoterNotes: [
    { _key: "event", label: "Event", copy: "Date, city, venue, event type, and expected capacity" },
    { _key: "lineup", label: "Lineup", copy: "Full bill, proposed set time, and requested set length" },
    { _key: "booth", label: "Booth", copy: "Available players, mixer, monitor setup, and venue sound contact" },
    { _key: "travel", label: "Travel", copy: "Transport, accommodation, visas, and ground-transfer plan where applicable" },
    { _key: "offer", label: "Offer", copy: "Fee, currency, payment terms, and inclusions stated clearly" },
  ],
};

const [heroBaseImage, heroCurtainImage, musicImage, sessionsVideoPoster, aboutImage, bookingImage, portraitOne, portraitTwo] = await Promise.all([
  image("shef-drive-1196.jpg"),
  image("shef-drive-orange-45450.jpg"),
  image("shef-live.jpg"),
  image("shef-stems-vault-poster.jpg"),
  image("shef-green.jpg"),
  image("shef-drive-orange-45390.jpg"),
  image("shef-drive-1247.jpg"),
  image("shef-drive-orange-45422.jpg"),
]);

Object.assign(siteSettings, {
  heroBaseImage,
  heroCurtainImage,
  musicImage,
  sessionsVideo: await file("videos/shef-stems-vault.mp4"),
  sessionsVideoPoster,
  aboutImage,
  bookingImage,
});
Object.assign(pressKit, { portraitOne, portraitTwo });

const releaseDocs = await Promise.all(releases.map(async (release) => ({
  _type: "release",
  ...release,
  soundcloudUrl: release.href,
  ...(release.title === "Psytrance Freestyle Mix" ? {
    previewAudio: await file("audio/shef-psytrance-preview.mp3"),
    coverImage: sessionsVideoPoster,
  } : {}),
})));
const appearanceDocs = appearances.map(({ _id, ...appearance }) => ({ _id, _type: "appearance", ...appearance }));
const galleryDocs = await Promise.all(gallery.map(async ([filename, alt, code, order], index) => ({
  _id: `gallery-${index + 1}`,
  _type: "galleryItem",
  media: await image(filename),
  alt,
  code,
  order,
})));

await client.transaction()
  .createOrReplace(siteSettings)
  .createOrReplace(pressKit)
  .commit();
async function commitDocuments(documents) {
  let transaction = client.transaction();
  for (const document of documents) transaction = transaction.createOrReplace(document);
  await transaction.commit();
}

await commitDocuments(releaseDocs);
await commitDocuments(appearanceDocs);
await commitDocuments(galleryDocs);

console.log(`Seeded SHEF CMS content into ${projectId}/${dataset}.`);
