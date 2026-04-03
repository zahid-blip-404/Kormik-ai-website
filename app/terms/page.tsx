import type { Metadata } from 'next'
import { InnerPageLayout } from '@/components/InnerPageLayout'

export const metadata: Metadata = {
  title: 'Terms of Service — Kormik',
  description: "Kormik's terms of service for all platform users.",
}

export default function TermsPage() {
  return (
    <InnerPageLayout
      showCTA={false}
      heroBadge="Legal"
      heroTitle="Terms of"
      heroAccent="Service."
      heroSub="The terms governing your use of the Kormik platform."
    >
      <section className="pt-40 pb-20 px-4 md:px-8 bg-bg">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand mb-3">
            ■ Legal
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="font-mono text-[11px] text-text-muted mb-12">Last updated: April 2026</p>

          <div className="space-y-10">
            {[
              {
                title: '1. Acceptance of Terms',
                body: 'By using the Kormik platform (the "Platform"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.',
              },
              {
                title: '2. Platform Description',
                body: `Kormik provides a digital labour infrastructure platform that includes:
• Worker identity verification and KRM Worker ID issuance
• Job matching between workers and contractors
• QR-based attendance recording
• Payment facilitation via Mobile Financial Services (bKash, Nagad)
• Insurance (Surokha) and savings (Sônchoy) programme access`,
              },
              {
                title: '3. User Obligations',
                body: `All users agree to:
• Provide accurate and truthful information during registration
• Not share account credentials with others
• Not attempt to manipulate attendance records, fake identity, or defraud other users
• Use the platform only for lawful purposes consistent with Bangladesh law

Workers (Kormi) additionally agree to:
• Provide genuine NID for verification
• Only scan QR codes for jobs they are physically present at

Contractors (Mukadam / Sangathan) additionally agree to:
• Only post genuine job opportunities
• Honor agreed wages for completed work
• Maintain escrow funds sufficient to cover payroll`,
              },
              {
                title: '4. Payments and Escrow',
                body: 'Contractors are required to fund escrow before workers can be engaged. Payments are disbursed to workers via bKash or Nagad upon job completion confirmation. Kormik acts as a payment facilitator, not a financial institution. Payment disputes are subject to Kormik\'s dispute resolution process.',
              },
              {
                title: '5. Intellectual Property',
                body: 'All content on the Kormik platform — including the Kormik brand, logo, design, and software — is the property of Kormik and protected by applicable intellectual property laws. Workers retain ownership of their personal data and work history.',
              },
              {
                title: '6. Limitation of Liability',
                body: 'To the maximum extent permitted by law, Kormik shall not be liable for indirect, incidental, or consequential damages arising from use of the Platform. Kormik is a technology platform facilitating connections between workers and contractors — it is not an employer of workers listed on the platform.',
              },
              {
                title: '7. Governing Law',
                body: 'These Terms are governed by the laws of the People\'s Republic of Bangladesh. Any disputes shall be resolved in the courts of Dhaka, Bangladesh.',
              },
              {
                title: '8. Contact',
                body: 'For terms inquiries: legal@kormik.com.bd\n\nKormik, Dhaka, Bangladesh',
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-bold text-white mb-3">{section.title}</h2>
                <p className="font-body text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  )
}
