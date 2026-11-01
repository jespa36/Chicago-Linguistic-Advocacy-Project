import { CITYWIDE, LANGUAGE_GROUPS, fmt, pctOfUniverse, roundThousand } from '@/lib/citywide'

export function CitywideBenchmark() {
  const headline = roundThousand(CITYWIDE.nonEnglish)
  const moe = Math.round(CITYWIDE.nonEnglishMoe / 1000) * 1000
  const maxShare = pctOfUniverse(LANGUAGE_GROUPS[0].estimate)

  return (
    <section id="citywide" className="scroll-mt-20 border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Citywide benchmark</p>
            <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
              About {fmt(headline)} Chicagoans speak a language other than English at home
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              That is an estimated {pctOfUniverse(CITYWIDE.nonEnglish).toFixed(1)}% of the {fmt(CITYWIDE.universe)} residents age
              5 and up, with a margin of error of about ±{fmt(moe)}. The Census does not measure bilingualism directly,
              but it does ask how well those residents speak English.
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-background p-4">
                <dt className="text-sm text-muted-foreground">Speak English &ldquo;very well&rdquo;</dt>
                <dd className="mt-1 font-serif text-3xl tabular-nums text-foreground">
                  {fmt(roundThousand(CITYWIDE.nonEnglishEnglishVeryWell))}
                </dd>
                <p className="text-xs text-muted-foreground">
                  {pctOfUniverse(CITYWIDE.nonEnglishEnglishVeryWell).toFixed(1)}% of residents
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <dt className="text-sm text-muted-foreground">Speak English less than &ldquo;very well&rdquo;</dt>
                <dd className="mt-1 font-serif text-3xl tabular-nums text-foreground">
                  {fmt(roundThousand(CITYWIDE.nonEnglishEnglishLessThanVeryWell))}
                </dd>
                <p className="text-xs text-muted-foreground">
                  {pctOfUniverse(CITYWIDE.nonEnglishEnglishLessThanVeryWell).toFixed(1)}% of residents
                </p>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Language groups (share of residents age 5+)</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {LANGUAGE_GROUPS.map((g) => {
                const share = pctOfUniverse(g.estimate)
                return (
                  <li key={g.group} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1">
                    <span className="text-sm text-foreground">
                      {g.group}
                      {g.note && <span className="text-muted-foreground"> ({g.note})</span>}
                    </span>
                    <span className="text-right text-sm tabular-nums text-foreground">{share.toFixed(1)}%</span>
                    <span className="col-span-2 flex items-center gap-3">
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                        <span
                          className="block h-full rounded-full bg-[var(--flag-blue)]"
                          style={{ width: `${Math.max(1.5, (share / maxShare) * 100)}%` }}
                        />
                      </span>
                      <span className="w-40 text-right text-xs tabular-nums text-muted-foreground">
                        ~{fmt(g.estimate)} ±{fmt(g.moe)}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Source: {CITYWIDE.source}. Smaller groups have wide margins of error, so treat their counts as rough. The
              Census groups languages broadly (for example, Polish is counted with Russian and other Slavic languages),
              so it cannot show individual languages beyond these groups.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
