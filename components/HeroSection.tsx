'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger, glowPulse } from '@/lib/motion'
import { VideoBackground } from './VideoBackground'
import { AudienceSwitcher, AudienceTab } from './AudienceSwitcher'
import { SectionLabel } from './ui/SectionLabel'

const TABS: AudienceTab[] = [
  {
    key: 'workers',
    label: 'For Workers',
    icon: '👷',
    subline: 'Identity · Attendance · Job Matching',
    description: 'Get verified. Track your attendance with QR. Find your next job through trusted contractors.',
    cta: { text: 'Download for Android ↗', href: '#' },
    ctaSecondary: { text: 'See How It Works ↓', href: '#how-it-works' },
  },
  {
    key: 'contractors',
    label: 'For Contractors',
    icon: '🏗️',
    subline: 'Verified Hiring · QR Tracking · Payroll',
    description: 'Hire verified workers with trust scores. Automate attendance. Pay with confidence.',
    cta: { text: 'Start Hiring →', href: '/for-contractors' },
    ctaSecondary: { text: 'Learn More', href: '/for-contractors' },
  },
  {
    key: 'sardars',
    label: 'For Sardars',
    icon: '🦺',
    subline: 'Gang Management · QR Check-in · Payments',
    description: 'Manage your gang with ease. QR check-in your whole team. Get paid on time, every time.',
    cta: { text: 'Join as Sardar →', href: '/for-sardars' },
  },
  {
    key: 'orgs',
    label: 'For Organizations',
    icon: '🏢',
    subline: 'Compliance · Analytics · ESG Reporting',
    description: 'Labour compliance, workforce analytics, and ESG-ready attendance records for large enterprises.',
    cta: { text: 'Request a Demo →', href: '/for-enterprise' },
    ctaSecondary: { text: 'View Features', href: '/for-enterprise' },
  },
]

export function HeroSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 pt-24 pb-32 overflow-hidden">
      {/* Cinematic video background */}
      <VideoBackground
        src="/video/hero-bg.mp4"
        poster="/video/hero-bg-poster.jpg"
        overlayOpacity={0.55}
        bottomFadeColor="#050505"
        gridTexture
      />

      {/* Glow orbs */}
      <motion.div
        variants={shouldReduce ? undefined : glowPulse}
        initial="hidden"
        animate="visible"
        className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[560px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,92,26,0.12) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[8%] w-[280px] h-[280px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,160,60,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'orbFloat 9s ease-in-out infinite alternate',
        }}
      />

      {/* Floating dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {[
          { left: '15%', delay: '0s',   dur: '12s', size: '2px' },
          { left: '30%', delay: '2s',   dur: '16s', size: '1px' },
          { left: '50%', delay: '1s',   dur: '10s', size: '2px' },
          { left: '70%', delay: '3s',   dur: '14s', size: '1px' },
          { left: '85%', delay: '0.5s', dur: '18s', size: '3px' },
          { left: '45%', delay: '4s',   dur: '13s', size: '1px' },
          { left: '22%', delay: '6s',   dur: '11s', size: '2px' },
          { left: '60%', delay: '2.5s', dur: '15s', size: '1px' },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: 'rgba(255,92,26,0.7)',
              animation: `floatUp ${p.dur} ${p.delay} infinite linear`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
        variants={shouldReduce ? undefined : stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Live badge */}
        <motion.div variants={shouldReduce ? undefined : fadeUp} className="flex justify-center mb-6">
          <SectionLabel dot>Platform Live · Dhaka Pilot</SectionLabel>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={shouldReduce ? undefined : fadeUp}
          className="font-display font-extrabold tracking-tight leading-[1.02] text-white mb-3"
          style={{ fontSize: 'clamp(38px, 6vw, 72px)', letterSpacing: '-2.5px' }}
        >
          From invisible<br />
          to{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #FF5C1A 0%, #FF9F4A 50%, #FFD580 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            verified.
          </span>
        </motion.h1>

        <motion.p
          variants={shouldReduce ? undefined : fadeUp}
          className="font-display font-bold tracking-tight text-white/40 mb-8"
          style={{ fontSize: 'clamp(22px, 3vw, 38px)', letterSpacing: '-1px' }}
        >
          From forgotten to{' '}
          <span className="text-brand/80">found.</span>
        </motion.p>

        {/* Subline */}
        <motion.p
          variants={shouldReduce ? undefined : fadeUp}
          className="font-body text-base md:text-lg text-text-secondary max-w-[500px] leading-relaxed mb-10"
        >
          Verified identity, QR attendance &amp; job-matching for Bangladesh&apos;s 36 million informal workers.
        </motion.p>

        {/* 4-panel audience switcher */}
        <motion.div variants={shouldReduce ? undefined : fadeUp} className="w-full max-w-2xl">
          <AudienceSwitcher tabs={TABS} defaultTab="workers" />
        </motion.div>

        {/* Trust line */}
        <motion.p
          variants={shouldReduce ? undefined : fadeUp}
          className="font-mono text-[11px] text-white/30 mt-8 tracking-widest"
        >
          Mohammadpur · Adabor · Mirpur
        </motion.p>
      </motion.div>
    </section>
  )
}
