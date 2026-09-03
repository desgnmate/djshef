import { defineLive } from "next-sanity/live";
import { sanityClient } from "@/lib/sanity/client";

const readToken = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient,
  serverToken: readToken || false,
  browserToken: process.env.SANITY_BROWSER_TOKEN || false,
});
