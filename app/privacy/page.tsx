import type { Metadata } from 'next'
import { InnerPageLayout } from '@/components/InnerPageLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy — Kormik',
  description: "Kormik's privacy policy for workers, contractors, and platform users.",
}

export default function PrivacyPage() {
  return (
    <InnerPageLayout
      showCTA={false}
      heroBadge="Legal"
      heroTitle="Privacy"
      heroAccent="Policy."
      heroSub="How Kormik collects, uses, and protects your data."
    >
      <section className="pt-40 pb-20 px-4 md:px-8 bg-bg">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand mb-3">
            ■ Legal
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="font-mono text-[11px] text-text-muted mb-12">Last updated: April 2026</p>

          <div className="prose-dark space-y-10">
            {[
              {
                title: '1. Information We Collect',
                body: `Kormik collects the following information to provide our services:

• National ID (NID) data — for worker identity verification
• Biometric data (face image) — for identity matching, not stored raw after verification
• Phone number — for account access and payment delivery
• Location data — for GPS-verified attendance check-ins
• Work history and attendance records — core platform function
• Payment details — bKash/Nagad account numbers for disbursement`,
              },
              {
                title: '2. How We Use Your Information',
                body: `Your data is used only to:

• Verify your identity and issue your KRM Worker ID
• Record and display your verified attendance history
• Facilitate job matching between workers and contractors
• Process payments via bKash or Nagad
• Build your Surokha insurance and Sônchoy savings eligibility

We do not sell your data to third parties. We do not share your data with advertisers.`,
              },
              {
                title: '3. Data Storage & Security',
                body: `All data is stored encrypted at rest and in transit. We use AES-256 encryption for stored personal data. Access to personal data is restricted to authorized Kormik personnel with legitimate operational need.

Biometric data (face images) are processed for verification and are not retained in raw form after the verification check.`,
              },
              {
                title: '4. Your Rights',
                body: `You have the right to:
• Access your data — request a full copy of your Kormik data at any time
• Correct your data — update incorrect information through the app
• Delete your account — request full account deletion, subject to regulatory retention requirements
• Data portability — receive your work history in a portable format

To exercise these rights, contact: privacy@kormik.com.bd`,
              },
              {
                title: '5. Retention',
                body: `We retain your data for as long as your account is active. After account deletion, personal data is purged within 30 days, except where required by law (e.g. payment records may be retained for 7 years under Bangladesh financial regulations).`,
              },
              {
                title: '6. Contact',
                body: `For privacy inquiries: privacy@kormik.com.bd

Kormik, Dhaka, Bangladesh`,
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
