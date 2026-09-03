# SHEF self-hosted CMS

The site now uses Supabase for content storage and Auth. There is no hosted
studio or third-party editor in the app: the private `/admin` page is a small
editor served by the same Next.js deployment.

## One-time setup

1. Connect the Vercel Supabase integration to the project (the production
   project is `supabase-sky-canvas`).
2. Copy `.env.example` to `.env.local` and fill in the Supabase URL and
   publishable key. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only.
3. Apply `supabase/migrations/20260903103159_shef_cms.sql` to the connected
   project. The included script is the easiest local route:

   `npm run cms:db`

4. Create the editor account in Supabase Dashboard → Authentication → Users.
   Set its email in `CMS_ADMIN_EMAIL` (comma-separate additional editors if
   needed). The default Vercel setup uses `hello@desgnmate.com`.
5. Seed the current SHEF copy, links, and local asset paths once:

   `npm run cms:seed`

## Editing content

Open `/admin`, sign in with the approved Supabase Auth account, and edit the
single JSON document. The editor keeps the content model portable and makes it
easy to export or version-control. Keep the top-level keys (`settings`,
`mixes`, `appearances`, `gallery`, `socials`, and `pressKit`) intact. Set a row's
`published` value to `false` to hide it from the public site. Saving revalidates
the home page and press kit immediately.

Images, video, and audio continue to use the checked-in files in `public/`.
Supabase Storage can be added later without changing the public content API.

## Security model

Public pages use the publishable key and can only select published rows through
RLS policies. The service-role key is used only inside the protected Next.js
admin route after the signed-in user's email or ID passes the CMS allowlist; it
is never sent to the browser. Do not use editable `user_metadata` for access
decisions.
