/**
 * Survey results, one entry per surveyed street (corridor).
 * We count signs along the main commercial street of each surveyed community area,
 * so a result describes that street, not the whole area.
 *
 * The `id` is a unique identifier for the corridor, and `areaId` is the numeric ID of the community area.
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

export const CORRIDORS: Corridor[] = [
  {
    id: 'albany-park-lawrence',
    areaId: 14,
    street: 'W Lawrence Ave',
    from: 'N Sacramento Ave',
    to: 'N Kedzie Ave',
    signsSurveyed: 213,
    withNonEnglish: 193,
    topLanguage: 'Spanish',
    surveyedOn: '2026-11-23',
  },
  {
    id: 'humboldt-park-division',
    areaId: 23,
    street: 'W Division St',
    from: 'N Washtenaw Ave',
    to: 'N Francisco Ave',
    signsSurveyed: 90,
    withNonEnglish: 60,
    topLanguage: 'Spanish',
    surveyedOn: '2026-11-23',
  },
  {
    id: 'west-ridge-devon',
    areaId: 2,
    street: 'W Devon Ave',
    from: 'N Western Ave',
    to: 'N Rockwell St',
    signsSurveyed: 80,
    withNonEnglish: 30,
    topLanguage: 'Spanish',
    surveyedOn: '2026-11-23',
  },
  {
    id: 'rogers-park-clark',
    areaId: 1,
    street: 'N Clark St',
    from: 'W Devon Ave',
    to: 'W Albion Ave',
    signsSurveyed: 92,
    withNonEnglish: 27,
    topLanguage: 'Spanish',
    surveyedOn: '2026-11-23',
  },
  {
    id: 'edgewater-broadway',
    areaId: 77,
    street: 'N Broadway',
    from: 'W Berwyn Ave',
    to: 'W Catalpa Ave',
    signsSurveyed: 62,
    withNonEnglish: 27,
    topLanguage: 'Spanish',
    surveyedOn: '2026-11-23',
  },
  {
    id: 'uptown-argyle',
    areaId: 3,
    street: 'W Argyle St',
    from: 'N Sheridan Rd',
    to: 'N Broadway',
    signsSurveyed: 70,
    withNonEnglish: 63,
    topLanguage: 'Vietnamese / Chinese',
    surveyedOn: '2026-11-23',
  },
]