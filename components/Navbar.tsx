'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Logo } from './ui/Logo'
import { Button } from './ui/Button'
import { fadeDown } from '@/lib/motion'

const workerLinks = [
  { label: 'For Workers', href: '/for-workers', desc: 'Verified ID, QR attendance, job matching' },
  { label: 'For Sardars', href: '/for-sardars', desc: 'Gang management, QR check-in, payments' },
]

const businessLinks = [
  { label: 'For Contractors', href: '/for-contractors', desc: 'Hire verified workers, automate attendance' },
  { label: 'For Organizations', href: '/for-enterprise', desc: 'Compliance, analytics, ESG reporting' },
]

const coreLinks = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Impact', href: '/impact' },
  { label: 'About', href: '/about' },
]

function DropdownMenu({ items }: { items: typeof workerLinks }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[240px]">
      <div className="rounded-card p-2 shadow-[0_16px_40px_rgba(0,0,0,0.6)]" style={{ background: 'rgba(20,20,20,0.92)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <span className="font-display text-sm font-semibold text-white group-hover:text-brand transition-colors">
              {item.label}
            </span>
            <span className="font-body text-xs text-text-muted">{item.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [workerOpen, setWorkerOpen]     = useState(false)
  const [businessOpen, setBusinessOpen] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        variants={shouldReduce ? undefined : fadeDown}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-sm border-b border-border-subtle'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-content mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Kormik Home">
            <Logo />
          </Link>

          {/* Center — desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {/* For Workers dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setWorkerOpen(true)}
              onMouseLeave={() => setWorkerOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 font-body text-sm text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-white/5">
                For Workers <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {workerOpen && <DropdownMenu items={workerLinks} />}
            </div>

            {/* For Business dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBusinessOpen(true)}
              onMouseLeave={() => setBusinessOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 font-body text-sm text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-white/5">
                For Business <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {businessOpen && <DropdownMenu items={businessLinks} />}
            </div>

            {coreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 font-body text-sm text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden lg:block">
            <Button variant="primary" size="sm" href="#">
              Get Started ↗
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-text-secondary hover:text-white transition-colors p-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-bg flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-border-subtle glass-sm">
            <Logo />
            <button
              onClick={() => setMobileOpen(false)}
              className="text-text-secondary hover:text-white p-1"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-4 py-8 overflow-y-auto">
            <div className="font-mono text-[9px] text-text-ghost uppercase tracking-widest px-3 mb-2">For Workers</div>
            {workerLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="px-3 py-3 font-display text-base font-semibold text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="font-mono text-[9px] text-text-ghost uppercase tracking-widest px-3 mb-2 mt-4">For Business</div>
            {businessLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="px-3 py-3 font-display text-base font-semibold text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border-subtle my-4" />
            {coreLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="px-3 py-3 font-body text-base text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="mt-6 px-3">
              <Button variant="primary" size="md" href="#" className="w-full justify-center">
                Get Started ↗
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
