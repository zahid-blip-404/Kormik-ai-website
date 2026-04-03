import { InnerPageLayout } from '@/components/InnerPageLayout'
import { GlassCard }       from '@/components/ui/GlassCard'
import { SectionLabel }    from '@/components/ui/SectionLabel'

const sardarsFeatures = [
  {
    icon: '👥',
    title: 'Manage Your Gang Digitally',
    body:  'Add workers to your gang, assign them to sites, and track who showed up — all from one screen.',
  },
  {
    icon: '📱',
    title: 'QR Check-in for Your Team',
    body:  'Open the app, show the site QR. Every gang member\'s attendance is logged automatically.',
  },
  {
    icon: '💰',
    title: 'Transparent Payments',
    body:  'Your contractor sees exactly who worked what days. No more payment disputes over attendance.',
  },
  {
    icon: '🏆',
    title: 'Build Your Reputation',
    body:  'Sardars with verified gangs get priority placement on new sites. Your track record travels with you.',
  },
]

export default function ForSardarsPage() {
  return (
    <InnerPageLayout
      heroBadge="For Sardars"
      heroTitle="The bridge between workers"
      heroAccent="and work."
      heroSub="Kormik gives sardars the digital tools to manage their gang, track attendance, and build a verified reputation — for the first time, ever."
    >
      {/* What is a Sardar */}
      <section className="bg-bg py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-content mx-auto">
          <SectionLabel>The Role</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-6">
            <div>
              <h2
                className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4"
                style={{ letterSpacing: '-1.5px' }}
              >
                Who is a Sardar?
              </h2>
              <p className="font-body text-base text-text-secondary leading-relaxed mb-4">
                A Sardar is a gang leader — the supervisor who recruits workers, brings them to a site, oversees daily work, and is accountable to the contractor. In Bangladesh&apos;s informal construction industry, Sardars are the invisible backbone of how labour moves.
              </p>
              <p className="font-body text-base text-text-secondary leading-relaxed">
                Yet Sardars have no digital presence. No record of the gangs they&apos;ve led, the sites they&apos;ve managed, or the workers they&apos;ve delivered. Kormik changes that.
              </p>
            </div>
            <GlassCard variant="brand" className="p-8">
              <div className="text-5xl mb-4">🦺</div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Sardar Fast Facts</h3>
              <ul className="space-y-2 font-body text-sm text-text-secondary">
                <li>→ Manages 5–30 workers per gang</li>
                <li>→ Recruits from their community network</li>
                <li>→ Accountable for attendance &amp; discipline</li>
                <li>→ Currently operates without any digital tools</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-bg-2 py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-content mx-auto">
          <SectionLabel>What Kormik Gives You</SectionLabel>
          <h2
            className="font-display text-3xl md:text-4xl font-extrabold text-white mb-10 mt-2"
            style={{ letterSpacing: '-1.5px' }}
          >
            Tools built for how you actually work.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sardarsFeatures.map((f) => (
              <GlassCard key={f.title} variant="md" className="p-6">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">{f.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  )
}
