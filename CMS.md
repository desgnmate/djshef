# SHEF self-hosted CMS

The site uses Supabase for content storage and Auth. There is no hosted studio
or third-party editor in the app: the private `/admin` page is a management
webapp served by the same Next.js deployment.

## One-time setup

1. Use the Supabase project with ref `vjepagosxeavoilydwkx` (URL
   `https://vjepagosxeavoilydwkx.supabase.co`).
2. Copy `.env.example` to `.env.local` and fill in the Supabase URL and
   publishable key. Keep `SUPABASE_SECRET_KEY` server-only.
3. Apply `supabase/migrations/20260903103159_shef_cms.sql` to that project in
   Supabase Dashboard → SQL Editor. API keys authenticate the Data API but do
   not create database tables. If you have the project's database connection
   string, the included script also works:

   `npm run cms:db`

4. Create the editor account in Supabase Dashboard → Authentication → Users.
   Set its email in `CMS_ADMIN_EMAIL` (comma-separate additional editors if
needed). The deployed setup uses `hello@djshef.com`.
5. Seed the current SHEF copy, links, and local asset paths once (after the
   migration has been applied):

   `npm run cms:seed`

## Editing content

Open `/admin` and sign in with the approved Supabase Auth account. The
management interface has dedicated sections for:

- **Gallery** — upload an image to the `shef-media` Supabase Storage bucket or
  paste a public image URL, add alt text and an archive label, then publish or
  keep it as a draft.
- **Events** — create and edit bookings, tour stops, and radio features with a
  date or year, city, venue, event details, and an external link.
- **Mixes** — publish a SoundCloud release with its note, hero preview audio,
  and cover artwork.

Each item can be edited, unpublished, or deleted from its collection. Changes
revalidate the public home page and press kit immediately. Existing assets in
`public/` remain supported, so an image can still be entered as a path such as
`/images/photo.jpg`.

## Security model

Public pages use the publishable key and can only select published rows through
RLS policies. The service-role key is used only inside the protected Next.js
admin route after the signed-in user's email or ID passes the CMS allowlist; it
is never sent to the browser. Do not use editable `user_metadata` for access
decisions.
