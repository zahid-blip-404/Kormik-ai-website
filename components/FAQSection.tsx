'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionLabel } from './ui/SectionLabel'
import { FAQItem } from './ui/FAQItem'
import { fadeUp, stagger } from '@/lib/motion'

const faqLeft = [
  {
    question: 'Which zones does Kormik operate in?',
    answer:
      'Piloting in Mohammadpur, Adabor, and Mirpur in Dhaka. We are expanding zone by zone — more areas will be announced as we scale.',
  },
  {
    question: 'Do workers need a smartphone?',
    answer:
      'Android-first. A smartphone is required for QR check-in. Feature phone support is planned for a future phase.',
  },
  {
    question: 'Is registration free for workers?',
    answer:
      'Free for all Kormi and Mukadam. Sangathan (licensed contractor firms) may have fees for premium job categories.',
  },
]

const faqRight = [
  {
    question: 'Can QR attendance be faked?',
    answer:
      'QR codes rotate every 30 seconds. GPS is recorded as a secondary check. Every scan creates a tamper-evident audit trail — making it virtually impossible to fake.',
  },
  {
    question: 'How do workers get paid?',
    answer:
      'Via bKash or Nagad within 3–5 hours of job completion confirmation. Funds are held in escrow until the job is confirmed complete.',
  },
  {
    question: 'How do NGOs or government bodies partner?',
    answer:
      'Contact us below. We support procurement with PDF quotations (QT-YYYY-NNNNN) and offer custom onboarding for enterprise and government partners.',
  },
]

export function FAQSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="faq" className="bg-bg py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp}>
            <SectionLabel>FAQ</SectionLabel>
          </motion.div>
          <motion.h2
            variants={shouldReduce ? undefined : fadeUp}
            className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-12"
            style={{ letterSpacing: '-1px' }}
          >
            Questions? We&apos;ve got answers.
          </motion.h2>

          <motion.div
            variants={shouldReduce ? undefined : stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-12"
          >
            {/* Left col */}
            <motion.div variants={shouldReduce ? undefined : fadeUp}>
              {faqLeft.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </motion.div>

            {/* Right col */}
            <motion.div variants={shouldReduce ? undefined : fadeUp}>
              {faqRight.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
