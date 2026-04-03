'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface FAQItemProps {
  question: string
  answer: string
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false)
  const shouldReduce = useReducedMotion()

  return (
    <div className="border-b border-border py-5 rounded-lg card-glow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 text-left group"
        aria-expanded={open}
      >
        <span className="font-body text-sm md:text-base font-medium text-white group-hover:text-brand transition-colors">
          {question}
        </span>
        <span className="shrink-0 w-5 h-5 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:border-brand group-hover:text-brand transition-colors">
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={shouldReduce ? undefined : { height: 0, opacity: 0 }}
            animate={shouldReduce ? undefined : { height: 'auto', opacity: 1 }}
            exit={shouldReduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="overflow-hidden"
          >
            <p className="pt-3 pb-1 font-body text-sm text-text-secondary leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
