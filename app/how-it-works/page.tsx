import type { Metadata } from 'next'
import { InnerPageLayout } from '@/components/InnerPageLayout'
import { HowItWorks } from '@/components/HowItWorks'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'How It Works — Kormik',
  description:
    'A deep-dive into how Kormik verifies workers, records attendance, manages the job lobby, and sends payments via bKash and Nagad.',
}

export default function HowItWorksPage() {
  return (
    <InnerPageLayout
      heroBadge="How It Works"
      heroTitle="From registration"
      heroAccent="to paycheck."
      heroSub="A deep-dive into how Kormik verifies workers, records attendance, manages the job lobby, and sends payments via bKash and Nagad."
    >
      {/* Hero */}
      <section
        className="relative pt-40 pb-16 px-4 md:px-8"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, #1A0800 0%, #0A0A0A 65%)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionLabel>How it works</SectionLabel>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white mt-2 mb-6 max-w-[700px]">
            Infrastructure built for{' '}
            <em className="text-brand not-italic">real labour.</em>
          </h1>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-[540px] leading-relaxed">
            From registration to payment — every step of Kormik is designed to work in the
            conditions of Bangladesh&apos;s informal labour market. No laptop required. No bank
            account needed. Just a smartphone.
          </p>
        </div>
      </section>

      {/* Reuse the HowItWorks component */}
      <HowItWorks />

      {/* Payment detail */}
      <section className="bg-bg py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Payment Flow</SectionLabel>
              <h2 className="font-display text-4xl font-bold text-white mb-4">
                Get paid the same day.
              </h2>
              <p className="font-body text-base text-text-secondary leading-relaxed mb-6">
                After job completion is confirmed by the supervisor, Kormik releases payment from
                escrow to your bKash or Nagad account — within 3 to 5 hours. No cash. No
                middlemen. No delays.
              </p>
              <div className="space-y-4">
                {[
                  { step: '01', text: 'Supervisor marks job complete on site' },
                  { step: '02', text: 'Kormik releases escrow payment' },
                  { step: '03', text: 'Worker receives bKash / Nagad notification' },
                  { step: '04', text: 'Transaction recorded in permanent ledger' },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-4">
                    <span className="font-mono text-xs text-brand/60 shrink-0 w-6">{item.step}</span>
                    <span className="font-body text-sm text-text-secondary">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-xl p-6 border border-border"
              style={{ background: '#111111' }}
            >
              <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-4">
                Payment Receipt
              </div>
              {[
                { label: 'Worker', value: 'রহিম উদ্দিন' },
                { label: 'Worker ID', value: 'KRM-2026-00142' },
                { label: 'Site', value: 'Construction Site A, Mohammadpur' },
                { label: 'Hours worked', value: '8.5 hours' },
                { label: 'Rate (PWD)', value: '৳100/hr' },
                { label: 'Total earned', value: '৳850' },
                { label: 'Payment method', value: 'bKash' },
                { label: 'Status', value: '✓ Confirmed' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between py-2.5 border-b border-border last:border-b-0"
                >
                  <span className="font-mono text-[11px] text-text-muted">{row.label}</span>
                  <span className="font-body text-sm text-white">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA inline */}
      <section className="bg-bg-2 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-white mb-2">
              Ready to make your work count?
            </h2>
            <p className="font-body text-base text-text-secondary">
              Join Kormik — free for all workers.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Button variant="primary" size="md" href="#">Download App ↗</Button>
            <Button variant="secondary" size="md" href="/contact">Contact Us</Button>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  )
}
