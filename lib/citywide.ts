/*
 * Citywide benchmark: language spoken at home, Chicago city, population 5 years and over.
 * Source: U.S. Census Bureau, 2025 American Community Survey 1-Year Estimates,
 * Table C16001 (Language Spoken at Home by Ability to Speak English for the
 * Population 5 Years and Over). Raw file: data/raw/ACSDT1Y2025.C16001-Chicago.csv
 *
 * These are survey estimates with margins of error, not exact counts.
 * The margin of error on the non-English total is derived from the published
 * margins for "Total" and "Speak only English": sqrt(6,201² + 22,797²) ≈ 23,625.
 */

export const CITYWIDE = {
  source:
    'U.S. Census Bureau, 2025 American Community Survey 1-Year Estimates, Table C16001, Chicago city, Illinois',
  universe: 2_599_362, // residents age 5+
  englishOnly: 1_686_218,
  nonEnglish: 913_144, // universe - englishOnly
  nonEnglishMoe: 23_625,
  nonEnglishEnglishVeryWell: 549_925,
  nonEnglishEnglishLessThanVeryWell: 363_219,
}

export type LanguageGroup = { group: string; estimate: number; moe: number; note?: string }

/** The 12 language groups the Census publishes in table C16001 (all non-English). */
export const LANGUAGE_GROUPS: LanguageGroup[] = [
  { group: 'Spanish', estimate: 613_301, moe: 20_971 },
  { group: 'Other Indo-European languages', estimate: 67_704, moe: 9_740, note: 'includes Hindi, Urdu, Gujarati' },
  { group: 'Chinese (incl. Mandarin, Cantonese)', estimate: 57_428, moe: 7_316 },
  { group: 'Russian, Polish, or other Slavic languages', estimate: 56_184, moe: 6_555 },
  { group: 'Other and unspecified languages', estimate: 25_261, moe: 6_178 },
  { group: 'Other Asian and Pacific Island languages', estimate: 20_793, moe: 4_291 },
  { group: 'French, Haitian, or Cajun', estimate: 16_242, moe: 4_309 },
  { group: 'Tagalog (incl. Filipino)', estimate: 14_968, moe: 3_151 },
  { group: 'Arabic', estimate: 12_330, moe: 4_275 },
  { group: 'Vietnamese', estimate: 10_697, moe: 3_668 },
  { group: 'Korean', estimate: 9_971, moe: 3_022 },
  { group: 'German or other West Germanic languages', estimate: 8_265, moe: 3_062 },
]

export const fmt = (n: number) => n.toLocaleString('en-US')

/** Round to the nearest thousand for headline use (913,144 -> 913,000). */
export const roundThousand = (n: number) => Math.round(n / 1000) * 1000

/** Percent of the 5+ population, one decimal place. */
export const pctOfUniverse = (n: number) => Math.round((n / CITYWIDE.universe) * 1000) / 10
