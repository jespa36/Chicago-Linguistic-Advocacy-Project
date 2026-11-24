import csv
from pathlib import Path

# Master dataset combining Nov 23 walk + Nov 24 extended walk (1,263 signs total)
CORRIDORS_DATA = [
    {
        "id": "albany-park-lawrence",
        "areaId": 14,
        "neighborhood": "Albany Park",
        "street": "W Lawrence Ave",
        "from": "N Sacramento Ave",
        "to": "N Central Park Ave",
        "distanceMi": 0.75,
        "signsSurveyed": 247,
        "withNonEnglish": 212,
        "topLanguage": "Spanish / Korean",
        "surveyedOn": "2026-11-24",
        "breakdown": [
            # Nov 23 (213) + Nov 24 extension (34)
            (35, "English", "top-down", "Municipal street and traffic signs (20 Nov 23 + 15 Nov 24)"),
            (7, "Spanish;English", "top-down", "Top-down bilingual civic/street notices"),
            (60, "Spanish;English", "bottom-up", "Storefronts, windows, flyers"),
            (145, "Korean;Arabic;Italian;English", "bottom-up", "Multilingual storefronts along Lawrence (133 + 12)"),
        ],
    },
    {
        "id": "humboldt-park-division",
        "areaId": 23,
        "neighborhood": "Humboldt Park",
        "street": "W Division St",
        "from": "N Western Ave",
        "to": "N California Ave",
        "distanceMi": 0.50,
        "signsSurveyed": 239,
        "withNonEnglish": 168,
        "topLanguage": "Spanish",
        "surveyedOn": "2026-11-24",
        "breakdown": [
            # Nov 23 (90) + Nov 24 extension (149)
            (71, "English", "top-down", "Municipal street and parking signs (30 Nov 23 + 41 Nov 24)"),
            (36, "Spanish;English", "top-down", "Official bilingual civic/street banners (12 Nov 23 + 24 Nov 24)"),
            (81, "Spanish", "bottom-up", "Monolingual Spanish storefronts and flyers (20 + 61)"),
            (51, "Spanish;English", "bottom-up", "Bilingual storefronts along Paseo Boricua (28 + 23)"),
        ],
    },
    {
        "id": "rogers-park-clark",
        "areaId": 1,
        "neighborhood": "Rogers Park",
        "street": "N Clark St",
        "from": "W Devon Ave",
        "to": "W Howard St",
        "distanceMi": 1.50,
        "signsSurveyed": 200,
        "withNonEnglish": 107,
        "topLanguage": "Spanish",
        "surveyedOn": "2026-11-24",
        "breakdown": [
            # Nov 23 (92) + Nov 24 extension (108)
            (93, "English", "top-down", "Municipal street, transit, and regulatory signs (65 + 28)"),
            (97, "Spanish;English", "bottom-up", "Bilingual storefronts and window signs (27 + 70)"),
            (10, "Slavic", "bottom-up", "Russian/Polish storefronts"),
        ],
    },
    {
        "id": "edgewater-broadway",
        "areaId": 77,
        "neighborhood": "Edgewater",
        "street": "N Broadway",
        "from": "W Bryn Mawr Ave",
        "to": "W Granville Ave",
        "distanceMi": 0.75,
        "signsSurveyed": 195,
        "withNonEnglish": 131,
        "topLanguage": "Spanish / Slavic",
        "surveyedOn": "2026-11-24",
        "breakdown": [
            # Nov 23 (62) + Nov 24 extension (133)
            (64, "English", "top-down", "Municipal street and traffic signs (35 + 29)"),
            (69, "Spanish;English", "bottom-up", "Bilingual storefronts (22 + 47)"),
            (10, "Spanish", "bottom-up", "Monolingual Spanish signs"),
            (28, "Slavic;English", "bottom-up", "Slavic and Slavic/English storefronts (23 + 5)"),
            (15, "Chinese;English", "bottom-up", "Bilingual Chinese/English storefronts"),
            (4, "Chinese", "top-down", "Top-down Chinese civic/community signs"),
            (5, "Indo-European", "bottom-up", "Non-Spanish Indo-European storefronts"),
        ],
    },
    {
        "id": "uptown-argyle",
        "areaId": 3,
        "neighborhood": "Uptown",
        "street": "W Argyle St",
        "from": "N Kenmore Ave",
        "to": "N Sheridan Rd",
        "distanceMi": 0.25,
        "signsSurveyed": 194,
        "withNonEnglish": 147,
        "topLanguage": "Spanish / Vietnamese / Chinese",
        "surveyedOn": "2026-11-24",
        "breakdown": [
            # Nov 23 (70) + Nov 24 extension (124)
            (47, "English", "top-down", "Municipal street and parking signs (7 + 40)"),
            (10, "Spanish;English", "top-down", "Top-down bilingual Spanish/English signs"),
            (7, "Spanish", "top-down", "Top-down Spanish civic/public notices"),
            (63, "Vietnamese;Chinese;English", "bottom-up", "Asia on Argyle storefronts and menus"),
            (52, "Spanish;English", "bottom-up", "Bilingual Spanish/English storefronts"),
            (15, "Slavic", "bottom-up", "Slavic storefronts"),
        ],
    },
    {
        "id": "west-ridge-devon",
        "areaId": 2,
        "neighborhood": "West Ridge",
        "street": "W Devon Ave",
        "from": "N Western Ave",
        "to": "N California Ave",
        "distanceMi": 0.50,
        "signsSurveyed": 188,
        "withNonEnglish": 103,
        "topLanguage": "Spanish / Indo-European",
        "surveyedOn": "2026-11-24",
        "breakdown": [
            # Nov 23 (80) + Nov 24 extension (108)
            (85, "English", "top-down", "Municipal street and regulatory signs (50 + 35)"),
            (52, "Spanish;English", "bottom-up", "Bilingual Spanish/English storefronts (18 + 34)"),
            (22, "Spanish", "bottom-up", "Monolingual Spanish signs"),
            (29, "Indo-European;Arabic;English", "bottom-up", "South Asian / Arabic / Indo-European displays (12 + 17)"),
        ],
    },
]

# Verify internal counts before exporting
for c in CORRIDORS_DATA:
    assert sum(b[0] for b in c["breakdown"]) == c["signsSurveyed"], f"Total mismatch in {c['id']}"
    lote_sum = sum(b[0] for b in c["breakdown"] if b[1] != "English")
    assert lote_sum == c["withNonEnglish"], f"LOTE mismatch in {c['id']}"

# 1. Export Corridors CSV (for Google Sheets 'Corridors' tab)
with open("updated_corridors.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow([
        "id", "area_id", "neighborhood", "street", "from_street", "to_street",
        "distance_mi", "signs_surveyed", "with_non_english", "pct_non_english",
        "top_language", "surveyed_on"
    ])
    for c in CORRIDORS_DATA:
        pct = f"{(c['withNonEnglish'] / c['signsSurveyed']) * 100:.1f}%"
        writer.writerow([
            c["id"], c["areaId"], c["neighborhood"], c["street"], c["from"], c["to"],
            c["distanceMi"], c["signsSurveyed"], c["withNonEnglish"], pct,
            c["topLanguage"], c["surveyedOn"]
        ])

# 2. Export Signs CSV (all 1,263 individual rows for Google Sheets 'Signs' tab & NotebookLM)
with open("updated_signs_1263.csv", "w", newline="", encoding="utf-8") as f:
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

print(f"Done! Generated updated_corridors.csv, updated_signs_1263.csv ({idx - 1} rows), and {out_ts}.")
