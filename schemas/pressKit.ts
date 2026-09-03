import { defineField, defineType } from "sanity";

export default defineType({
  name: "pressKit",
  title: "Press kit",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "array", of: [{ type: "string" }], validation: (rule) => rule.length(2) }),
    defineField({ name: "lead", title: "Lead", type: "text", rows: 3 }),
    defineField({ name: "paragraphs", title: "Biography paragraphs", type: "array", of: [{ type: "text", rows: 4 }] }),
    defineField({
      name: "facts",
      title: "Artist facts",
      type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "value", title: "Value", type: "string" }),
      ], preview: { select: { title: "label", subtitle: "value" } } }],
    }),
    defineField({ name: "portraitOne", title: "Portrait one", type: "image", options: { hotspot: true } }),
    defineField({ name: "portraitOneAlt", title: "Portrait one alt text", type: "string" }),
    defineField({ name: "portraitTwo", title: "Portrait two", type: "image", options: { hotspot: true } }),
    defineField({ name: "portraitTwoAlt", title: "Portrait two alt text", type: "string" }),
    defineField({ name: "portraitOneCaption", title: "Portrait one caption", type: "string" }),
    defineField({ name: "portraitTwoCaption", title: "Portrait two caption", type: "string" }),
    defineField({
      name: "promoterNotes",
      title: "Promoter notes",
      type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "copy", title: "Copy", type: "text", rows: 3 }),
      ], preview: { select: { title: "label", subtitle: "copy" } } }],
    }),
  ],
  preview: { prepare: () => ({ title: "SHEF press kit" }) },
});
