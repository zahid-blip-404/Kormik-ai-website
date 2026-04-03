'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Scale, Clock, BarChart3, CheckCircle2 } from 'lucide-react'
import { SectionLabel } from './ui/SectionLabel'
import { PricingCard } from './ui/PricingCard'
import { Button } from './ui/Button'
import { fadeUp, stagger } from '@/lib/motion'

const pricingCards = [
  {
    badge: 'FOUNDATION',
    icon: Scale,
    title: 'Standardized Labour Rates',
    body: 'Worker wages are calculated using Bangladesh PWD schedule rates, adjusted by skill level and job category. Every rate is structured, transparent, and aligned with national benchmarks.',
  },
  {
    badge: 'DYNAMIC',
    icon: Clock,
    title: 'Time & Work-Based Calculation',
    body: 'Pricing adapts dynamically based on working hours, overtime, and job duration. Extended hours and urgent timelines automatically adjust compensation in real time.',
  },
  {
    badge: 'ENTERPRISE',
    icon: BarChart3,
    title: 'Smart Quotations & Bidding',
    body: 'Contractors receive system-generated quotations for workforce needs. They can accept, negotiate, or bid — scaling the same structured system up to enterprise-level hiring.',
  },
]

const comparisonPoints = [
  'Workers earn based on verified skill, category, and hours worked',
  'Contractors receive structured workforce cost breakdowns',
  'Overtime and extended shifts are automatically calculated',
  'Job duration and urgency dynamically influence pricing',
  'Organizations can post tenders and receive scalable workforce quotations',
  'Every transaction is recorded, transparent, and traceable',
]

const auditItems = [
  { label: 'PWD Rate ✓', desc: 'Bangladesh PWD schedule — official benchmark' },
  { label: 'Real-time ✓', desc: 'Overtime + urgency adjusted automatically' },
  { label: 'PDF ✓', desc: 'QT-YYYY-NNNNN quotations for procurement' },
  { label: 'Audit ✓', desc: 'Every transaction traceable in audit trail' },
]

export function PricingSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="pricing" className="bg-bg py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp} className="flex justify-center">
            <SectionLabel>Pricing</SectionLabel>
          </motion.div>
          <motion.h2
            variants={shouldReduce ? undefined : fadeUp}
            className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
            style={{ letterSpacing: '-2px' }}
          >
            Dynamic pricing, built for{' '}
            <span
              style={{
                background: 'linear-gradient(90deg,#FF5C1A,#FF9F4A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              real-world labour
            </span>
          </motion.h2>
          <motion.p
            variants={shouldReduce ? undefined : fadeUp}
            className="font-body text-base md:text-lg text-text-secondary max-w-[640px] mx-auto leading-relaxed"
          >
            Kormik uses a structured pricing engine based on official labour rates, skill levels, and
            real-time work conditions — ensuring fair pay for workers and accurate costing for
            contractors and organizations.
          </motion.p>
        </motion.div>

        {/* 3 Pricing Cards */}
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {pricingCards.map((card) => (
            <motion.div key={card.title} variants={shouldReduce ? undefined : fadeUp}>
              <PricingCard {...card} />
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Block */}
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="glass-md rounded-xl p-6 md:p-8 mb-16 card-glow"
        >
          <motion.h3
            variants={shouldReduce ? undefined : fadeUp}
            className="font-display text-2xl font-bold text-white mb-8"
          >
            How pricing works across the system
          </motion.h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left — points */}
            <motion.div variants={shouldReduce ? undefined : stagger} className="space-y-4">
              {comparisonPoints.map((point) => (
                <motion.div
                  key={point}
                  variants={shouldReduce ? undefined : fadeUp}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                  <p className="font-body text-sm text-text-secondary">{point}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Right — mini stats */}
            <motion.div variants={shouldReduce ? undefined : stagger} className="space-y-0">
              {auditItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={shouldReduce ? undefined : fadeUp}
                  className={`flex items-center justify-between py-4 ${
                    i < auditItems.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span className="font-mono text-[11px] text-white font-medium">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-body text-xs text-text-secondary text-right max-w-[200px]">
                    {item.desc}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Highlight Strip */}
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="rounded-xl py-12 px-6 md:px-10 overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,92,26,0.08) 0%, rgba(10,10,10,0) 60%)',
            borderTop: '1px solid rgba(255,92,26,0.20)',
            borderBottom: '1px solid rgba(255,92,26,0.20)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={shouldReduce ? undefined : fadeUp}>
              <h3 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Fair wages. Accurate costing.
                <br />
                Zero guesswork.
              </h3>
              <p className="font-body text-sm md:text-base text-text-secondary max-w-[480px] mt-4 leading-relaxed">
                Kormik removes uncertainty from labour pricing — creating a system where workers are
                paid correctly, and businesses operate with clarity and control.
              </p>
            </motion.div>

            <motion.div
              variants={shouldReduce ? undefined : fadeUp}
              className="flex flex-col sm:flex-row gap-4 lg:justify-end"
            >
              <Button variant="primary" size="md" href="/contact">
                Get Started
              </Button>
              <Button variant="ghost" size="md" href="/contact">
                Request a Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
