import { Images, ListChecks, TriangleAlert } from 'lucide-react'

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
      <article className="mt-6 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <TriangleAlert className="size-5 text-accent" aria-hidden="true" />
          <h3 className="font-semibold text-foreground">A limit on our counts: English-only signs are easy to miss</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Each street was counted on foot by one person, and English-only signs are so common that they are easy to overlook.
          If some were missed, the share of signs with another language is a little too high, so read the exact percentages as
          upper estimates. To see how much this could matter, we asked how many English-only signs would have to be missing
          before a street moved to a lower category. West Ridge is the closest: if we missed about as many English-only signs
          as we recorded, it would drop from “well represented” to “partially represented.” For the other five streets, the
          number missed would have to be at least 1.7 times the English-only signs we did record.
        </p>
      </article>
    </section>
  )
}
