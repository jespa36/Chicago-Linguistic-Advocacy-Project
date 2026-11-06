/**
 * Minimal Supabase client for the contribution system (REST + Storage over fetch).
 * Uses only the public "anon" key, Row Level Security
 * limits visitors to reading approved rows and inserting unapproved crowd rows.
 * If the env vars are missing, everything here stays switched off and the site
 * falls back to the email option.
 */
const URL_BASE = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/+$/, '')
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const SUPABASE_ENABLED = URL_BASE.startsWith('https://') && ANON_KEY.length > 20

const PHOTO_PREFIX = `${URL_BASE}/storage/v1/object/public/sign-photos/signs/`

export const SIGN_TYPES = [
  { value: 'storefront', label: 'Storefront or business sign' },
  { value: 'street_sign', label: 'Street sign' },
  { value: 'transit', label: 'Transit sign' },
  { value: 'government_notice', label: 'Government or public notice' },
  { value: 'flyer_poster', label: 'Flyer or poster' },
  { value: 'mural_graffiti', label: 'Mural or graffiti with text' },
  { value: 'other', label: 'Something else' },
] as const

export const CATEGORIES = [
  { value: 'official', label: 'Official (government, transit, institutions)' },
  { value: 'grassroots', label: 'Grassroots (businesses, community, handmade)' },
] as const

export type CommunityPhoto = {
  id: string
  photo_url: string
  latitude: number
  longitude: number
  languages: string[]
  category: string
  note: string | null
  sign_type: string
  dominant_language: string | null
  language_unsure: boolean
  community_area: number | null
  created_at: string
}

export type NewSign = {
  photo_url: string
  latitude: number
  longitude: number
  languages: string[]
  category: 'official' | 'grassroots'
  note: string | null
  sign_type: string
  dominant_language: string | null
  language_unsure: boolean
  community_area: number | null
}

function headers(extra: Record<string, string> = {}) {
  return { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}`, ...extra }
}

/** Approved crowd photos only (RLS enforces this as well). */
export async function fetchApprovedPhotos(signal?: AbortSignal): Promise<CommunityPhoto[]> {
  if (!SUPABASE_ENABLED) return []
  const cols =
    'id,photo_url,latitude,longitude,languages,category,note,sign_type,dominant_language,language_unsure,community_area,created_at'
  const res = await fetch(
    `${URL_BASE}/rest/v1/signs?select=${cols}&approved=eq.true&source=eq.crowd&order=created_at.desc&limit=500`,
    { headers: headers(), signal },
  )
  if (!res.ok) throw new Error(`Could not load community photos (${res.status})`)
  const rows = (await res.json()) as CommunityPhoto[]
  // Only ever render images that live in our own bucket.
  return rows.filter((r) => typeof r.photo_url === 'string' && r.photo_url.startsWith(PHOTO_PREFIX))
}

/** Uploads a processed JPEG and returns its public URL. */
export async function uploadPhoto(blob: Blob): Promise<string> {
  if (!SUPABASE_ENABLED) throw new Error('Uploads are not set up yet.')
  const name = `${crypto.randomUUID()}.jpg`
  const res = await fetch(`${URL_BASE}/storage/v1/object/sign-photos/signs/${name}`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'image/jpeg', 'x-upsert': 'false' }),
    body: blob,
  })
  if (!res.ok) throw new Error(`Photo upload failed (${res.status})`)
  return `${PHOTO_PREFIX}${name}`
}

/** Inserts an unapproved row. It stays hidden until it is approved in the dashboard. */
export async function insertSign(row: NewSign): Promise<void> {
  if (!SUPABASE_ENABLED) throw new Error('Submissions are not set up yet.')
  const res = await fetch(`${URL_BASE}/rest/v1/signs`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
    body: JSON.stringify({ ...row, approved: false, source: 'crowd' }),
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status})`)
}
