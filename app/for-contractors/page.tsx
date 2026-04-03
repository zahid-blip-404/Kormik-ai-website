import type { Metadata } from 'next'
import { InnerPageLayout } from '@/components/InnerPageLayout'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, QrCode, FileText, Users, ShieldCheck, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Contractors & Mukadam — Kormik',
  description:
    'Verified workers, QR attendance, formal quotations, and zero payroll disputes. Kormik is built for Mukadam and Sangathan.',
}

const painPoints = [
  {
    title: 'No reliable attendance records',
    body: 'Manual paper logs are disputed, lost, or manipulated. End-of-week reconciliation is a nightmare.',
  },
  {
    title: 'Wage disputes erode trust',
    body: 'Without tamper-proof records, workers and contractors argue over days worked and amounts owed.',
  },
  {
    title: 'Ghost workers and no-shows',
    body: 'Without verified identity, you can\'t know if the person who showed up is who you hired.',
  },
]

const solutions = [
  {
    icon: QrCode,
    title: 'QR Scan Attendance',
    body: 'Workers scan in on-site. GPS recorded. QR rotates every 30 seconds — no faking possible. Instant audit trail.',
  },
  {
    icon: ShieldCheck,
    title: 'KRM-Verified Workers Only',
    body: 'Every worker on Kormik has NID + face verification. You know exactly who is on your site.',
  },
  {
    icon: FileText,
    title: 'Formal PDF Quotations',
    body: 'Generate QT-YYYY-NNNNN quotations for clients, NGOs, and government procurement. Professional. Instant.',
  },
  {
    icon: Clock,
    title: 'Real-Time Job Lobby',
    body: 'Post a job. Watch worker cards appear live. Select who you want. Start work — all within minutes.',
  },
]

const mukadamVsSangathan = [
  { feature: 'Trade licence required', mukadam: '✗ No', sangathan: '✓ Yes' },
  { feature: 'Max crew size', mukadam: 'Up to 10', sangathan: 'Unlimited' },
  { feature: 'QR attendance', mukadam: '✓ Yes', sangathan: '✓ Yes' },
  { feature: 'Job lobby access', mukadam: '✓ Yes', sangathan: '✓ Yes' },
  { feature: 'PDF quotation engine', mukadam: 'Basic', sangathan: 'Full enterprise' },
  { feature: 'Surokha for crew', mukadam: '✓ Yes', sangathan: '✓ Yes' },
  { feature: 'Payroll via bKash/Nagad', mukadam: '✓ Yes', sangathan: '✓ Yes' },
]

export default function ForContractorsPage() {
  return (
    <InnerPageLayout
      heroBadge="For Contractors"
      heroTitle="Hire verified workers."
      heroAccent="Build with confidence."
      heroSub="Browse verified workers with attendance records and trust scores. Automate site attendance with QR check-in. Pay based on real data."
    >
      {/* Pain points */}
      <section className="bg-bg-2 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="font-display text-4xl font-extrabold text-white mb-12" style={{ letterSpacing: '-1.5px' }}>
            Sound familiar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((pain) => (
              <div key={pain.title} className="bg-bg border border-border rounded-xl p-6">
                <div className="w-2 h-8 bg-brand/30 rounded mb-4" />
                <h3 className="font-body text-lg font-semibold text-white mb-2">{pain.title}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">{pain.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-bg py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>How Kormik Fixes It</SectionLabel>
          <h2 className="font-display text-4xl font-extrabold text-white mb-12" style={{ letterSpacing: '-1.5px' }}>
            The full stack for labour management.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((sol) => {
              const Icon = sol.icon
              return (
                <div
                  key={sol.title}
                  className="group relative bg-bg-2 border border-border rounded-xl p-6 hover:border-border-strong transition-all overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  <div className="w-9 h-9 rounded-full bg-bg-3 border border-border flex items-center justify-center mb-4">
                    <Icon className="w-[18px] h-[18px] text-text-secondary group-hover:text-brand transition-colors" />
                  </div>
                  <h3 className="font-body text-lg font-semibold text-white mb-2">{sol.title}</h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{sol.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mukadam vs Sangathan table */}
      <section className="bg-bg-2 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Plan Comparison</SectionLabel>
          <h2 className="font-display text-4xl font-extrabold text-white mb-12" style={{ letterSpacing: '-1.5px' }}>
            Mukadam vs Sangathan — which are you?
          </h2>
          <div className="bg-bg border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 border-b border-border">
              <div className="p-4 font-mono text-[10px] uppercase tracking-wider text-text-muted">Feature</div>
              <div className="p-4 font-mono text-[10px] uppercase tracking-wider text-brand border-l border-border">Mukadam</div>
              <div className="p-4 font-mono text-[10px] uppercase tracking-wider text-text-secondary border-l border-border">Sangathan</div>
            </div>
            {mukadamVsSangathan.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${i < mukadamVsSangathan.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="p-4 font-body text-sm text-text-secondary">{row.feature}</div>
                <div className="p-4 font-body text-sm text-white border-l border-border">{row.mukadam}</div>
                <div className="p-4 font-body text-sm text-text-secondary border-l border-border">{row.sangathan}</div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] text-text-muted mt-4">
            * Mukadam = community mobiliser without trade licence · Sangathan = licensed contractor firm
          </p>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="bg-bg py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-xl p-8 md:p-12"
            style={{
              background: 'linear-gradient(135deg, rgba(255,92,26,0.08) 0%, rgba(10,10,10,0) 60%)',
              borderTop: '1px solid rgba(255,92,26,0.20)',
              borderBottom: '1px solid rgba(255,92,26,0.20)',
            }}
          >
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="font-display text-3xl font-extrabold text-white mb-4" style={{ letterSpacing: '-1.5px' }}>
              Fair pricing built on Bangladesh PWD rates.
            </h2>
            <p className="font-body text-base text-text-secondary max-w-[520px] leading-relaxed mb-8">
              Kormik uses official PWD schedule rates adjusted by skill level. No guesswork. Every
              quotation is transparent, traceable, and legally defensible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="md" href="/#pricing">
                See How Pricing Works
              </Button>
              <Button variant="ghost" size="md" href="/contact">
                Request a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  )
}
