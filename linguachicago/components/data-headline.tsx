import { cityStats } from '@/lib/metrics'

/** Headline figures computed from the community-area data (empty until data is added). */
export function DataHeadline() {
  const stats = cityStats()
  const hasScores = stats.scored > 0
  const figures = [
    {
      value: hasScores ? `${stats.under}` : '—',
      label: 'community areas where community languages are under-represented',
    },
    {
      value: stats.avgSpeakers !== null ? `${stats.avgSpeakers}%` : '—',
      label: 'average share of residents speaking another language at home*',
    },
    {
      value: stats.avgVisibility !== null ? `${stats.avgVisibility}%` : '—',
      label: 'average share of public signage that includes those languages*',
    },
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6">
      <dl className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
        {figures.map((f) => (
          <div key={f.label} className="flex items-baseline gap-4 bg-card p-5">
            <dt className="sr-only">{f.label}</dt>
            <dd className="font-serif text-4xl tabular-nums text-foreground">{f.value}</dd>
            <p aria-hidden="true" className="text-sm leading-snug text-muted-foreground">
              {f.label}
            </p>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-muted-foreground">
        {hasScores
          ? `*Across the ${stats.scored} community areas with both census and signage data where at least 10% of residents speak another language.`
          : `No community-area data has been added yet. Figures will appear once census and signage data are added (0 of ${stats.total} areas so far). The citywide benchmark below is a separate, sourced figure.`}
      </p>
    </section>
  )
}
