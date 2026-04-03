'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionLabel } from './ui/SectionLabel'
import { AudienceSwitcher, AudienceTab } from './AudienceSwitcher'
import { fadeUp, stagger } from '@/lib/motion'

const DEEP_TABS: AudienceTab[] = [
  {
    key: 'workers',
    label: 'For Workers',
    icon: '👷',
    subline: 'Identity · Attendance · Job Matching',
    description: 'Build a verifiable work history. Show contractors what you\'ve done, where you\'ve worked, and how reliable you are — all from your phone.',
    cta: { text: 'Learn More →', href: '/for-workers' },
  },
  {
    key: 'contractors',
    label: 'For Contractors',
    icon: '🏗️',
    subline: 'Verified Hiring · QR Tracking · Payroll',
    description: 'Stop relying on word-of-mouth. Browse verified workers with track records, automate site attendance, and process payroll with clean data.',
    cta: { text: 'Learn More →', href: '/for-contractors' },
  },
  {
    key: 'sardars',
    label: 'For Sardars',
    icon: '🦺',
    subline: 'Gang Management · QR Check-in · Payments',
    description: 'You\'re the link between workers and contractors. Kormik gives you the tools to manage your gang digitally — QR check-in, payments, and dispute resolution.',
    cta: { text: 'Learn More →', href: '/for-sardars' },
  },
  {
    key: 'orgs',
    label: 'For Organizations',
    icon: '🏢',
    subline: 'Compliance · Analytics · ESG Reporting',
    description: 'Get clean, auditable labour records. Our API integrates with your HR stack and delivers ESG-ready attendance data for your reporting obligations.',
    cta: { text: 'Request a Demo →', href: '/for-enterprise' },
  },
]

export function AudienceDeepDive() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative bg-bg-2 py-20 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,92,26,0.05) 0%, transparent 60%)' }}
      />
      <div className="max-w-content mx-auto px-4 md:px-8">
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp}>
            <SectionLabel>Who It&apos;s For</SectionLabel>
          </motion.div>

          <motion.h2
            variants={shouldReduce ? undefined : fadeUp}
            className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
            style={{ letterSpacing: '-2px' }}
          >
            Built for every role<br />
            <span
              style={{
                background: 'linear-gradient(90deg,#FF5C1A,#FF9F4A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              in the chain.
            </span>
          </motion.h2>

          <motion.p
            variants={shouldReduce ? undefined : fadeUp}
            className="font-body text-base md:text-lg text-text-secondary max-w-[500px] leading-relaxed mb-12"
          >
            Kormik connects every link in Bangladesh&apos;s informal labour chain — workers, sardars, contractors, and enterprises.
          </motion.p>

          <motion.div variants={shouldReduce ? undefined : fadeUp} className="w-full max-w-2xl">
            <AudienceSwitcher tabs={DEEP_TABS} defaultTab="workers" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
