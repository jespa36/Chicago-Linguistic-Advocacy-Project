import type { Metadata } from 'next'
import { MapExplorer } from '@/components/map-explorer'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = { title: 'Map & Explore' }

export default function MapPage() {
  return (
    <>
      <PageHeader eyebrow="Map & Explore" title="Language equity across Chicago's 77 community areas">
        <p>
          Compare the languages residents speak with the languages visible in public space. Select a community area to
          see its language profile and visibility gap.
        </p>
      </PageHeader>
      <MapExplorer />
    </>
  )
}
