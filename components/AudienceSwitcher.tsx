'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { tabSwitch } from '@/lib/motion'
import { Button } from './ui/Button'

export interface AudienceTab {
  key: string
  label: string
  icon: string
  subline: string
  description: string
  cta: { text: string; href: string }
  ctaSecondary?: { text: string; href: string }
}

interface AudienceSwitcherProps {
  tabs: AudienceTab[]
  defaultTab?: string
}

export function AudienceSwitcher({ tabs, defaultTab }: AudienceSwitcherProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.key ?? '')
  const shouldReduce = useReducedMotion()
  const currentTab = tabs.find((t) => t.key === active) ?? tabs[0]

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Tab pills */}
      <div className="inline-flex glass-sm rounded-full p-1 gap-1 flex-wrap justify-center">
        {tabs.map((tab) => {
          const isActive = tab.key === active
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`
                relative px-4 py-2 rounded-full text-sm font-display font-semibold
                transition-all duration-300 whitespace-nowrap
                ${isActive
                  ? 'text-white'
                  : 'text-text-muted hover:text-text-secondary'
                }
              `}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-brand to-brand-hover shadow-brand-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{tab.icon}</span>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Dynamic content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={shouldReduce ? undefined : tabSwitch}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-center gap-4 text-center"
        >
          <p className="font-body text-base text-text-secondary max-w-md leading-relaxed">
            {currentTab?.description}
          </p>
          <p className="font-mono text-[10px] text-text-ghost uppercase tracking-widest">
            {currentTab?.subline}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button variant="primary" size="md" href={currentTab?.cta.href}>
              {currentTab?.cta.text}
            </Button>
            {currentTab?.ctaSecondary && (
              <Button variant="secondary" size="md" href={currentTab.ctaSecondary.href}>
                {currentTab.ctaSecondary.text}
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
