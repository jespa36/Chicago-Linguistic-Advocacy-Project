import type { Metadata } from 'next'
import { Hourglass, ShieldCheck } from 'lucide-react'
import { ContributeForm } from '@/components/contribute-form'
import { FieldGuide } from '@/components/field-guide'
import { PageHeader } from '@/components/page-header'
import { SITE } from '@/lib/site'
import { SUPABASE_ENABLED } from '@/lib/supabase'

export const metadata: Metadata = { title: 'Contribute' }

export default function ContributePage() {
  return (
    <>
      <PageHeader eyebrow="Contribute" title="Help document Chicago's linguistic landscape">
        <p>
          One person can&apos;t map all of Chicago. Photos of public signs and text from students, residents, and language
          advocates will help build a record of the languages that are visible in public space.
        </p>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {SUPABASE_ENABLED ? (
            <ContributeForm />
          ) : (
          <div className="rounded-xl border border-dashed border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <Hourglass className="size-5 text-primary" aria-hidden="true" />
              <h2 className="font-semibold text-foreground">Photo submissions are a work in progress</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We are finishing the review system so that every submission can be checked for accuracy before it appears on the map. For now, you can send photos by email.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=LinguaChicago%20contributions`}
              className="mt-5 inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Email {SITE.email}
            </a>
          </div>
          )}

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
              <h2 className="font-semibold text-foreground">Before you photograph</h2>
            </div>
            <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
              <li>Please photograph top-down and bottom-up signs. Try to avoid people, faces, license plates, and private homes.</li>
              <li>Safety always comes first. Stay on public property and follow local rules.</li>
              <li>Approved photo submissions will be shown publicly on the map, with the location included.</li>
            </ul>
          </div>
        </div>
      </section>

      <FieldGuide />
    </>
  )
}
