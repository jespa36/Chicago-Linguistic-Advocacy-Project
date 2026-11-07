# LinguaChicago

A language-equity map for Chicago: compare the languages residents speak (Census data) with the
languages visible on public signs (field survey), across the city's 77 community areas.

Map is built with Next.js (static export), Tailwind CSS, and Leaflet. Hosted on GitHub Pages.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: dark hero, about, short method overview |
| `/map/` | Interactive community-area map (equity, speakers, visibility, by language) |
| `/data/` | Citywide benchmark, rankings, language breakdown, progress |
| `/contribute/` | "Coming soon" page and field guide for photo submissions |
| `/method/` | Analytical framework, field guide, research background |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Where the data is located

- `lib/citywide.ts` — citywide Census figures (source: `data/raw/`, see `data/raw/SOURCE.md`).
- `lib/area-data.ts` — per-community-area Census and signage-survey data. Empty until added; areas without
  data show as "No data yet".
- `lib/community-areas.json` — community area boundaries (City of Chicago Data Portal).

## Optional hero photo

Save a skyline image as `public/images/chicago-skyline.jpg`. Without it the hero is solid navy.

## Database (Supabase)

`supabase/migrations/` records the SQL already applied to the Supabase project for photo submissions
(locked-down public access, review flag, upload limits). The site does not talk to Supabase yet; the
upload form and gallery are the next phase.

## Palette

Chicago flag colors: Flag Blue `#41B6E6` and Star Red `#E4002B` (design.chicago.gov), with a deeper blue
(`#0A5C8A`) for text and buttons because the light blue is too faint on white.
