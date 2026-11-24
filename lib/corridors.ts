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
    from: 'N Albany Ave',
    to: 'N Hamlin Ave',
    signsSurveyed: 735,
    withNonEnglish: 631,
    topLanguage: 'Spanish / Korean',
    surveyedOn: '2026-11-24',
  },
  {
    id: 'edgewater-broadway',
    areaId: 77,
    street: 'N Broadway & N Clark St (Andersonville)',
    from: 'W Bryn Mawr Ave / W Foster Ave',
    to: 'W Granville Ave / W Catalpa Ave',
    signsSurveyed: 688,
    withNonEnglish: 462,
    topLanguage: 'Spanish / Slavic',
    surveyedOn: '2026-11-24',
  },
  {
    id: 'humboldt-park-division',
    areaId: 23,
    street: 'W Division St',
    from: 'N Mozart St',
    to: 'N Western Ave',
    signsSurveyed: 376,
    withNonEnglish: 264,
    topLanguage: 'Spanish',
    surveyedOn: '2026-11-24',
  },
  {
    id: 'west-ridge-devon',
    areaId: 2,
    street: 'W Devon Ave',
    from: 'N California Ave',
    to: 'N Western Ave',
    signsSurveyed: 296,
    withNonEnglish: 184,
    topLanguage: 'Indo-European / Arabic / Spanish',
    surveyedOn: '2026-11-24',
  },
  {
    id: 'rogers-park-clark',
    areaId: 1,
    street: 'N Clark St',
    from: 'W Albion Ave',
    to: 'W North Shore Ave',
    signsSurveyed: 200,
    withNonEnglish: 107,
    topLanguage: 'Spanish',
    surveyedOn: '2026-11-24',
  },
  {
    id: 'uptown-argyle',
    areaId: 3,
    street: 'W Argyle St & N Broadway',
    from: 'W Wilson Ave',
    to: 'N Sheridan Rd',
    signsSurveyed: 194,
    withNonEnglish: 147,
    topLanguage: 'Spanish / Vietnamese / Chinese',
    surveyedOn: '2026-11-24',
  },
]
