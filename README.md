# LinguaChicago — Chicago Linguistic Advocacy Project

An interactive Next.js and Leaflet web application comparing 2020–2024 Census home-language demographics across Chicago's 77 community areas against street-level multilingual signage surveys and crowdsourced community photos.

**Live Site:** [jespa36.github.io/Chicago-Linguistic-Advocacy-Project](https://jespa36.github.io/Chicago-Linguistic-Advocacy-Project)

---

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home: dark hero, project overview, and short method summary |
| `/map/` | Interactive community-area map (match ratios, home speakers, signage visibility, community photos, and Mapillary municipal/traffic sign layers) |
| `/data/` | Citywide benchmark (~913,000 non-English home speakers / ~35% of residents age 5+), corridor rankings, and language breakdowns |
| `/contribute/` | Live community photo upload form with neighborhood tagging, language selection, and moderation queue |
| `/method/` | Analytical framework, match ratio cutoffs, field survey protocol, and study limitations |

---

## Key Findings (27-Block Field Survey)

Across **2,489 signs** documented along major commercial corridors in six Chicago neighborhoods, public signage kept pace with local home-language shares on every surveyed strip (all scoring above the `0.85` well-represented threshold):

| Community Area | Surveyed Corridor | Match Ratio |
| --- | --- | --- |
| **Uptown** | W Argyle St & N Broadway | **2.48** |
| **Albany Park** | W Lawrence Ave | **1.52** |
| **West Ridge** | W Devon Ave | **1.16** |
| **Humboldt Park** | W Division St | `> 0.85` |
| **Rogers Park** | N Clark St | `> 0.85` |
| **Edgewater** | N Broadway & N Clark St | `> 0.85` |

*Note: Match ratio is calculated as `(% of corridor signs containing a non-English language) / (% of community-area residents age 5+ speaking a non-English language at home)`. Results reflect commercial corridors rather than entire residential areas.*

---

## Run Locally

```bash
pnpm install
pnpm dev
