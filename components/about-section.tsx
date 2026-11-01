import { Building2, Store, Ruler, Users } from 'lucide-react'
import { CITYWIDE, fmt, pctOfUniverse, roundThousand } from '@/lib/citywide'

const PILLARS = [
  {
    icon: Building2,
    title: 'Official signage',
    text: 'Government buildings, transit stations, street signs, and municipal notices: the languages the city chooses to communicate in.',
  },
  {
    icon: Store,
    title: 'Grassroots signage',
    text: 'Storefronts, community flyers, murals, and neighborhood notices: the languages Chicagoans actually use day to day.',
  },
  {
    icon: Ruler,
    title: 'A measurable gap',
    text: `An estimated ${fmt(roundThousand(CITYWIDE.nonEnglish))} Chicagoans speak a language other than English at home. We measure how often those languages show up in public.`,
  },
  {
    icon: Users,
    title: 'Community-driven',
    text: 'Soon, anyone will be able to contribute. Every photo and pin helps researchers, educators, and advocates understand the city better. Submissions are reviewed before they appear.',
  },
]

export function AboutSection() {
  const share = pctOfUniverse(CITYWIDE.nonEnglish)

  return (
    <section id="about" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">About the project</p>
            <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground md:text-4xl">
              A living record of Chicago&apos;s linguistic diversity.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              Inspired by{' '}
              <a
                href="https://mlm.humanities.manchester.ac.uk/linguasnapp/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                LinguaSnapp
              </a>
              , the app built by the University of Manchester&apos;s Multilingual Manchester project, LinguaChicago pairs
              census data on who speaks what with a record of the languages that actually appear on signs, revealing
              which languages thrive in public space and which remain invisible.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every documented sign becomes a data point, helping us see the gap between official multilingualism and
              the grassroots linguistic reality of the city.
            </p>
          </div>

          <figure className="rounded-xl border border-border bg-card p-8">
            <p className="font-serif text-6xl tabular-nums text-primary md:text-7xl">{share}%</p>
            <figcaption className="mt-3 text-pretty leading-relaxed text-foreground">
              of Chicago residents age 5 and up speak a language other than English at home.
            </figcaption>
            <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
              <div className="h-full rounded-full bg-[var(--flag-blue)]" style={{ width: `${share}%` }} />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {CITYWIDE.source}. Spanish accounts for most of it, but the Census counts speakers of a dozen broad
              language groups.
            </p>
          </figure>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <p.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
