import { defineField, defineType } from "sanity";

export default defineType({
  name: "release",
  title: "Mix / release",
  type: "document",
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "note", title: "Label / note", type: "string" }),
    defineField({ name: "soundcloudUrl", title: "SoundCloud URL", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "previewAudio", title: "Local preview audio", type: "file", options: { accept: "audio/*" } }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "note", media: "coverImage" } },
});
