import { Smartphone, TriangleAlert } from 'lucide-react'

/** Decorative pattern only. It is not a real, scannable QR code. */
const CELLS = [
  '1111111010111111',
  '1000001001000001',
  '1011101110101101',
  '1011101011101101',
  '1011101001001101',
  '1000001101000001',
  '1111111010111111',
  '0000000011000000',
  '1101011100110101',
  '0110100011011010',
  '1011011001101101',
  '0100110110010010',
  '1010001011101011',
  '0011110100110100',
  '1110101110011101',
  '0101010011100110',
]

function QrIllustration() {
  return (
    <svg viewBox="0 0 16 16" className="size-24 shrink-0" aria-hidden="true" shapeRendering="crispEdges">
      <rect width="16" height="16" fill="#fff" />
      {CELLS.flatMap((row, y) =>
        row.split('').map((c, x) => (c === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#0b2233" /> : null)),
      )}
    </svg>
  )
}

const LIMITS = [
  'It only helps people who have access to a smartphone, data, and know to scan. It does not replace a translated sign.',
  'Translations need review by speakers of the community, or the information could be wrong or misinterpreted.',
  'Links have to be kept up. A QR code that is inaccessible such as leading to an old or dead page is worse than no QR code at all.',
  'Cities and businesses rightfully have their own rules about what can go on a sign, approval would be needed to implement this.',
]

export function SolutionSection() {
  return (
    <section id="solution" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">A possible next step</p>
            <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground md:text-4xl">
              One idea for closing this gap: a QR code next to or on the English sign.
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              It is unrealistic for every langauge to appear on one sign. It would be too expensive as well as hard to read and understand. A smaller idea and
              solution to this would be to put a QR code beside or on a English-only sign that would be able to translate the information to any other language a person speaks. The census
              data on this site could help decide which languages to offer, and the sign survey could show the areas where gaps are the biggest. 
              This would be a way to help people who do not speak English understand the information on the sign, which is
              most often English-only.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              This is a proposal from our project, not something we have built or tested with residents, the city, or any
              businesses. We include it because the point of this project identifies and displays a problem with the language gap seen in Chicago, 
              but doing this offers a solution or alternative to solving the issue. We hope this influences other people to think about the problem 
              and potentially come up with their own solutions and alternative ways to solve and improve this issue. 
            </p>

            <h3 className="mt-8 flex items-center gap-2 font-semibold text-foreground">
              <TriangleAlert className="size-4 text-accent" aria-hidden="true" />
              Limits we can already see
            </h3>
            <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-muted-foreground">
              {LIMITS.map((l) => (
                <li key={l} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-border" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <figure>
            <div className="rounded-xl border border-border bg-card p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Concept sketch</p>
              <div className="mt-4 rounded-lg bg-[var(--ink-navy)] p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">Notice</p>
                <p className="mt-2 font-serif text-2xl leading-snug">Street cleaning: no parking Tuesdays, 9 a.m. to 3 p.m.</p>
                <div className="mt-6 flex items-center gap-5 rounded-md bg-white p-4 text-[var(--ink-navy)]">
                  <QrIllustration />
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <Smartphone className="size-4" aria-hidden="true" />
                      Scan this for information in your language
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">
                      <span lang="es">Español</span> · <span lang="pl">Polski</span> ·{' '}
                      <span lang="ar" dir="rtl">
                        العربية
                      </span>{' '}
                      · <span lang="zh">中文</span>
                    </p>
                  </div>
                </div>
              </div>
              <figcaption className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Illustration only. The pattern is not a working QR code, and the notice and languages are examples. Which
                languages to offer would come from the census data for that area.
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
