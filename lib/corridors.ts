/**
 * Survey results, one entry per surveyed street (corridor).
 * We count signs along the main commercial street of each surveyed community area,
 * so a result describes that street, not the whole area.
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
    to: 'N Central Park Ave',
    signsSurveyed: 247,
    withNonEnglish: 212,
    topLanguage: 'Spanish / Korean',
    surveyedOn: '2026-11-24',
  },
  {
    id: 'humboldt-park-division',
    areaId: 23,
    street: 'W Division St',
    from: 'N Western Ave',
    to: 'N California Ave',
    signsSurveyed: 239,
    withNonEnglish: 168,
    topLanguage: 'Spanish',
    surveyedOn: '2026-11-24',
  },
  {
    id: 'rogers-park-clark',
    areaId: 1,
    street: 'N Clark St',
    from: 'W Devon Ave',
    to: 'W Howard St',
    signsSurveyed: 200,
    withNonEnglish: 107,
    topLanguage: 'Spanish',
    surveyedOn: '2026-11-24',
  },
  {
    id: 'edgewater-broadway',
    areaId: 77,
    street: 'N Broadway',
    from: 'W Bryn Mawr Ave',
    to: 'W Granville Ave',
    signsSurveyed: 195,
    withNonEnglish: 131,
    topLanguage: 'Spanish / Slavic',
    surveyedOn: '2026-11-24',
  },
  {
    id: 'uptown-argyle',
    areaId: 3,
    street: 'W Argyle St',
    from: 'N Kenmore Ave',
    to: 'N Sheridan Rd',
    signsSurveyed: 194,
    withNonEnglish: 147,
    topLanguage: 'Spanish / Vietnamese / Chinese',
    surveyedOn: '2026-11-24',
  },
  {
    id: 'west-ridge-devon',
    areaId: 2,
    street: 'W Devon Ave',
    from: 'N Western Ave',
    to: 'N California Ave',
    signsSurveyed: 188,
    withNonEnglish: 103,
    topLanguage: 'Spanish / Indo-European',
    surveyedOn: '2026-11-24',
  },
]
