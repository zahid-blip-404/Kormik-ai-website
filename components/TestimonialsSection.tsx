'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionLabel } from './ui/SectionLabel'
import { TestimonialCard } from './ui/TestimonialCard'
import { fadeUp, stagger } from '@/lib/motion'

export function TestimonialsSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="testimonials" className="bg-bg-2 py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* PLACEHOLDER — replace with verified testimonials before public launch */}
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp}>
            <SectionLabel>From the pilot zones</SectionLabel>
          </motion.div>
          <motion.h2
            variants={shouldReduce ? undefined : fadeUp}
            className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-12"
            style={{ letterSpacing: '-1px' }}
          >
            What Bangladesh&apos;s workers and contractors are saying.
          </motion.h2>

          <motion.div
            variants={shouldReduce ? undefined : stagger}
            className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6"
          >
            {/* Large card */}
            <motion.div variants={shouldReduce ? undefined : fadeUp}>
              <TestimonialCard
                large
                quote="আগে কাজ করতাম, কিন্তু কোনো প্রমাণ থাকত না। এখন আমার আইডি আছে।"
                quoteTranslation="I used to work, but had no proof. Now I have my ID."
                initials="RA"
                attribution="— Construction Worker, Mohammadpur"
              />
            </motion.div>

            {/* Two stacked */}
            <motion.div variants={shouldReduce ? undefined : stagger} className="flex flex-col gap-6">
              <motion.div variants={shouldReduce ? undefined : fadeUp}>
                <TestimonialCard
                  quote="The QR scan means my team's attendance is accurate. No more disputes at week's end."
                  initials="MS"
                  attribution="Site Supervisor, Adabor"
                />
              </motion.div>
              <motion.div variants={shouldReduce ? undefined : fadeUp}>
                <TestimonialCard
                  quote="The formal quotation PDF alone saves our NGO days of procurement paperwork."
                  initials="TH"
                  attribution="Programme Manager, Development NGO"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
