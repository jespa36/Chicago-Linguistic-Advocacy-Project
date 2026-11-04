import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const STEPS = [
  {
    title: 'Who speaks what',
    body: 'Census data shows how many residents in each community area speak a language other than English at home.',
  },
  {
    title: 'What is visible',
    body: 'We survey public signs and record which languages appear on them: storefronts, transit, government notices, flyers. Photos from the community are reviewed and kept separate.',
  },
  {
    title: 'The gap',
    body: 'Comparing the two allows us to spot where public space keeps up with the community and where it falls behind.',
  },
]

export function MethodBrief() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">How it works</p>
            <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
              From census numbers to street-level signs
            </h2>
          </div>
          <Link
            href="/method/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Read the full methodology <ArrowRight className="size-4" />
          </Link>
        </div>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-3 bg-background p-6">
              <span className="font-serif text-3xl text-accent">0{i + 1}</span>
              <h3 className="font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
