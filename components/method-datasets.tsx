import { Images, ListChecks } from 'lucide-react'

export function MethodDatasets() {
  return (
    <section id="datasets" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 md:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Two kinds of sign data</p>
        <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
          What gets counted, and what gets shown
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          The street survey and the community photos do different jobs, so they follow different rules. Only the survey
          feeds the scores.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <ListChecks className="size-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold text-foreground">Street survey: every sign is counted</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            On each surveyed street we record every public sign, English-only signs included. They belong in the total
            because the share of signs with another language only means something compared with all the signs on the street.
            If we counted only signs with another language, every street would look 100% multilingual, and the comparison
            with the Census would be meaningless.
          </p>
        </article>
        <article className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <Images className="size-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold text-foreground">Community photos: languages other than English only</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Uploads are limited to signs with at least one language other than English. Bilingual signs (English plus
            another language) are welcome, and English-only signs are not. That keeps the gallery focused on where
            multilingual signs show up in Chicago. Because it leaves out English-only signs on purpose, it can’t be used
            to work out percentages, so community photos are never counted in an area’s score.
          </p>
        </article>
      </div>
    </section>
  )
}
