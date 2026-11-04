export const SITE = {
  name: 'LinguaChicago',
  tagline: 'Languages of Chicago',
  github: 'https://github.com/jespa36',
  email: 'jespa36@uic.edu',
}

export const NAV = [
  { href: '/map/', label: 'Map & Explore' },
  { href: '/data/', label: 'Data & Gaps' },
  { href: '/method/', label: 'Methodology' },
]

/** GitHub Pages sub-path (set at build time from BASE_PATH). Empty in local dev. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** Prefix a path to a file in /public with the base path. */
export function asset(path: string) {
  return `${BASE_PATH}${path}`
}
