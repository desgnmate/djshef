import { defineField, defineType } from "sanity";

export default defineType({
  name: "appearance",
  title: "Featured session",
  type: "document",
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "city", title: "City", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "venue", title: "Venue / event", type: "string" }),
    defineField({ name: "note", title: "Right-hand note", type: "string" }),
    defineField({ name: "href", title: "Link", type: "url" }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  preview: { select: { title: "city", subtitle: "venue" } },
});
