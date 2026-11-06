'use client'

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { Camera, CheckCircle2, LocateFixed } from 'lucide-react'
import { areaAt, areaName } from '@/lib/geo'
import { processPhoto, readGps } from '@/lib/photo'
import { CATEGORIES, SIGN_TYPES, insertSign, uploadPhoto } from '@/lib/supabase'
import { SITE } from '@/lib/site'

const PinPicker = dynamic(() => import('./pin-picker'), {
  ssr: false,
  loading: () => <div className="h-72 w-full rounded-lg border border-border bg-secondary" />,
})

const LANGS = ['English', 'Spanish', 'Polish', 'Chinese', 'Arabic', 'Tagalog', 'Korean', 'Russian', 'Ukrainian', 'Urdu', 'Vietnamese']
const COOLDOWN_MS = 30_000

type Status = { kind: 'idle' } | { kind: 'working' } | { kind: 'done' } | { kind: 'error'; msg: string }

export function ContributeForm() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null)
  const [pinNote, setPinNote] = useState('')
  const [langs, setLangs] = useState<string[]>([])
  const [other, setOther] = useState('')
  const [unsure, setUnsure] = useState(false)
  const [dominant, setDominant] = useState('')
  const [signType, setSignType] = useState('storefront')
  const [category, setCategory] = useState<'official' | 'grassroots'>('grassroots')
  const [note, setNote] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const honeypot = useRef<HTMLInputElement>(null)

  const area = pin ? areaAt(pin.lat, pin.lng) : null
  const outside = pin !== null && area === null

  async function onFile(f: File | null) {
    setFile(f)
    setPinNote('')
    if (preview) URL.revokeObjectURL(preview)
    setPreview(f ? URL.createObjectURL(f) : null)
    if (!f) return
    const gps = await readGps(f)
    if (gps) {
      setPin(gps)
      setPinNote('We found a location in the photo. Check the pin and move it if it is off.')
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) return setPinNote('Your browser can’t share its location. Click the map instead.')
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPin({ lat: p.coords.latitude, lng: p.coords.longitude })
        setPinNote('Used your current location. Move the pin if the sign is somewhere else.')
      },
      () => setPinNote('Location was blocked. Click the map to place the pin instead.'),
      { enableHighAccuracy: true, timeout: 10_000 },
    )
  }

  function toggle(l: string) {
    setLangs((cur) => (cur.includes(l) ? cur.filter((x) => x !== l) : [...cur, l]))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (honeypot.current?.value) return // bots fill hidden fields
    try {
      const last = Number(localStorage.getItem('lc-last-submit') ?? 0)
      if (Date.now() - last < COOLDOWN_MS) return setStatus({ kind: 'error', msg: 'Please wait a few seconds before sending another one.' })
    } catch {}
    if (!file) return setStatus({ kind: 'error', msg: 'Add a photo first.' })
    if (!pin || outside) return setStatus({ kind: 'error', msg: 'Place the pin on a spot inside Chicago.' })
    const extra = other.split(',').map((s) => s.trim()).filter(Boolean)
    const languages = [...langs, ...extra].slice(0, 10)
    if (languages.length === 0 && !unsure) return setStatus({ kind: 'error', msg: 'Pick the languages you see, or check “I’m not sure”.' })
    if (!consent) return setStatus({ kind: 'error', msg: 'Please agree to the public posting note.' })

    setStatus({ kind: 'working' })
    try {
      const blob = await processPhoto(file)
      const photo_url = await uploadPhoto(blob)
      await insertSign({
        photo_url,
        latitude: Number(pin.lat.toFixed(6)),
        longitude: Number(pin.lng.toFixed(6)),
        languages,
        category,
        note: note.trim() ? note.trim().slice(0, 500) : null,
        sign_type: signType,
        dominant_language: dominant.trim() ? dominant.trim().slice(0, 60) : null,
        language_unsure: unsure,
        community_area: area,
      })
      try { localStorage.setItem('lc-last-submit', String(Date.now())) } catch {}
      setStatus({ kind: 'done' })
    } catch (err) {
      setStatus({ kind: 'error', msg: err instanceof Error ? err.message : 'Something went wrong. Try again, or email us the photo.' })
    }
  }

  if (status.kind === 'done') {
    return (
      <div className="rounded-xl border border-border bg-card p-6" role="status">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
          <h2 className="font-semibold text-foreground">Thanks, your photo was received</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          It will show up on the map under “Community photos” after we review it. Community photos are examples. They are not counted in the
          area scores.
        </p>
        <button
          type="button"
          onClick={() => { setStatus({ kind: 'idle' }); setFile(null); setPreview(null); setPin(null); setLangs([]); setOther(''); setNote(''); setUnsure(false); setConsent(false) }}
          className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
        >
          Add another
        </button>
      </div>
    )
  }

  const field = 'rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground'
  const label = 'text-sm font-medium text-foreground'

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6">
      <div>
        <h2 className="font-semibold text-foreground">Add a photo of a public sign</h2>
        <p className="mt-1 text-sm text-muted-foreground">Takes about a minute. Photos are reviewed before they appear on the map.</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="photo" className={label}>1. Photo</label>
        <input id="photo" type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0] ?? null)} className="text-sm" />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Preview of the photo you chose" className="max-h-56 w-auto self-start rounded-md border border-border" />
        )}
        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <Camera className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          We shrink the photo and remove its hidden data (like GPS) before uploading. Avoid faces, license plates, and private homes.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className={label}>2. Where is it? Click the map to drop the pin.</span>
        <div>
          <button type="button" onClick={useMyLocation} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-secondary">
            <LocateFixed className="size-4" aria-hidden="true" /> Use my location
          </button>
        </div>
        <PinPicker value={pin} onChange={(p) => { setPin(p); setPinNote('') }} />
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {pinNote ||
            (pin
              ? outside
                ? 'That spot is outside Chicago’s community areas. Move the pin.'
                : `Pin is in ${areaName(area)}.`
              : 'No pin yet.')}
        </p>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className={label}>3. Which languages are on it?</legend>
        <div className="flex flex-wrap gap-2">
          {LANGS.map((l) => (
            <label key={l} className={`cursor-pointer rounded-full border px-3 py-1 text-sm ${langs.includes(l) ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground'}`}>
              <input type="checkbox" className="sr-only" checked={langs.includes(l)} onChange={() => toggle(l)} />
              {l}
            </label>
          ))}
        </div>
        <input value={other} onChange={(e) => setOther(e.target.value)} maxLength={80} placeholder="Other languages (separate with commas)" className={field} aria-label="Other languages" />
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={unsure} onChange={(e) => setUnsure(e.target.checked)} className="size-4 accent-primary" />
          I’m not sure what language one of them is
        </label>
        <input value={dominant} onChange={(e) => setDominant(e.target.value)} maxLength={60} placeholder="Main language, if one stands out (optional)" className={field} aria-label="Main language" />
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className={label}>4. What kind of sign?</span>
          <select value={signType} onChange={(e) => setSignType(e.target.value)} className={field}>
            {SIGN_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>Who made it?</span>
          <select value={category} onChange={(e) => setCategory(e.target.value as 'official' | 'grassroots')} className={field}>
            {CATEGORIES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className={label}>Note (optional)</span>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={500} rows={3} className={field} placeholder="Anything we should know? Please don’t include personal details." />
        <span className="text-xs text-muted-foreground">{note.length}/500</span>
      </label>

      <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />

      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-4 accent-primary" />
        <span>I took this photo (or have permission to share it), and I understand it will be posted publicly on the map with its location once approved.</span>
      </label>

      {status.kind === 'error' && <p role="alert" className="text-sm font-medium text-accent">{status.msg}</p>}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status.kind === 'working'}
          className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-60"
        >
          {status.kind === 'working' ? 'Uploading…' : 'Submit photo'}
        </button>
        <a href={`mailto:${SITE.email}?subject=LinguaChicago%20contributions`} className="text-sm text-muted-foreground underline underline-offset-4">
          Trouble? Email it instead
        </a>
      </div>
    </form>
  )
}
