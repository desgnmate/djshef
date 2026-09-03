import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryItem",
  title: "Gallery image",
  type: "document",
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "media", title: "Image", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "alt", title: "Alt text", type: "string" }),
    defineField({ name: "code", title: "Image label", type: "string" }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  preview: { select: { title: "code", media: "media" } },
});
