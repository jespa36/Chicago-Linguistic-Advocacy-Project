import type { Metadata } from 'next'
import { CitywideBenchmark } from '@/components/citywide-benchmark'
import { DataHeadline } from '@/components/data-headline'
import { DataProgress } from '@/components/data-progress'
import { LanguageBreakdown } from '@/components/language-breakdown'
import { PageHeader } from '@/components/page-header'
import { Rankings } from '@/components/rankings'

export const metadata: Metadata = { title: 'Data & Gaps' }

export default function DataPage() {
  return (
    <>
      <PageHeader eyebrow="Data & Gaps" title="Where public space keeps pace with the people in it, and where it doesn't">
        <p>
          Census data on the languages Chicagoans speak, set against what a field survey finds on public signs. Only
          real, sourced data is shown.
        </p>
      </PageHeader>
      <DataHeadline />
      <CitywideBenchmark />
      <Rankings />
      <LanguageBreakdown />
      <DataProgress />
    </>
  )
}
