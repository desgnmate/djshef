import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const redirectPath = url.searchParams.get("slug") ?? "/";

  if (
    !process.env.DRAFT_SECRET ||
    secret !== process.env.DRAFT_SECRET ||
    !redirectPath.startsWith("/") ||
    redirectPath.startsWith("//")
  ) {
    return new Response("Invalid preview token", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();
  return NextResponse.redirect(new URL(redirectPath, request.url));
}
