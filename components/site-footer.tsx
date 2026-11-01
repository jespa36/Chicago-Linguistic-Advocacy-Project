import Link from 'next/link'
import { ExternalLink, Mail } from 'lucide-react'
import { NAV, SITE } from '@/lib/site'
import { StarMark } from './star-mark'

export function SiteFooter() {
  return (
    <footer className="bg-[var(--ink-navy)] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <StarMark className="size-7 text-accent" />
              <span className="font-serif text-lg text-white">{SITE.name}</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed">
              An open civic project comparing the languages Chicagoans speak with the languages they can see in public
              space. Built for residents, researchers, and language advocates.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-white/10 px-3 text-sm transition-colors hover:bg-white/20"
              >
                GitHub
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-white/10 px-3 text-sm transition-colors hover:bg-white/20"
              >
                <Mail className="size-3.5" aria-hidden="true" />
                Email
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Explore</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Participate</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/contribute/" className="hover:text-white">
                  Contribute a sign
                </Link>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  Get in touch
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-2 text-accent" aria-hidden="true">
          <StarMark className="size-3.5" />
          <StarMark className="size-3.5" />
          <StarMark className="size-3.5" />
          <StarMark className="size-3.5" />
          <span className="ml-2 h-px flex-1 bg-white/10" />
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-slate-400 md:flex-row md:justify-between">
          <p>
            Inspired by{' '}
            <a
              href="https://mlm.humanities.manchester.ac.uk/linguasnapp/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              LinguaSnapp
            </a>{' '}
            (University of Manchester). Language data: U.S. Census Bureau, American Community Survey.
          </p>
          <p>Boundaries: City of Chicago Data Portal · Basemap: Esri, OpenStreetMap</p>
        </div>
      </div>
    </footer>
  )
}
