import type { Metadata } from 'next'
import { FieldGuide } from '@/components/field-guide'
import { MethodFramework } from '@/components/method-framework'
import { PageHeader } from '@/components/page-header'
import { ResearchFramework } from '@/components/research-framework'

export const metadata: Metadata = { title: 'Methodology' }

export default function MethodPage() {
  return (
    <>
      <PageHeader eyebrow="Methodology" title="How the numbers are made, and how the contributions are collected">
        <p>
          The analytical framework explains the census math behind the gap. The field guide explains the steps needed to 
          upload your contributions.
        </p>
      </PageHeader>
      <MethodFramework />
      <FieldGuide heading="The field guide" />
      <ResearchFramework />
    </>
  )
}
