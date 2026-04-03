'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Fingerprint, ClipboardCheck, TrendingUp } from 'lucide-react'
import { SectionLabel } from './ui/SectionLabel'
import { GlassCard } from './ui/GlassCard'
import { fadeUp, stagger } from '@/lib/motion'

const problems = [
  {
    icon: Fingerprint,
    title: 'No verified identity',
    body: '36+ million informal workers have no portable work record. A mason who worked 300 days last year has no way to prove it.',
  },
  {
    icon: ClipboardCheck,
    title: 'No proof of work',
    body: 'Without structured attendance, wages are disputed, insurance is impossible, and contractor accountability breaks down.',
  },
  {
    icon: TrendingUp,
    title: 'Invisible to the economy',
    body: 'When labour is unstructured, national planning suffers. Growth without visibility leaves potential unrealized.',
  },
]

export function ProblemSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="problem" className="relative bg-bg py-20 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(255,92,26,0.05) 0%, transparent 55%)' }}
      />

      <div className="max-w-content mx-auto px-4 md:px-8">
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp}>
            <SectionLabel>The Problem</SectionLabel>
          </motion.div>

          <motion.h2
            variants={shouldReduce ? undefined : fadeUp}
            className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4"
            style={{ letterSpacing: '-2px' }}
          >
            Bangladesh&apos;s economy runs<br />
            on{' '}
            <span
              style={{
                background: 'linear-gradient(90deg,#FF5C1A,#FF9F4A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              invisible labour.
            </span>
          </motion.h2>

          <motion.p
            variants={shouldReduce ? undefined : fadeUp}
            className="font-body text-base md:text-lg text-text-secondary max-w-[600px] leading-relaxed mb-14"
          >
            Millions of skilled workers contribute to the nation&apos;s growth every day —
            yet they remain economically invisible, with no record, no protection, and no path forward.
          </motion.p>

          {/* 3-col glass cards */}
          <motion.div
            variants={shouldReduce ? undefined : stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {problems.map((problem) => {
              const Icon = problem.icon
              return (
                <motion.div key={problem.title} variants={shouldReduce ? undefined : fadeUp}>
                  <GlassCard variant="md" className="p-6 h-full">
                    <div className="w-10 h-10 rounded-lg glass-brand flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{problem.title}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{problem.body}</p>
                  </GlassCard>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Pull quote */}
          <motion.blockquote
            variants={shouldReduce ? undefined : fadeUp}
            className="mt-14 border-l-2 border-brand glass-brand rounded-r-xl px-6 py-5 max-w-[640px]"
          >
            <p className="font-display italic text-xl text-text-secondary leading-relaxed">
              &ldquo;When you illuminate a blind spot in a system this large, the ripple effects are powerful.&rdquo;
            </p>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  )
}
