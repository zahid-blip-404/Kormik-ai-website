import { InnerPageLayout } from '@/components/InnerPageLayout'
import { GlassCard }       from '@/components/ui/GlassCard'
import { SectionLabel }    from '@/components/ui/SectionLabel'
import { Button }          from '@/components/ui/Button'

const features = [
  {
    icon: '📋',
    title: 'Labour Compliance Dashboard',
    body:  'Audit-ready attendance records for every worker on every site. Formatted for Bangladesh Labour Act reporting.',
  },
  {
    icon: '📊',
    title: 'Workforce Analytics',
    body:  'Real-time headcount, attendance rates, and productivity metrics across all your sites in one dashboard.',
  },
  {
    icon: '🌱',
    title: 'ESG-Ready Reporting',
    body:  'Verifiable labour data for your ESG disclosures — worker count, hours, safety compliance, and more.',
  },
  {
    icon: '🔌',
    title: 'API Integration',
    body:  'Connect Kormik attendance data to your existing HR and ERP systems via a clean REST API.',
  },
]

export default function ForEnterprisePage() {
  return (
    <InnerPageLayout
      heroBadge="For Organizations"
      heroTitle="Labour infrastructure for"
      heroAccent="enterprise scale."
      heroSub="Compliance dashboards, workforce analytics, and ESG-ready attendance records — for organizations that need verified labour data at scale."
    >
      {/* Features */}
      <section className="bg-bg py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-content mx-auto">
          <SectionLabel>What You Get</SectionLabel>
          <h2
            className="font-display text-3xl md:text-4xl font-extrabold text-white mb-10 mt-2"
            style={{ letterSpacing: '-1.5px' }}
          >
            Everything you need to manage labour at scale.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <GlassCard key={f.title} variant="md" className="p-6">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">{f.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Request demo CTA */}
      <section className="bg-bg-2 py-16 px-4 md:px-8 text-center">
        <div className="max-w-xl mx-auto">
          <GlassCard variant="brand" className="p-10">
            <h3
              className="font-display text-2xl font-extrabold text-white mb-3"
              style={{ letterSpacing: '-1px' }}
            >
              Ready to get started?
            </h3>
            <p className="font-body text-sm text-text-secondary mb-6 leading-relaxed">
              Book a 30-minute demo. We&apos;ll show you the compliance dashboard and walk through the API.
            </p>
            <Button variant="primary" size="md" href="/contact">
              Request a Demo →
            </Button>
          </GlassCard>
        </div>
      </section>
    </InnerPageLayout>
  )
}
