# SHEF DJ website

A production-oriented Next.js 16 artist site for SHEF, built around her current mixes, selected appearances, press materials, and booking flow.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` — artist homepage with music, selected sessions, biography, visual diary, and booking callout
- `/booking` — a privacy-first form that copies a structured booking brief to the visitor's clipboard
- `/press-kit` — biography, artist facts, press imagery, promoter checklist, and official links
- `/privacy` and `/terms` — lightweight legal pages
- Branded not-found state

## Before launch

- Confirm the preferred booking and management contact, then add it to the booking page.
- Obtain photographer usage approvals and credits for the Instagram-sourced images.
- Replace or supplement older session links as new official mixes are released.
- Add analytics and consent only after the measurement stack is selected.

See `ASSET_SOURCES.md` for the photography, artwork, and public-profile source inventory.

## Content management

Sanity CMS support is included for the homepage, releases, featured sessions, gallery, press kit, and SEO settings. See [`CMS.md`](./CMS.md) for project setup, the one-time content migration, draft previews, and Vercel environment variables.
