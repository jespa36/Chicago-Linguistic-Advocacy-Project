import csv
from pathlib import Path

# Three-tier block-calibrated salience-bias bounds for unlogged English-only top-down signs:
# 7 - 8 blocks (Albany Park, Edgewater): +45 to +60
# 4 blocks (Humboldt Park, West Ridge): +20 to +35
# 2 blocks (Rogers Park, Uptown):       +10 to +20
SALIENCE_BOUNDS = {
    "albany-park-lawrence": (45, 60),
    "edgewater-broadway": (45, 60),
    "humboldt-park-division": (20, 35),
    "west-ridge-devon": (20, 35),
    "rogers-park-clark": (10, 20),
    "uptown-argyle": (10, 20),
}

# Master dataset across all 6 verified corridors (2,489 total signs across 27 blocks)
CORRIDORS_DATA = [
    {
        "id": "albany-park-lawrence",
        "areaId": 14,
        "neighborhood": "Albany Park",
        "street": "W Lawrence Ave",
        "from": "N Albany Ave",
        "to": "N Hamlin Ave",
        "blocks": 7,
        "centerlineMi": 0.88,
        "sidewalkMi": 1.75,
        "censusLoteShare": 0.566,
        "signsSurveyed": 735,
        "withNonEnglish": 631,
        "topLanguage": "Spanish / Korean",
        "surveyedOn": "2026-11-24",
        "breakdown": [
            (104, "English", "top-down", "English-only signs across 7 blocks of W Lawrence Ave"),
            (21, "Spanish;English", "top-down", "Top-down bilingual civic/street notices"),
            (178, "Spanish;English", "bottom-up", "Bilingual Spanish/English storefronts, windows, and flyers"),
            (432, "Korean;Arabic;Italian;English", "bottom-up", "Multilingual storefronts along W Lawrence Ave"),
        ],
    },
    {
        "id": "edgewater-broadway",
        "areaId": 77,
        "neighborhood": "Edgewater",
        "street": "N Broadway & N Clark St (Andersonville)",
        "from": "W Bryn Mawr Ave / W Foster Ave",
        "to": "W Granville Ave / W Catalpa Ave",
        "blocks": 8,
        "centerlineMi": 1.00,
        "sidewalkMi": 2.00,
        "censusLoteShare": 0.322,
        "signsSurveyed": 688,
        "withNonEnglish": 462,
        "topLanguage": "Spanish / Slavic",
        "surveyedOn": "2026-11-24",
        "breakdown": [
            (226, "English", "top-down", "English-only municipal and regulatory signs across 8 blocks"),
            (243, "Spanish;English", "bottom-up", "Bilingual Spanish/English storefronts"),
            (35, "Spanish", "bottom-up", "Monolingual Spanish signs"),
            (99, "Slavic;English", "bottom-up", "Slavic and Slavic/English storefronts"),
            (53, "Chinese;English", "bottom-up", "Bilingual Chinese/English storefronts"),
            (14, "Chinese", "top-down", "Top-down Chinese civic/community signs"),
            (18, "Indo-European", "bottom-up", "Non-Spanish Indo-European storefronts"),
        ],
    },
    {
        "id": "humboldt-park-division",
        "areaId": 23,
        "neighborhood": "Humboldt Park",
        "street": "W Division St",
        "from": "N Mozart St",
        "to": "N Western Ave",
        "blocks": 4,
        "centerlineMi": 0.50,
        "sidewalkMi": 1.00,
        "censusLoteShare": 0.477,
        "signsSurveyed": 376,
        "withNonEnglish": 264,
        "topLanguage": "Spanish",
        "surveyedOn": "2026-11-24",
        "breakdown": [
            (112, "English", "top-down", "Municipal street and parking signs across 4 blocks"),
            (57, "Spanish;English", "top-down", "Official bilingual civic/street banners"),
            (127, "Spanish", "bottom-up", "Monolingual Spanish storefronts and flyers"),
            (80, "Spanish;English", "bottom-up", "Bilingual storefronts along Paseo Boricua"),
        ],
    },
    {
        "id": "west-ridge-devon",
        "areaId": 2,
        "neighborhood": "West Ridge",
        "street": "W Devon Ave",
        "from": "N California Ave",
        "to": "N Western Ave",
        "blocks": 4,
        "centerlineMi": 0.50,
        "sidewalkMi": 1.00,
        "censusLoteShare": 0.536,
        "signsSurveyed": 296,
        "withNonEnglish": 184,
        "topLanguage": "Indo-European / Arabic / Spanish",
        "surveyedOn": "2026-11-24",
        "breakdown": [
            (112, "English", "top-down", "Municipal street and regulatory signs across 4 blocks"),
            (94, "Indo-European;Arabic;English", "bottom-up", "Bilingual South Asian / Middle Eastern storefronts along Little India"),
            (40, "Indo-European;Arabic", "bottom-up", "Monolingual South Asian / Arabic signs along Little India"),
            (50, "Spanish;English", "bottom-up", "Spanish and bilingual storefronts along W Devon Ave"),
        ],
    },
    {
        "id": "rogers-park-clark",
        "areaId": 1,
        "neighborhood": "Rogers Park",
        "street": "N Clark St",
        "from": "W Albion Ave",
        "to": "W North Shore Ave",
        "blocks": 2,
        "centerlineMi": 0.25,
        "sidewalkMi": 0.50,
        "censusLoteShare": 0.345,
        "signsSurveyed": 200,
        "withNonEnglish": 107,
        "topLanguage": "Spanish",
        "surveyedOn": "2026-11-24",
        "breakdown": [
            (93, "English", "top-down", "Municipal street, transit, and regulatory signs across 2 blocks"),
            (107, "Spanish;English", "bottom-up", "Bilingual Spanish/English storefronts and window signs (from Taste of Peru)"),
        ],
    },
    {
        "id": "uptown-argyle",
        "areaId": 3,
        "neighborhood": "Uptown",
        "street": "W Argyle St & N Broadway",
        "from": "W Wilson Ave",
        "to": "N Sheridan Rd",
        "blocks": 2,
        "centerlineMi": 0.25,
        "sidewalkMi": 0.50,
        "censusLoteShare": 0.306,
        "signsSurveyed": 194,
        "withNonEnglish": 147,
        "topLanguage": "Spanish / Vietnamese / Chinese",
        "surveyedOn": "2026-11-24",
        "breakdown": [
            (47, "English", "top-down", "Municipal street and parking signs across 2 blocks"),
            (10, "Spanish;English", "top-down", "Top-down bilingual Spanish/English signs"),
            (7, "Spanish", "top-down", "Top-down Spanish civic/public notices"),
            (63, "Vietnamese;Chinese;English", "bottom-up", "Asia on Argyle storefronts and menus"),
            (52, "Spanish;English", "bottom-up", "Bilingual Spanish/English storefronts"),
            (15, "Slavic", "bottom-up", "Slavic storefronts"),
        ],
    },
]

# Verify internal counts before exporting
for c in CORRIDORS_DATA:
    assert sum(b[0] for b in c["breakdown"]) == c["signsSurveyed"], f"Total mismatch in {c['id']}"
    lote_sum = sum(b[0] for b in c["breakdown"] if b[1] != "English")
    assert lote_sum == c["withNonEnglish"], f"LOTE mismatch in {c['id']}"

# 1. Export Corridors CSV (observed counts + 3-tier block-calibrated salience bounds)
with open("updated_corridors.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow([
        "id", "area_id", "neighborhood", "street", "from_street", "to_street",
        "blocks", "centerline_mi", "sidewalk_mi", "signs_surveyed", "with_non_english",
        "pct_non_english", "observed_match_ratio", "missed_eng_min", "missed_eng_max",
        "adjusted_match_min", "adjusted_match_max", "top_language", "surveyed_on"
    ])
    for c in CORRIDORS_DATA:
        obs_pct = c["withNonEnglish"] / c["signsSurveyed"]
        obs_match = obs_pct / c["censusLoteShare"]
        lo_miss, hi_miss = SALIENCE_BOUNDS[c["id"]]
        adj_match_min = (c["withNonEnglish"] / (c["signsSurveyed"] + hi_miss)) / c["censusLoteShare"]
        adj_match_max = (c["withNonEnglish"] / (c["signsSurveyed"] + lo_miss)) / c["censusLoteShare"]
        writer.writerow([
            c["id"], c["areaId"], c["neighborhood"], c["street"], c["from"], c["to"],
            c["blocks"], c["centerlineMi"], c["sidewalkMi"], c["signsSurveyed"],
            c["withNonEnglish"], f"{obs_pct * 100:.1f}%", f"{obs_match:.2f}",
            lo_miss, hi_miss, f"{adj_match_min:.2f}", f"{adj_match_max:.2f}",
            c["topLanguage"], c["surveyedOn"]
        ])

# 2. Export Signs CSV (all 2,489 observed rows)
with open("updated_signs_2489.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow([
        "sign_id", "corridor_id", "area_id", "neighborhood", "street",
        "languages", "has_non_english", "direction", "surveyed_on", "notes"
    ])
    idx = 1
    for c in CORRIDORS_DATA:
        for count, langs, direction, note in c["breakdown"]:
            has_lote = "TRUE" if langs != "English" else "FALSE"
            for _ in range(count):
                writer.writerow([
                    f"S-{idx:04d}", c["id"], c["areaId"], c["neighborhood"], c["street"],
                    langs, has_lote, direction, c["surveyedOn"], note
                ])
                idx += 1

# 3. Generate lib/corridors.ts directly
ts_entries = []
for c in CORRIDORS_DATA:
    ts_entries.append(f"""  {{
    id: '{c["id"]}',
    areaId: {c["areaId"]},
    street: '{c["street"]}',
    from: '{c["from"]}',
    to: '{c["to"]}',
    signsSurveyed: {c["signsSurveyed"]},
    withNonEnglish: {c["withNonEnglish"]},
    topLanguage: '{c["topLanguage"]}',
    surveyedOn: '{c["surveyedOn"]}',
  }},""")

ts_content = f"""/**
 * Survey results, one entry per surveyed street (corridor).
 * We count signs along the main commercial street of each surveyed community area,
 * so a result describes that street, not the whole area.
 */
export type Corridor = {{
  id: string
  areaId: number
  street: string
  /** Cross streets that bound the stretch that was counted. */
  from?: string
  to?: string
  /** Signs counted (any public display of text). */
  signsSurveyed: number
  /** How many of those include at least one language other than English. */
  withNonEnglish: number
  /** Most common non-English language on the street's signs. */
  topLanguage?: string
  surveyedOn?: string
}}

export const CORRIDORS: Corridor[] = [
{chr(10).join(ts_entries)}
]
"""

out_ts = Path("lib/corridors.ts") if Path("lib").exists() else Path("corridors.ts")
out_ts.write_text(ts_content, encoding="utf-8")

print(f"Done! Generated updated_corridors.csv, updated_signs_2489.csv ({idx - 1} rows), and {out_ts}.")