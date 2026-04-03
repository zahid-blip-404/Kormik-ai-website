import { Navbar }            from '@/components/Navbar'
import { HeroSection }       from '@/components/HeroSection'
import { StatsStrip }        from '@/components/StatsStrip'
import { ProblemSection }    from '@/components/ProblemSection'
import { HowItWorks }        from '@/components/HowItWorks'
import { FeaturesSection }   from '@/components/FeaturesSection'
import { AudienceDeepDive }  from '@/components/AudienceDeepDive'
import { ImpactStats }       from '@/components/ImpactStats'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { PricingSection }    from '@/components/PricingSection'
import { FAQSection }        from '@/components/FAQSection'
import { CTASection }        from '@/components/CTASection'
import { Footer }            from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsStrip />
        <ProblemSection />
        <HowItWorks />
        <FeaturesSection />
        <AudienceDeepDive />
        <ImpactStats />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
