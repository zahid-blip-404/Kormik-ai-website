'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Fingerprint, QrCode, Briefcase, ShieldCheck, BarChart2, Smartphone,
} from 'lucide-react'
import { SectionLabel } from './ui/SectionLabel'
import { GlassCard } from './ui/GlassCard'
import { fadeUp, stagger } from '@/lib/motion'

const features = [
  {
    icon: Fingerprint,
    title: 'Verified Identity',
    body: 'Biometric-linked digital ID issued to every registered worker. Portable, tamper-proof, and instantly shareable.',
    featured: false,
  },
  {
    icon: QrCode,
    title: 'QR Attendance',
    body: 'Site-based QR codes for instant check-in and check-out. Records are timestamped and stored on-chain.',
    featured: false,
  },
  {
    icon: Briefcase,
    title: 'Job Matching',
    body: 'Verified workers are surfaced to verified contractors. Trust scores replace word-of-mouth referrals.',
    featured: false,
  },
  {
    icon: ShieldCheck,
    title: 'Compliance Ready',
    body: 'Attendance records are formatted for labour law compliance, insurance claims, and government reporting.',
    featured: false,
  },
  {
    icon: BarChart2,
    title: 'Workforce Analytics',
    body: 'Contractors and enterprises get real-time dashboards on headcount, attendance rates, and site productivity.',
    featured: false,
  },
  {
    icon: Smartphone,
    title: 'Works Offline',
    body: 'The Android app functions without internet. Records sync automatically when connectivity returns.',
    featured: false,
  },
]

export function FeaturesSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="features" className="relative bg-bg py-20 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(255,92,26,0.04) 0%, transparent 55%)' }}
      />

      <div className="max-w-content mx-auto px-4 md:px-8">
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp}>
            <SectionLabel>Features</SectionLabel>
          </motion.div>

          <motion.h2
            variants={shouldReduce ? undefined : fadeUp}
            className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
            style={{ letterSpacing: '-2px' }}
          >
            Infrastructure built<br />
            <span
              style={{
                background: 'linear-gradient(90deg,#FF5C1A,#FF9F4A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              for the field.
            </span>
          </motion.h2>

          <motion.p
            variants={shouldReduce ? undefined : fadeUp}
            className="font-body text-base md:text-lg text-text-secondary max-w-[540px] leading-relaxed mb-14"
          >
            Every feature designed around the realities of informal construction work —
            offline-first, low-data, multilingual.
          </motion.p>

          <motion.div
            variants={shouldReduce ? undefined : stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div key={feature.title} variants={shouldReduce ? undefined : fadeUp}>
                  <GlassCard
                    variant={feature.featured ? 'brand' : 'md'}
                    className="p-6 h-full"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                      feature.featured ? 'glass-sm border-brand/30' : 'glass-brand'
                    }`}>
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">
                      {feature.body}
                    </p>
                  </GlassCard>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
