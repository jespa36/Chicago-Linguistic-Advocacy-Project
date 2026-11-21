/**
 * Survey results, one entry per surveyed street (corridor).
 * We count signs along the main commercial street of each surveyed community area,
 * so a result describes that street, not the whole area.
 *
 * The `id` is a unique identifier for the corridor, and `areaId` is the numeric ID of the community area.
 * Example, not real
 * {
 *   id: 'albany-park-kimball',
 *   areaId: 14,
 *   street: 'Lawrence Ave',
 *   from: 'Pulaski Rd',
 *   to: 'Kedzie Ave',
 *   signsSurveyed: 60,
 *   withNonEnglish: 31,
 *   topLanguage: 'Spanish',
 *   surveyedOn: '2026-11-10',
 * }
 */
export type Corridor = {
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
}

export const CORRIDORS: Corridor[] = []
