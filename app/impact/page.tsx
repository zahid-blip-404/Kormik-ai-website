import type { Metadata } from 'next'
import { InnerPageLayout } from '@/components/InnerPageLayout'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { StatCell } from '@/components/ui/StatCell'

export const metadata: Metadata = {
  title: 'Impact — Kormik',
  description:
    "Kormik's mission is economic visibility for Bangladesh's 36 million informal workers. Learn about our impact strategy.",
}

const industries = [
  { icon: '🏗', name: 'Construction', workers: '8M+', note: 'Largest informal sector' },
  { icon: '🏭', name: 'RMG', workers: '4M+', note: 'Garment + textile' },
  { icon: '🚛', name: 'Transport', workers: '3M+', note: 'Rickshaw, CNG, logistics' },
  { icon: '🧹', name: 'Municipal', workers: '2M+', note: 'Cleaning, sanitation, civic work' },
]

const stats = [
  { value: '36M+', label: 'informal workers in Bangladesh' },
  { value: '3', label: 'active pilot zones in Dhaka' },
  { value: '4', label: 'industries served' },
  { value: '< 50ms', label: 'attendance record after QR scan' },
]

export default function ImpactPage() {
  return (
    <InnerPageLayout
      heroBadge="Impact"
      heroTitle="36 million workers."
      heroAccent="One platform."
      heroSub="Kormik's mission is economic visibility for Bangladesh's informal workers. Here's how we measure it."
    >
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 px-4 md:px-8"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, #1A0800 0%, #0A0A0A 65%)',
        }}
      >
        <div className="absolute inset-0 grid-texture pointer-events-none opacity-50" />
        <div className="max-w-6xl mx-auto relative">
          <SectionLabel>Our Impact</SectionLabel>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white mt-2 mb-6 max-w-[700px]">
            Making{' '}
            <em className="text-brand not-italic">invisible labour</em>
            <br />
            economically visible.
          </h1>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-[540px] leading-relaxed mb-8">
            Bangladesh&apos;s informal economy employs over 36 million workers who contribute
            massively to GDP — yet remain unverified, unprotected, and invisible to financial
            systems. Kormik changes that.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-bg-2 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>The Numbers</SectionLabel>
          <h2 className="font-display text-4xl font-bold text-white mb-12">
            The scale we&apos;re solving for.
          </h2>
          <div className="bg-bg border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <StatCell
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  last={i === stats.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pilot zones */}
      <section className="bg-bg py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Pilot Zones</SectionLabel>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Starting in Dhaka, growing zone by zone.
          </h2>
          <p className="font-body text-base text-text-secondary max-w-[560px] leading-relaxed mb-12">
            Kormik pilots in three high-density labour zones in Dhaka — where informal workers are
            most concentrated and contractor networks are most established.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Mohammadpur', 'Adabor', 'Mirpur'].map((zone) => (
              <div key={zone} className="bg-bg-2 border border-border rounded-xl p-6">
                <div className="w-2 h-12 bg-brand rounded mb-4" />
                <h3 className="font-display text-2xl font-bold text-white mb-2">{zone}</h3>
                <p className="font-body text-sm text-text-secondary">
                  Active pilot zone — Dhaka, Bangladesh
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="font-mono text-[10px] text-success">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-bg-2 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Industries</SectionLabel>
          <h2 className="font-display text-4xl font-bold text-white mb-12">
            4 industries. Millions of workers.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind) => (
              <div key={ind.name} className="bg-bg border border-border rounded-xl p-6">
                <div className="text-3xl mb-4">{ind.icon}</div>
                <h3 className="font-body text-lg font-semibold text-white mb-1">{ind.name}</h3>
                <div className="font-body text-2xl font-bold text-brand mb-1">{ind.workers}</div>
                <p className="font-mono text-[10px] text-text-muted">{ind.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economic argument */}
      <section className="bg-bg py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto max-w-[800px]">
          <SectionLabel>The Argument</SectionLabel>
          <h2 className="font-display text-4xl font-bold text-white mb-6">
            Visibility is the prerequisite for everything.
          </h2>
          <div className="space-y-6 font-body text-base text-text-secondary leading-relaxed">
            <p>
              When a worker has no verified identity, they cannot access insurance. They cannot
              prove their income to a bank. They cannot demonstrate their skills to new employers.
              They are invisible to the formal economy — even though they are the ones building it.
            </p>
            <p>
              Kormik&apos;s approach starts with visibility. Once a worker is verified and their
              attendance is tracked, every other financial service becomes possible: insurance,
              savings, credit, pension. The verified attendance record is the foundation for
              everything.
            </p>
            <blockquote className="border-l-[3px] border-brand pl-6 py-1">
              <p className="font-display italic text-xl text-white">
                &ldquo;Whoever controls verified attendance, controls labour revenue.&rdquo;
              </p>
            </blockquote>
          </div>
          <div className="mt-10">
            <Button variant="primary" size="md" href="/about">
              Read Our Story
            </Button>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  )
}
