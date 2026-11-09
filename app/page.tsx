import { AboutSection } from '@/components/about-section'
import { CtaBand } from '@/components/cta-band'
import { HomeHero } from '@/components/home-hero'
import { MethodBrief } from '@/components/method-brief'
import { SolutionSection } from '@/components/solution-section'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutSection />
      <MethodBrief />
      <SolutionSection />
      <CtaBand />
    </>
  )
}
