import Link from 'next/link'
import { ArrowRight, Camera } from 'lucide-react'
import { CITYWIDE, fmt, pctOfUniverse, roundThousand } from '@/lib/citywide'
import { asset } from '@/lib/site'

/*
 * Dark skyline hero for the home page. The photo is optional: put a skyline image at
 * public/images/chicago-skyline.jpg and it shows behind the navy overlay; without it
 * the hero falls back to solid navy.
 */
export function HomeHero() {
  const stats = [
    {
      value: fmt(roundThousand(CITYWIDE.nonEnglish)),
      label: 'estimated people in Chicago who speak a language other than English at home',
      note: '1',
    },
    { value: `${Math.round(pctOfUniverse(CITYWIDE.nonEnglish))}%`, label: 'of residents age 5 and up' },
    { value: '77', label: 'community areas being mapped' },
  ]

  return (
    <section className="relative isolate overflow-hidden bg-[var(--ink-navy)] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-55"
        style={{ backgroundImage: `url(${asset('/images/chicago-skyline.jpg')})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b2233]/85 via-[#0b2233]/60 to-[#0b2233]/95"
      />

      <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 md:px-6 md:pt-28 md:pb-20">
        <p className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-sky-100 ring-1 ring-white/20">
          A civic linguistic mapping project · Chicago, IL
        </p>
        <h1 className="mt-6 max-w-3xl text-balance font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
          Who gets to be seen on Chicago&apos;s streets?
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-200">
          The signs and text we see in public spaces don&apos;t always reflect the languages residents of Chicago speak at
          home. We compare the languages residents speak with the languages they can actually see, documenting where
          official and public text leaves communities out.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/map/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[var(--ink-navy)] transition-colors hover:bg-sky-100"
          >
            Explore the map
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/contribute/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <Camera className="size-4" />
            Contribute a photo
          </Link>
        </div>

        <dl className="mt-14 grid gap-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="border-l-2 border-[var(--flag-blue)] pl-4">
              <dd className="font-serif text-4xl tabular-nums sm:text-5xl">
                {s.value}
                {s.note && <sup className="ml-0.5 align-super text-sm text-sky-200">{s.note}</sup>}
              </dd>
              <dt className="mt-1 text-sm leading-snug text-slate-300">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-slate-400">
          <sup>1</sup> {CITYWIDE.source}. Survey estimate with a margin of error of about ±
          {fmt(Math.round(CITYWIDE.nonEnglishMoe / 1000) * 1000)}.
        </p>
      </div>
    </section>
  )
}
