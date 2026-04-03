import type { Metadata } from 'next'
import { InnerPageLayout } from '@/components/InnerPageLayout'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About Kormik — কর্মীক',
  description:
    'The origin story, team, and values behind Kormik — Bangladesh\'s digital labour infrastructure platform.',
}

const values = [
  {
    number: '01',
    title: 'Dignity first',
    body: "Every feature in Kormik is built with the worker's dignity in mind. Verified identity is not surveillance — it's protection.",
  },
  {
    number: '02',
    title: 'Radical transparency',
    body: 'Every attendance record, every payment, every quotation is auditable. Transparency is not optional — it is the product.',
  },
  {
    number: '03',
    title: 'Infrastructure, not charity',
    body: "We're not building a welfare programme. We're building economic infrastructure — the kind that makes Bangladesh's labour market function properly.",
  },
]

const roadmapItems = [
  { phase: 'Phase 1', title: 'Pilot Launch', date: 'April 2026', status: 'active', desc: 'Mohammadpur, Adabor, Mirpur — construction sector primary.' },
  { phase: 'Phase 2', title: 'Scale & API', date: 'Q3 2026', status: 'planned', desc: 'Open API for enterprise integration. Expand to RMG and transport sectors.' },
  { phase: 'Phase 3', title: 'National Registry', date: '2027', status: 'future', desc: 'Partnership with government for national informal labour registry.' },
]

export default function AboutPage() {
  return (
    <InnerPageLayout
      heroBadge="About Kormik"
      heroTitle="Built to make labour"
      heroAccent="visible."
      heroSub="The origin story, team, and values behind Kormik — Bangladesh's digital labour infrastructure platform."
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
          <SectionLabel>About Kormik</SectionLabel>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white mt-2 mb-6 max-w-[700px]">
            Built to make 36 million workers{' '}
            <em className="text-brand not-italic">count.</em>
          </h1>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-[540px] leading-relaxed">
            Kormik (কর্মীক) was born from a simple observation: Bangladesh&apos;s informal workers
            are the backbone of the economy, but they&apos;re invisible to every financial system
            that could protect and reward them.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="bg-bg-2 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel>Origin Story</SectionLabel>
              <h2 className="font-display text-4xl font-bold text-white mb-6">
                Why we built this.
              </h2>
              <div className="space-y-4 font-body text-base text-text-secondary leading-relaxed">
                <p>
                  The idea for Kormik started with a single conversation — a mason in Mohammadpur
                  who had worked construction for 15 years, could not get a bank loan, had no
                  insurance, and had no way to prove his skills to a new employer.
                </p>
                <p>
                  He wasn&apos;t untrained or unreliable. He was invisible. Not to the people around
                  him — but to the systems that could change his life.
                </p>
                <p>
                  Kormik exists to fix that. Not with charity — with infrastructure. The same way a
                  bank card makes someone visible to financial systems, a Kormik ID makes a worker
                  visible to the formal economy.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { v: '36M+', l: 'Informal workers in Bangladesh' },
                { v: '< 5%', l: 'Have any form of verified work record' },
                { v: '0', l: 'Portable digital labour ID systems in BD' },
              ].map((stat) => (
                <div
                  key={stat.l}
                  className="flex items-center gap-6 py-5 border-b border-border last:border-b-0"
                >
                  <div className="font-body text-4xl font-bold text-brand w-24 shrink-0">{stat.v}</div>
                  <div className="font-body text-base text-text-secondary">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Our Values</SectionLabel>
          <h2 className="font-display text-4xl font-bold text-white mb-12">
            What we stand for.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val) => (
              <div key={val.number} className="flex flex-col">
                <div className="font-mono text-4xl font-bold text-brand/25 mb-3">{val.number}</div>
                <div className="w-px h-8 bg-brand/30 mb-4" />
                <h3 className="font-body text-lg font-semibold text-white mb-2">{val.title}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">{val.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-bg-2 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Roadmap</SectionLabel>
          <h2 className="font-display text-4xl font-bold text-white mb-12">
            Where we&apos;re going.
          </h2>
          <div className="space-y-6">
            {roadmapItems.map((item) => (
              <div
                key={item.phase}
                className={`flex gap-6 p-6 rounded-xl border ${
                  item.status === 'active'
                    ? 'border-brand/30 bg-brand/5'
                    : 'border-border bg-bg'
                }`}
              >
                <div className="shrink-0">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-brand mb-1">{item.phase}</div>
                  <div className="font-mono text-xs text-text-muted">{item.date}</div>
                  {item.status === 'active' && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      <span className="font-mono text-[9px] text-success">Active</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-body text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="font-body text-sm text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex gap-4">
            <Button variant="primary" size="md" href="/contact">Work With Us</Button>
            <Button variant="secondary" size="md" href="/impact">See Our Impact</Button>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  )
}
