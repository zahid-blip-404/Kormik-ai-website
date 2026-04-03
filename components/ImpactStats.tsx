'use client'

import { motion, useReducedMotion } from 'framer-motion'
import CountUp from 'react-countup'
import { SectionLabel } from './ui/SectionLabel'
import { fadeUp, stagger } from '@/lib/motion'

const stats = [
  { value: 36,  suffix: 'M+',  label: 'Informal workers in Bangladesh',    accent: true  },
  { value: 100, suffix: '%',   label: 'QR-based — no paper rolls',          accent: false },
  { value: 3,   suffix: '+',   label: 'Pilot locations in Dhaka',           accent: false },
  { value: 0,   suffix: '',    label: 'Verification cost for workers',       accent: true, prefix: '৳' },
]

export function ImpactStats() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Full-width dark glass surface */}
      <div className="absolute inset-0 glass-dark" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,92,26,0.07) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-content mx-auto px-4 md:px-8">
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp} className="text-center mb-14">
            <SectionLabel>Impact</SectionLabel>
            <h2
              className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-2"
              style={{ letterSpacing: '-2px' }}
            >
              Numbers that matter.
            </h2>
          </motion.div>

          <motion.div
            variants={shouldReduce ? undefined : stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={shouldReduce ? undefined : fadeUp}
                className={`text-center px-4 ${i < stats.length - 1 ? 'md:border-r md:border-border-subtle' : ''}`}
              >
                <div
                  className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-none mb-3"
                  style={stat.accent ? {
                    background: 'linear-gradient(90deg,#FF5C1A,#FFD580)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  } : { color: '#fff' }}
                >
                  {shouldReduce ? (
                    `${stat.prefix ?? ''}${stat.value}${stat.suffix}`
                  ) : (
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix ?? ''}
                      duration={1.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  )}
                </div>
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
