import { cityStats } from '@/lib/metrics'
import { SNAPSHOTS } from '@/lib/data'

export function DataProgress() {
  const stats = cityStats()
  const progress = [
    { label: 'Census language data (by community area)', value: stats.withCensus },
    { label: 'Signage survey', value: stats.withSignage },
  ]

  return (
    <section id="progress" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 md:px-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-sm font-semibold text-foreground">Data collection progress</h2>
        <ul className="mt-4 flex flex-col gap-4">
          {progress.map((p) => (
            <li key={p.label} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-muted-foreground">{p.label}</span>
                <span className="tabular-nums text-foreground">
                  {p.value} / {stats.total} areas
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${(p.value / stats.total) * 100}%` }} />
              </div>
            </li>
          ))}
          <li className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Field snapshots</span>
            <span className="tabular-nums text-foreground">{SNAPSHOTS.length} recorded</span>
          </li>
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Only real, sourced data is shown on this site. Areas without data appear in gray as &ldquo;No data yet.&rdquo;
          Community area boundaries come from the City of Chicago Data Portal.
        </p>
      </div>
    </section>
  )
}
