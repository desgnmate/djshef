# SHEF CMS setup

The site uses Sanity as a headless CMS. Until a Sanity project is connected, the site renders the curated content in `lib/content.ts`, so local development and the existing Vercel deployment remain safe.

## Connect a Sanity project

1. Create a Sanity project and a `production` dataset.
2. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
3. Add a read token with Viewer access as `SANITY_API_READ_TOKEN` for server-side draft/live content.
4. Set `NEXT_PUBLIC_SANITY_STUDIO_URL` to the deployed site URL plus `/studio`.
5. Run `npm run dev`, then open `http://localhost:3000/studio`.
6. Run `SANITY_API_WRITE_TOKEN=... npm run cms:seed` once to migrate the current SHEF copy, links, and local media into Sanity.

The seed script uploads the existing image, video, and audio assets and creates one settings document, one press-kit document, four releases, four appearances, and six gallery images.

## Draft previews and publishing

Set `DRAFT_SECRET` to a private value. A Sanity Presentation Tool preview can enable Draft Mode with:

`/api/draft-mode/enable?secret=YOUR_SECRET&slug=/`

The route only accepts local paths and redirects to the requested page after validating the secret. Exit preview with a `POST` to `/api/draft-mode/disable`.

For published-content cache invalidation, create a Sanity webhook targeting `/api/revalidate`, set its HMAC secret to `SANITY_REVALIDATE_SECRET`, and send the webhook signature in the standard Sanity headers. The route refreshes the shared Sanity cache after verified mutations.

## Vercel environment variables

Add the same public project variables plus the server-only read, preview, and webhook secrets in the Vercel project settings for each environment. Keep write tokens local; they are only needed for the one-time seed command.
