'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cardHover } from '@/lib/motion'

type GlassVariant = 'sm' | 'md' | 'brand' | 'dark'

interface GlassCardProps {
  children: ReactNode
  variant?: GlassVariant
  hover?: boolean
  className?: string
}

const variantClass: Record<GlassVariant, string> = {
  sm:    'glass-sm',
  md:    'glass-md',
  brand: 'glass-brand',
  dark:  'glass-dark',
}

export function GlassCard({
  children,
  variant = 'md',
  hover = true,
  className = '',
}: GlassCardProps) {
  const base = `rounded-card ${variantClass[variant]} ${hover ? 'card-glow' : ''} ${className}`

  return <div className={base}>{children}</div>
}
