import { createClient } from "next-sanity";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/lib/sanity/env";

export const sanityClient = createClient({
  projectId: sanityProjectId || "missing-project-id",
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    enabled: Boolean(process.env.NEXT_PUBLIC_SANITY_STUDIO_URL),
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
});
