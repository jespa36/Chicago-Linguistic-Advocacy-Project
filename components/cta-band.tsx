import Link from 'next/link'
import { Camera } from 'lucide-react'

export function CtaBand() {
  return (
    <section className="bg-[var(--ink-navy)] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 md:flex-row md:items-center md:px-6">
        <div className="max-w-xl">
          <h2 className="text-balance font-serif text-3xl leading-tight">Help document the signs.</h2>
          <p className="mt-3 text-pretty leading-relaxed text-slate-300">
            No single person can map all of Chicago. Photo submissions are work in progress..
          </p>
        </div>
        <Link
          href="/contribute/"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          <Camera className="size-4" />
          How to contribute
        </Link>
      </div>
    </section>
  )
}
