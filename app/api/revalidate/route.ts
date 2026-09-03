import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookPayload = { _type?: string };

export async function POST(request: NextRequest) {
  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json({ message: "Webhook secret is not configured" }, { status: 503 });
  }

  const { isValidSignature, body } = await parseBody<SanityWebhookPayload>(request, process.env.SANITY_REVALIDATE_SECRET);
  if (!isValidSignature) {
    return Response.json({ message: "Invalid signature" }, { status: 401 });
  }

  revalidateTag("sanity", "max");
  if (body?._type) revalidateTag(`sanity:${body._type}`, "max");
  return Response.json({ revalidated: true, now: Date.now() });
}
