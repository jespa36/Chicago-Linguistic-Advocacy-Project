import type { Metadata } from 'next'
import { FieldGuide } from '@/components/field-guide'
import { MethodFramework } from '@/components/method-framework'
import { PageHeader } from '@/components/page-header'
import { ResearchFramework } from '@/components/research-framework'

export const metadata: Metadata = { title: 'Methodology' }

export default function MethodPage() {
  return (
    <>
      <PageHeader eyebrow="Methodology" title="How the numbers are made, and how signs are surveyed and submitted">
        <p>
          The analytical framework explains the census math behind the gap. The Upload Guide gives an explanation and process of all the steps needed to contribute a photo.
        </p>
      </PageHeader>
      <MethodFramework />
      <FieldGuide heading="Upload Guide" />
      <ResearchFramework />
    </>
  )
}
