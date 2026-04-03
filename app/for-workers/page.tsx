import type { Metadata } from 'next'
import { InnerPageLayout } from '@/components/InnerPageLayout'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, Smartphone, QrCode, Wallet, ShieldCheck, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Workers (Kormi) — Kormik',
  description:
    'Build a verified work record, access jobs, and receive digital payments. Kormik gives every Kormi an economic passport.',
}

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Verified Digital ID',
    body: 'Scan your NID + face verify once. Get your KRM-YYYY-NNNNN — your permanent economic passport. Portable, tamper-proof, yours.',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Job Access',
    body: 'Browse jobs in Mohammadpur, Adabor, and Mirpur. Express interest with one tap. Join the contractor\'s live lobby. Start work.',
  },
  {
    icon: Wallet,
    title: 'Fast Digital Payments',
    body: 'Get paid via bKash or Nagad within 3–5 hours of job completion. Funds held in escrow — no delays, no disputes.',
  },
  {
    icon: QrCode,
    title: 'QR Attendance Record',
    body: 'Every day you work, your QR scan builds a verified, tamper-proof attendance ledger. Your proof of work history.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Download the app',
    body: 'Get Kormik on Android. Available for all Android smartphones.',
  },
  {
    number: '02',
    title: 'Register & verify',
    body: 'Scan your NID, complete face verification. Receive your KRM Worker ID.',
  },
  {
    number: '03',
    title: 'Browse jobs & go to work',
    body: 'Find jobs in your zone. Express interest. Scan in on site. Get paid.',
  },
]

export default function ForWorkersPage() {
  return (
    <InnerPageLayout
      heroBadge="For Workers"
      heroTitle="Your work."
      heroAccent="Your record."
      heroSub="Get verified, track your attendance with QR, and find your next job through trusted contractors — all from your phone."
    >
      {/* Benefits */}
      <section className="bg-bg-2 py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Why Kormik</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-12" style={{ letterSpacing: '-1.5px' }}>
            Built around your reality.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="group relative bg-bg border border-border rounded-xl p-6 hover:border-border-strong transition-all overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  <div className="w-9 h-9 rounded-full bg-bg-3 border border-border flex items-center justify-center mb-4">
                    <Icon className="w-[18px] h-[18px] text-text-secondary group-hover:text-brand transition-colors" />
                  </div>
                  <h3 className="font-body text-lg font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">
                    {benefit.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* KRM ID mock */}
      <section className="bg-bg py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Your Kormik ID</SectionLabel>
              <h2 className="font-display text-4xl font-extrabold text-white mb-4" style={{ letterSpacing: '-1.5px' }}>
                One ID. Lifetime record.
              </h2>
              <p className="font-body text-base text-text-secondary leading-relaxed mb-6">
                Your KRM Worker ID is your permanent economic passport. It carries your skill
                category, verified working days, payment history, and Surokha insurance status —
                all in one portable digital card.
              </p>
              <div className="space-y-3">
                {[
                  'NID-verified, face-matched identity',
                  'QR code rotates every 30 seconds — tamper-proof',
                  'Portable across all Kormik contractors and zones',
                  'Builds your Surokha + Sônchoy eligibility automatically',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-text-secondary">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock ID card */}
            <div
              className="rounded-[16px] p-6 border border-border"
              style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                  Kormik Worker ID
                </div>
                <div className="w-6 h-6 bg-brand rounded-[3px] flex items-center justify-center text-white font-bold text-xs">
                  ক
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-brand/20 text-brand font-bold text-xl flex items-center justify-center">
                  RU
                </div>
                <div>
                  <div className="font-body text-lg font-semibold text-white">রহিম উদ্দিন</div>
                  <div className="font-mono text-xs text-brand">KRM-2026-00142</div>
                  <div className="font-mono text-[10px] text-text-muted mt-0.5">Construction · Mohammadpur</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { v: '300+', l: 'Days worked' },
                  { v: '4★', l: 'Rating' },
                  { v: 'Active', l: 'Status' },
                ].map((item) => (
                  <div key={item.l} className="bg-bg-3 rounded-lg p-2 text-center">
                    <div className="font-mono text-xs text-brand font-medium">{item.v}</div>
                    <div className="font-mono text-[9px] text-text-muted">{item.l}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-success/10 border border-success/20 rounded-lg px-3 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                <span className="font-mono text-[10px] text-success">NID Verified · Surokha Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to register */}
      <section className="bg-bg-2 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>How to Register</SectionLabel>
          <h2 className="font-display text-4xl font-extrabold text-white mb-12" style={{ letterSpacing: '-1.5px' }}>
            3 steps to get started.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col">
                <div className="font-mono text-4xl font-bold text-brand/30 mb-3">
                  {step.number}
                </div>
                <div className="w-px h-8 bg-brand/30 mb-4" />
                <h3 className="font-body text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button variant="primary" size="md" href="#">
              Download for Android ↗
            </Button>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  )
}
