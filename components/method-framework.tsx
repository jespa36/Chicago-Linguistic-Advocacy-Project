const STEPS = [
  {
    title: 'Who speaks what',
    body: 'Citywide, we use the 2025 American Community Survey 1-year estimates (table C16001). For the 77 community areas, we will use 2020–2024 5-year estimates from CMAP’s CCA 2026 Community Data Snapshots, because 1-year estimates are not available for small areas.',
  },
  {
    title: 'What is visible',
    body: 'A systematic survey of public signs (storefronts, government notices, transit, community boards), recording every language on each sign. By “sign” we mean any public display of text, including flyers and murals with writing. Crowd contributions will be reviewed and kept separate from survey data, since volunteers photograph where they happen to walk.',
  },
  {
    title: 'Measuring the gap',
    body: 'The share of surveyed signs that include a non-English language, divided by the share of residents who speak one. 85% or above counts as well represented, 50–85% as partially represented, and below 50% as under-represented. An area needs at least 30 surveyed signs to be scored; with fewer, the result is too uncertain (about ±18 percentage points at 30 signs, even for a random sample), so the map shows “Too few signs surveyed.” These cutoffs and the minimum are provisional.',
  },
  {
    title: 'What it misses',
    body: 'Census data does not capture dialects such as African American English, many Indigenous languages, or ASL, and sign counts cannot measure spoken services. Census language groups are also broad, so sign languages are rolled up into Census groups for comparison. Census figures are also estimates from a sample of households, so they carry a margin of error.',
  },
]

export function MethodFramework() {
  return (
    <section id="framework" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 md:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">The analytical framework</p>
        <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">How the map is built</h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          This project pairs demographic data with on-the-ground observation of the written languages that shape public
          space.
        </p>
      </div>
      <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-3 bg-background p-6">
            <span className="font-serif text-3xl text-accent">0{i + 1}</span>
            <h3 className="font-semibold text-foreground">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
