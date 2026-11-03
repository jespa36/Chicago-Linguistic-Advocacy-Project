import { Camera, ClipboardCheck, MapPin, Languages, Tag } from 'lucide-react'

const STEPS = [
  {
    icon: Camera,
    title: 'Snap a photo',
    text: 'Take a photo of any linguistic landscape markings. Markings in public environments include street signs, storefront displays, community flyer, or even murals. Please photograph only the text that is visible.',
  },
  {
    icon: MapPin,
    title: 'Confirm the location',
    text: 'Every contribution is placed on the map. The pin for it can be adjusted if the photo was taken somewhere else or at an earlier time.',
  },
  {
    icon: Languages,
    title: 'Tag the languages',
    text: 'Select every language that is represented in the photo, mark the langauge that appears more prominent, or choose “not sure” if you cannot tell.',
  },
  {
    icon: Tag,
    title: 'Label the photo',
    text: 'Label it as Top-down (government, transit, municipal) or Bottom-up (storefront, local community, independent) and choose the type of display.',
  },
  {
    icon: ClipboardCheck,
    title: 'Submit for review',
    text: 'Accurate representation is a key component of our project, every submission will undergo the process of being before it appears on the public map.',
  },
]

export function FieldGuide({ heading = 'How contributions work' }: { heading?: string }) {
  return (
    <section id="field-guide" className="scroll-mt-20 bg-[var(--ink-navy)]">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-300">The field guide</p>
          <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-white md:text-4xl">{heading}</h2>
          <p className="mt-4 leading-relaxed text-slate-300">
            Learn how to document public text displays seen throughout Chicago. From taking a photo to submitting for review. 
            Follow five steps based on established linguistic landscape research: photograph,
            locate, tag, label, and review.
          </p>
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-[var(--flag-blue)]/20 text-sky-300">
                <step.icon className="size-5" aria-hidden="true" />
              </div>
              <div className="text-[11px] font-bold tracking-wider text-sky-300/80">STEP {i + 1}</div>
              <h3 className="mt-1 font-semibold text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
