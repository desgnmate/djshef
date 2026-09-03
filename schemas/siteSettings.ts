import { defineField, defineType } from "sanity";

const headline = (name: string, title: string) => defineField({
  name,
  title,
  type: "array",
  of: [{ type: "string" }],
  validation: (rule) => rule.length(2),
});

const image = (name: string, title: string) => defineField({
  name,
  title,
  type: "image",
  options: { hotspot: true },
});

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "heroKicker", title: "Hero kicker", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero title", type: "string" }),
    defineField({ name: "heroEdition", title: "Hero edition line", type: "string" }),
    defineField({ name: "flavourNotes", title: "Flavour notes", type: "array", of: [{ type: "string" }] }),
    image("heroBaseImage", "Hero base image"),
    image("heroCurtainImage", "Hero curtain image"),
    headline("manifestoHeadline", "Manifesto headline"),
    defineField({ name: "manifestoBody", title: "Manifesto body", type: "text", rows: 4 }),
    headline("manifestoRegion", "Manifesto region line"),
    headline("musicHeadline", "Music headline"),
    defineField({ name: "musicImageCode", title: "Music image label", type: "string" }),
    image("musicImage", "Music image"),
    headline("sessionsHeadline", "Sessions headline"),
    defineField({ name: "sessionsIntro", title: "Sessions introduction", type: "text", rows: 3 }),
    defineField({ name: "sessionsFeaturedLabel", title: "Sessions count label", type: "string" }),
    defineField({ name: "sessionsVideo", title: "Sessions video", type: "file", options: { accept: "video/*" } }),
    image("sessionsVideoPoster", "Sessions video poster"),
    defineField({ name: "sessionsImageCode", title: "Sessions image label", type: "string" }),
    headline("aboutHeadline", "About headline"),
    defineField({ name: "aboutLead", title: "About lead", type: "text", rows: 3 }),
    defineField({ name: "aboutParagraphs", title: "About paragraphs", type: "array", of: [{ type: "text", rows: 4 }] }),
    image("aboutImage", "About image"),
    defineField({ name: "aboutImageAlt", title: "About image alt text", type: "string" }),
    defineField({ name: "aboutImageCode", title: "About image label", type: "string" }),
    defineField({ name: "archiveHeadline", title: "Archive headline", type: "string" }),
    defineField({ name: "archiveDirection", title: "Archive direction", type: "string" }),
    headline("bookingHeadline", "Booking headline"),
    image("bookingImage", "Booking image"),
    defineField({ name: "bookingImageAlt", title: "Booking image alt text", type: "string" }),
    defineField({ name: "footerOrbitHeading", title: "Footer orbit heading", type: "string" }),
    defineField({ name: "footerOrbitSubline", title: "Footer orbit subline", type: "string" }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 }),
    image("seoImage", "SEO image"),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "href", title: "URL", type: "url" }),
        ],
        preview: { select: { title: "label", subtitle: "href" } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "SHEF site settings" }) },
});
