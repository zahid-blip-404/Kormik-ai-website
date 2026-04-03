'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionLabel } from './ui/SectionLabel'
import { Button } from './ui/Button'
import { fadeUp, stagger, glowPulse } from '@/lib/motion'

export function CTASection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative py-32 px-4 md:px-8 text-center overflow-hidden bg-bg">
      {/* Glow orb */}
      <motion.div
        variants={shouldReduce ? undefined : glowPulse}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,92,26,0.15) 0%, transparent 65%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Grid texture */}
      <div className="absolute inset-0 grid-texture pointer-events-none opacity-40" />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        variants={shouldReduce ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.div variants={shouldReduce ? undefined : fadeUp} className="flex justify-center">
          <SectionLabel dot>Ready to start</SectionLabel>
        </motion.div>

        <motion.h2
          variants={shouldReduce ? undefined : fadeUp}
          className="font-display font-extrabold text-white mt-2 mb-3"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-2.5px', lineHeight: 1.02 }}
        >
          Make every worker
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg,#FF5C1A,#FF9F4A,#FFD580)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            count.
          </span>
        </motion.h2>

        <motion.p
          variants={shouldReduce ? undefined : fadeUp}
          className="font-body text-base md:text-lg text-text-secondary max-w-[480px] mx-auto leading-relaxed mt-4 mb-10"
        >
          Join Bangladesh&apos;s verified labour infrastructure. Whether you&apos;re a worker,
          sardar, contractor, or enterprise — your place in the formal economy starts here.
        </motion.p>

        <motion.div
          variants={shouldReduce ? undefined : fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" href="#">
            Download for Android ↗
          </Button>
          <Button variant="secondary" size="lg" href="/for-enterprise">
            Request a Demo
          </Button>
        </motion.div>

        <motion.p
          variants={shouldReduce ? undefined : fadeUp}
          className="font-mono text-[11px] text-text-ghost mt-8 tracking-widest"
        >
          Launching Dhaka — April 2026
        </motion.p>
      </motion.div>
    </section>
  )
}
