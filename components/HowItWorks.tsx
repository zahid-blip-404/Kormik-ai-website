'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionLabel } from './ui/SectionLabel'
import { fadeUp, stagger } from '@/lib/motion'

const steps = [
  {
    num: '01',
    title: 'Register & Get Verified',
    body: 'Download the app and complete a one-time biometric registration. Your verified digital ID is issued instantly.',
    icon: '🪪',
  },
  {
    num: '02',
    title: 'Scan In at Any Site',
    body: 'Every morning, scan the site QR with your phone. Your attendance record is timestamped and immutable.',
    icon: '📱',
  },
  {
    num: '03',
    title: 'Get Found & Get Paid',
    body: 'Verified workers are matched to verified contractors. Your record speaks for you — no referrals needed.',
    icon: '🔍',
  },
]

export function HowItWorks() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="how-it-works" className="relative bg-bg-2 py-20 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 40%, rgba(255,92,26,0.05) 0%, transparent 55%)' }}
      />

      <div className="max-w-content mx-auto px-4 md:px-8">
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp}>
            <SectionLabel>How It Works</SectionLabel>
          </motion.div>

          <motion.h2
            variants={shouldReduce ? undefined : fadeUp}
            className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
            style={{ letterSpacing: '-2px' }}
          >
            Three steps to{' '}
            <span
              style={{
                background: 'linear-gradient(90deg,#FF5C1A,#FF9F4A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              visibility.
            </span>
          </motion.h2>

          <motion.p
            variants={shouldReduce ? undefined : fadeUp}
            className="font-body text-base md:text-lg text-text-secondary max-w-[540px] leading-relaxed mb-16"
          >
            The entire journey — from unknown to verified, from offline to matched — in under a day.
          </motion.p>

          {/* Steps */}
          <div className="flex flex-col md:flex-row gap-0 md:gap-0 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={shouldReduce ? undefined : fadeUp}
                className="flex-1 flex flex-col md:flex-row"
              >
                <div className="flex flex-col items-start md:items-start flex-1 pr-0 md:pr-8 glass-md rounded-card p-6 card-glow">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full glass-brand flex items-center justify-center border border-brand/30 shadow-brand-sm flex-shrink-0">
                      <span className="font-mono text-xs font-bold text-brand">{step.num}</span>
                    </div>
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 tracking-tight">{step.title}</h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{step.body}</p>
                </div>

                {/* Connector line — between steps, desktop only */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-8 mt-5 flex-shrink-0">
                    <div className="w-full h-px bg-gradient-to-r from-brand/30 to-brand/10" />
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-brand/40" />
                  </div>
                )}

                {/* Connector — mobile vertical */}
                {i < steps.length - 1 && (
                  <div className="md:hidden w-px h-8 bg-gradient-to-b from-brand/30 to-transparent ml-4 my-2" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
