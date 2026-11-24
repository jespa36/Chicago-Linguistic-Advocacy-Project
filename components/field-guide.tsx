import { Camera, ClipboardCheck, MapPin, Languages, Tag } from 'lucide-react'

const STEPS = [
  {
    icon: Camera,
    title: 'Snap a photo',
    text: 'Take a photo of a sign that includes at least one language other than English. This includes street signs, storefront displays, community flyers, or even murals. English-only signs should not be uploaded. Please avoid photographing others and focus on the text.',
  },
  {
    icon: MapPin,
    title: 'Confirm the location',
    text: 'Every contribution is placed on the map. The pin for it can be adjusted if the photo was taken somewhere else or at an earlier time.',
  },
  {
    icon: Languages,
    title: 'Tag the languages',
    text: 'Select every language that is represented in the photo, including at least one language other than English. Bilingual signs can have English checked as well. Mark the language that appears most prominent, or choose “not sure” if you cannot tell what a language is.',
  },
  {
    icon: Tag,
    title: 'Label the photo',
    text: 'Label it as Top-down (government, transit, municipal) or Bottom-up (storefront, local community, independent) and choose the type of display.',
  },
  {
    icon: ClipboardCheck,
    title: 'Submit for review',
    text: 'Accurate representation is a key part of our project, so every submission is reviewed before it appears on the public map.',
  },
]

export function FieldGuide({ heading = 'How contributions work' }: { heading?: string }) {
  return (
    <section id="field-guide" className="scroll-mt-20 bg-[var(--ink-navy)]">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-300">Upload Guide</p>
          <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-white md:text-4xl">{heading}</h2>
          <p className="mt-4 leading-relaxed text-slate-300">
            Learn how to document the signs seen throughout Chicago, from taking a photo to submitting it for review.
            Follow five steps based on established linguistic landscape research: photograph,
            locate, tag, label, and review. Community uploads show multilingual signs only, so they are examples and are not counted in the survey scores.
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
