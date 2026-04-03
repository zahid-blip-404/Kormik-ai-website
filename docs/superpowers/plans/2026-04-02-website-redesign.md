# Kormik Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Kormik website from a generic dark landing page into a cinematic, dynamic platform site with a construction-site drone video background, 4-panel audience switcher, Plus Jakarta Sans typography, glassmorphic design system, and enhanced Framer Motion animations.

**Architecture:** Design-system-first — tokens/primitives are established in Phase 1 before any component work begins. New shared components (VideoBackground, AudienceSwitcher, StatsStrip) are built in Phase 2, then consumed by rebuilt page components in Phases 3–5.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS 3, Framer Motion 12, TypeScript 5, react-countup, Plus Jakarta Sans (Google Fonts), IBM Plex Mono, Inter

---

## File Map

### Modified
- `app/layout.tsx` — swap Syne → Plus Jakarta Sans, add `--font-pjs` variable
- `app/globals.css` — update all CSS tokens, add glass utilities, shadow vars
- `tailwind.config.ts` — update font families, colors, add shadow/glass tokens
- `lib/motion.ts` — add tabSwitch, glowPulse, countUp, cardHover presets
- `components/ui/Button.tsx` — 3D shadow primary, glass secondary, ghost, icon variants
- `components/ui/SectionLabel.tsx` — flanking lines, optional dot
- `components/Navbar.tsx` — glass-sm, dropdown menus, animated entry
- `components/HeroSection.tsx` — full rebuild with VideoBackground + AudienceSwitcher
- `components/ProblemSection.tsx` — PJS typography, cinematic split layout
- `components/HowItWorks.tsx` — animated connector lines, step stagger
- `components/FeaturesSection.tsx` — glass-md cards, stagger, hover glow
- `components/ImpactStats.tsx` — countUp, full-width glass-dark, brand gradient numbers
- `components/TestimonialsSection.tsx` — glass cards, horizontal scroll mobile
- `components/PricingSection.tsx` — glass card surfaces, brand highlight
- `components/FAQSection.tsx` — smooth accordion animation
- `components/CTASection.tsx` — full-bleed gradient, dual CTA, glow orb
- `components/Footer.tsx` — 4-column, Bengali logo, glass-dark, social links
- `components/InnerPageLayout.tsx` — updated Navbar/Footer, brand hero header
- `app/page.tsx` — add StatsStrip, AudienceDeepDive; remove TrustBar
- `app/for-workers/page.tsx` — apply InnerPageLayout redesign
- `app/for-contractors/page.tsx` — apply InnerPageLayout redesign
- `.gitignore` — add `.superpowers/`

### Created
- `components/VideoBackground.tsx` — `<video>` wrapper with overlay props
- `components/AudienceSwitcher.tsx` — 4-tab pill switcher with AnimatePresence
- `components/StatsStrip.tsx` — stats row with countUp, glass-dark surface
- `components/AudienceDeepDive.tsx` — tabbed 4-audience showcase section
- `components/ui/GlassCard.tsx` — glass surface primitive (sm/md/brand/dark)
- `app/for-sardars/page.tsx` — new audience page
- `public/video/hero-bg.mp4` — generated via nano-banana-pro
- `public/video/hero-bg-poster.jpg` — fallback still frame

---

## Phase 1 — Foundation

### Task 1: Dependencies, Font Setup & .gitignore

**Files:**
- Modify: `package.json`
- Modify: `app/layout.tsx`
- Modify: `.gitignore`

- [ ] **Install react-countup**

```bash
cd "D:\Claude Project Repository\Website\kormik-website"
npm install react-countup
```

Expected: `react-countup` added to `package.json` dependencies.

- [ ] **Update `app/layout.tsx`** — swap Syne for Plus Jakarta Sans

```typescript
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, IBM_Plex_Mono, Inter } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-pjs',
  display: 'swap',
})

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kormik — কর্মীক | Digital Labour Infrastructure Platform',
  description:
    "Verified identity, QR attendance, and job-matching for Bangladesh's 36 million informal workers. Piloting in Dhaka.",
  keywords: [
    'informal labour Bangladesh',
    'worker identity',
    'QR attendance',
    'construction workers Dhaka',
    'labour platform',
    'কর্মীক',
  ],
  openGraph: {
    title: 'Kormik — কর্মীক',
    description: "Bangladesh's verified labour infrastructure. Make your work count.",
    url: 'https://kormik.com.bd',
    siteName: 'Kormik',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
  metadataBase: new URL('https://kormik.com.bd'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${ibmMono.variable} ${inter.variable}`}
    >
      <body className="font-body bg-bg text-white antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Add `.superpowers/` to `.gitignore`**

Open `.gitignore` (or create if absent) and append:
```
# Superpowers brainstorm sessions
.superpowers/
```

- [ ] **Type check**

```bash
cd "D:\Claude Project Repository\Website\kormik-website"
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Commit**

```bash
git add app/layout.tsx package.json package-lock.json .gitignore
git commit -m "feat: swap Syne for Plus Jakarta Sans, install react-countup"
```

---

### Task 2: Update `globals.css`

**Files:**
- Modify: `app/globals.css`

- [ ] **Replace entire `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Backgrounds */
  --bg:  #050505;
  --bg2: #0D0D0D;
  --bg3: #161616;
  --bg4: #1C1C1C;

  /* Borders */
  --b1: #1A1A1A;
  --b2: #222222;
  --b3: #333333;

  /* Text */
  --t1: #FFFFFF;
  --t2: #A0A0A0;
  --t3: #555555;
  --t4: #3A3A3A;

  /* Brand — Electric Orange gradient */
  --brand:   #FF5C1A;
  --brand-2: #FF9F4A;
  --brand-3: #FFD580;
  --brand-d: rgba(255,92,26,0.10);
  --brand-g: rgba(255,92,26,0.06);

  /* Semantic */
  --success: #22C55E;

  /* Radius */
  --r:  8px;
  --r2: 12px;
  --r3: 16px;

  /* Shadows */
  --shadow-sm: 0 4px 12px rgba(255,92,26,0.2), 0 2px 0 rgba(100,25,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
  --shadow-md: 0 8px 28px rgba(255,92,26,0.45), 0 3px 0 rgba(100,25,0,0.7), inset 0 1px 0 rgba(255,255,255,0.28);
  --shadow-lg: 0 16px 48px rgba(255,92,26,0.6), 0 4px 0 rgba(100,25,0,0.8), inset 0 1px 0 rgba(255,255,255,0.3);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  background-color: #050505;
  color: #FFFFFF;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Grid texture utility */
.grid-texture {
  background-image:
    linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
  background-size: 52px 52px;
}

/* Glassmorphism utilities */
@layer utilities {
  .glass-sm {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .glass-md {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.10);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
  }
  .glass-brand {
    background: rgba(255,92,26,0.06);
    border: 1px solid rgba(255,92,26,0.18);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .glass-dark {
    background: rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.05);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
  }
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0D0D0D; }
::-webkit-scrollbar-thumb { background: #333333; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #FF5C1A; }

:focus-visible { outline: 2px solid #FF5C1A; outline-offset: 2px; }

/* Ambient glow orb animation */
@keyframes orbFloat {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
  50%       { transform: translateY(-20px) scale(1.06); opacity: 1; }
}

/* Floating particle animation */
@keyframes floatUp {
  0%   { bottom: -20px; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 0.4; }
  100% { bottom: 110vh; opacity: 0; transform: translateX(30px); }
}

/* Live dot pulse */
@keyframes livePulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.5); opacity: 0.6; }
}
.animate-live-pulse { animation: livePulse 2s ease-in-out infinite; }
```

- [ ] **Type check**

```bash
npx tsc --noEmit
```

- [ ] **Commit**

```bash
git add app/globals.css
git commit -m "feat: update design tokens, add glass utilities and animation keyframes"
```

---

### Task 3: Update `tailwind.config.ts`

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Replace entire `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-pjs)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
        body:    ['var(--font-inter)', 'sans-serif'],
        sans:    ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#050505',
          2: '#0D0D0D',
          3: '#161616',
          4: '#1C1C1C',
        },
        border: {
          DEFAULT: '#222222',
          subtle: '#1A1A1A',
          strong: '#333333',
        },
        brand: {
          DEFAULT: '#FF5C1A',
          2:       '#FF9F4A',
          3:       '#FFD580',
          hover:   '#FF7A42',
          muted:   'rgba(255,92,26,0.10)',
          glow:    'rgba(255,92,26,0.06)',
        },
        text: {
          primary:   '#FFFFFF',
          secondary: '#A0A0A0',
          muted:     '#555555',
          ghost:     '#3A3A3A',
        },
        success: { DEFAULT: '#22C55E' },
      },
      borderRadius: {
        btn:   '10px',
        card:  '12px',
        large: '16px',
      },
      maxWidth: {
        content: '1152px',
      },
      boxShadow: {
        'brand-sm': '0 4px 12px rgba(255,92,26,0.2), 0 2px 0 rgba(100,25,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
        'brand-md': '0 8px 28px rgba(255,92,26,0.45), 0 3px 0 rgba(100,25,0,0.7), inset 0 1px 0 rgba(255,255,255,0.28)',
        'brand-lg': '0 16px 48px rgba(255,92,26,0.6), 0 4px 0 rgba(100,25,0,0.8), inset 0 1px 0 rgba(255,255,255,0.3)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Type check**

```bash
npx tsc --noEmit
```

- [ ] **Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: update tailwind tokens — PJS font, new bg/brand palette, shadow scale"
```

---

### Task 4: Update `lib/motion.ts`

**Files:**
- Modify: `lib/motion.ts`

- [ ] **Replace entire `lib/motion.ts`**

```typescript
import type { Variants, Transition } from 'framer-motion'

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export const slideRight: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

/** Tab content swap — used in AudienceSwitcher */
export const tabSwitch: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

/** Ambient glow orbs and live dot — looping */
export const glowPulse: Variants = {
  hidden:  { scale: 1,    opacity: 0.6 },
  visible: {
    scale:   [1, 1.08, 1],
    opacity: [0.6, 1, 0.6],
    transition: { duration: 6, ease: 'easeInOut', repeat: Infinity },
  },
}

/** Card hover lift */
export const cardHover = {
  rest:  { y: 0,  boxShadow: '0 2px 8px rgba(0,0,0,0.3)' },
  hover: { y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.5)', transition: { duration: 0.2, ease: 'easeOut' } },
}

/** Navbar fade down on mount */
export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
```

- [ ] **Type check**

```bash
npx tsc --noEmit
```

- [ ] **Commit**

```bash
git add lib/motion.ts
git commit -m "feat: add tabSwitch, glowPulse, cardHover, fadeDown motion presets"
```

---

### Task 5: Update `components/ui/Button.tsx`

**Files:**
- Modify: `components/ui/Button.tsx`

- [ ] **Replace entire `components/ui/Button.tsx`**

```typescript
import { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'icon'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  onClick?: () => void
  href?: string
  className?: string
  type?: 'button' | 'submit'
  'aria-label'?: string
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-br from-brand to-brand-hover text-white border-transparent ' +
    'shadow-brand-md hover:shadow-brand-lg hover:-translate-y-0.5 ' +
    'transition-all duration-200',
  secondary:
    'glass-sm text-text-secondary hover:border-brand/30 hover:text-white ' +
    'hover:-translate-y-0.5 transition-all duration-200',
  ghost:
    'bg-transparent border border-border-subtle text-text-muted ' +
    'hover:border-border-strong hover:text-text-secondary transition-colors duration-200',
  icon:
    'glass-brand !p-0 flex items-center justify-center ' +
    'hover:-translate-y-0.5 hover:shadow-brand-sm transition-all duration-200',
}

const sizes: Record<Size, string> = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
}

const iconSize: Record<Size, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const isIcon = variant === 'icon'
  const base = `inline-flex items-center gap-2 font-display font-semibold rounded-btn border whitespace-nowrap cursor-pointer`
  const sizeClass = isIcon ? iconSize[size] : sizes[size]
  const classes = `${base} ${variants[variant]} ${sizeClass} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
```

- [ ] **Type check**

```bash
npx tsc --noEmit
```

- [ ] **Visual check**

```bash
npm run dev
```

Open http://localhost:3000 — existing pages should still render, buttons should have orange gradient with 3D shadow.

- [ ] **Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: rebuild Button with 3D shadow-md primary, glass secondary variants"
```

---

### Task 6: Update `components/ui/SectionLabel.tsx` + Create `components/ui/GlassCard.tsx`

**Files:**
- Modify: `components/ui/SectionLabel.tsx`
- Create: `components/ui/GlassCard.tsx`

- [ ] **Replace `components/ui/SectionLabel.tsx`**

```typescript
interface SectionLabelProps {
  children: string
  dot?: boolean
}

export function SectionLabel({ children, dot = false }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand mb-3">
      <span className="w-6 h-px bg-brand/40" />
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-success animate-live-pulse" />}
      {children}
      <span className="w-6 h-px bg-brand/40" />
    </div>
  )
}
```

- [ ] **Create `components/ui/GlassCard.tsx`**

```typescript
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
  const base = `rounded-card ${variantClass[variant]} ${className}`

  if (!hover) {
    return <div className={base}>{children}</div>
  }

  return (
    <motion.div
      className={base}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Type check**

```bash
npx tsc --noEmit
```

- [ ] **Commit**

```bash
git add components/ui/SectionLabel.tsx components/ui/GlassCard.tsx
git commit -m "feat: update SectionLabel with flanking lines; add GlassCard primitive"
```

---

## Phase 2 — Shared Components

### Task 7: Create `components/VideoBackground.tsx`

**Files:**
- Create: `components/VideoBackground.tsx`

- [ ] **Create `components/VideoBackground.tsx`**

```typescript
'use client'

import { useReducedMotion } from 'framer-motion'

interface VideoBackgroundProps {
  src: string
  poster: string
  overlayOpacity?: number
  bottomFadeColor?: string
  gridTexture?: boolean
}

export function VideoBackground({
  src,
  poster,
  overlayOpacity = 0.55,
  bottomFadeColor = '#050505',
  gridTexture = true,
}: VideoBackgroundProps) {
  const shouldReduce = useReducedMotion()

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Video or static poster */}
      {shouldReduce ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${poster})` }}
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Base darken overlay */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
      />

      {/* Ambient orange glow — centre top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(255,92,26,0.09) 0%, transparent 60%)',
        }}
      />

      {/* Grid texture */}
      {gridTexture && (
        <div className="absolute inset-0 grid-texture pointer-events-none opacity-70" />
      )}

      {/* Bottom fade to bg */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${bottomFadeColor})`,
        }}
      />
    </div>
  )
}
```

- [ ] **Create placeholder video asset** so the page doesn't 404 before real video is generated

```bash
mkdir -p "D:\Claude Project Repository\Website\kormik-website\public\video"
```

Create `public/video/hero-bg-poster.jpg` — place any dark construction-related image here as a temporary placeholder. The real file will be replaced in Task 11.

- [ ] **Type check**

```bash
npx tsc --noEmit
```

- [ ] **Commit**

```bash
git add components/VideoBackground.tsx public/video/
git commit -m "feat: add VideoBackground component with overlay, glow, grid texture layers"
```

---

### Task 8: Create `components/AudienceSwitcher.tsx`

**Files:**
- Create: `components/AudienceSwitcher.tsx`

- [ ] **Create `components/AudienceSwitcher.tsx`**

```typescript
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
```

- [ ] **Type check**

```bash
npx tsc --noEmit
```

- [ ] **Commit**

```bash
git add components/AudienceSwitcher.tsx
git commit -m "feat: add AudienceSwitcher with spring-animated tab pill and AnimatePresence"
```

---

### Task 9: Create `components/StatsStrip.tsx`

**Files:**
- Create: `components/StatsStrip.tsx`

- [ ] **Create `components/StatsStrip.tsx`**

```typescript
'use client'

import CountUp from 'react-countup'

interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
  isText?: boolean
  textValue?: string
}

const stats: Stat[] = [
  { value: 36, suffix: 'M+', label: 'Informal Workers' },
  { value: 0,  label: 'Verified Identity', isText: true, textValue: 'QR-Based' },
  { value: 3,  suffix: '+', label: 'Pilot Locations' },
  { value: 0,  label: 'Paper Attendance Rolls', isText: true, textValue: 'Zero' },
]

export function StatsStrip() {
  return (
    <div className="glass-dark border-t border-b border-border-subtle">
      <div className="max-w-content mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${i < stats.length - 1 ? 'md:border-r md:border-border-subtle' : ''}`}
            >
              <div className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
                {stat.isText ? (
                  <span className="text-brand">{stat.textValue}</span>
                ) : (
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix ?? ''}
                    prefix={stat.prefix ?? ''}
                    duration={1.5}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                )}
              </div>
              <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Type check**

```bash
npx tsc --noEmit
```

- [ ] **Commit**

```bash
git add components/StatsStrip.tsx
git commit -m "feat: add StatsStrip with react-countup scroll-triggered count-up animation"
```

---

## Phase 3 — Video Asset

### Task 10: Generate Hero Video with nano-banana-pro

**Files:**
- Create: `public/video/hero-bg.mp4`
- Create: `public/video/hero-bg-poster.jpg`

- [ ] **Invoke nano-banana-pro skill**

Use the `nano-banana-pro` skill with this exact prompt:

> "Cinematic aerial drone shot of a massive construction site in Dhaka, Bangladesh. Wide establishing view — sweeping slowly across the site like a film city introduction sequence. Heavy machinery below: tower cranes, excavators, concrete mixers, scaffolding spanning the full frame. Dozens of workers in bright orange vests visible from above, each busy at their station — welding, carrying materials, operating machinery. Dust rising in golden-hour light. Deep sense of scale and human industry. Dark cinematic grade, slow drift, seamless loop, 4K."

- [ ] **Save output as `public/video/hero-bg.mp4`**

If the output is longer than 20s or larger than 8MB, compress:
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 26 -preset slow -acodec aac -strict experimental public/video/hero-bg.mp4
```

- [ ] **Extract a poster frame** (first frame as fallback image):
```bash
ffmpeg -i public/video/hero-bg.mp4 -vframes 1 -q:v 2 public/video/hero-bg-poster.jpg
```

- [ ] **Commit**

```bash
git add public/video/
git commit -m "feat: add cinematic construction site drone video for hero background"
```

---

## Phase 4 — High-Impact Components

### Task 11: Rebuild `components/Navbar.tsx`

**Files:**
- Modify: `components/Navbar.tsx`

- [ ] **Replace entire `components/Navbar.tsx`**

```typescript
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
      <div className="glass-md rounded-card p-2 shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
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
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [workerOpen, setWorkerOpen]   = useState(false)
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
```

- [ ] **Type check & visual**

```bash
npx tsc --noEmit
npm run dev
```

Open http://localhost:3000 — verify navbar renders with glass blur on scroll, dropdown menus appear on hover.

- [ ] **Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: rebuild Navbar with glass-sm, dropdown menus, animated entry"
```

---

### Task 12: Rebuild `components/HeroSection.tsx`

**Files:**
- Modify: `components/HeroSection.tsx`

- [ ] **Replace entire `components/HeroSection.tsx`**

```typescript
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

        {/* Headline — poetic contrast */}
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
          className="font-display font-bold tracking-tight text-text-ghost mb-8"
          style={{ fontSize: 'clamp(22px, 3vw, 38px)', letterSpacing: '-1px' }}
        >
          From forgotten to{' '}
          <span className="text-brand/50">found.</span>
        </motion.p>

        {/* Subline */}
        <motion.p
          variants={shouldReduce ? undefined : fadeUp}
          className="font-body text-base md:text-lg text-text-secondary max-w-[500px] leading-relaxed mb-10"
        >
          Verified identity, QR attendance & job-matching for Bangladesh&apos;s 36 million informal workers.
        </motion.p>

        {/* 4-panel audience switcher */}
        <motion.div variants={shouldReduce ? undefined : fadeUp} className="w-full max-w-2xl">
          <AudienceSwitcher tabs={TABS} defaultTab="workers" />
        </motion.div>

        {/* Trust line */}
        <motion.p
          variants={shouldReduce ? undefined : fadeUp}
          className="font-mono text-[11px] text-text-ghost mt-8 tracking-widest"
        >
          Mohammadpur · Adabor · Mirpur
        </motion.p>
      </motion.div>
    </section>
  )
}
```

- [ ] **Type check & visual**

```bash
npx tsc --noEmit
npm run dev
```

Open http://localhost:3000 — verify hero renders: video background (or poster fallback), poetic headline, 4-panel switcher with spring tab animation, floating particles.

- [ ] **Commit**

```bash
git add components/HeroSection.tsx
git commit -m "feat: rebuild HeroSection with video bg, poetic PJS headline, 4-panel switcher"
```

---

## Phase 5 — Homepage Sections

### Task 13: Rebuild `components/ProblemSection.tsx`

**Files:**
- Modify: `components/ProblemSection.tsx`

- [ ] **Replace entire `components/ProblemSection.tsx`**

```typescript
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
```

- [ ] **Type check & visual**

```bash
npx tsc --noEmit && npm run dev
```

- [ ] **Commit**

```bash
git add components/ProblemSection.tsx
git commit -m "feat: rebuild ProblemSection with PJS typography, glass cards, gradient headline"
```

---

### Task 14: Rebuild `components/HowItWorks.tsx`

**Files:**
- Modify: `components/HowItWorks.tsx`

- [ ] **Read current HowItWorks**

```bash
cat "D:\Claude Project Repository\Website\kormik-website\components\HowItWorks.tsx"
```

- [ ] **Replace entire `components/HowItWorks.tsx`**

```typescript
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionLabel } from './ui/SectionLabel'
import { fadeUp, stagger } from '@/lib/motion'

const steps = [
  {
    num: '01',
    title: 'Register & Get Verified',
    body: 'Download the app and complete a one-time biometric registration. Your verified digital ID is issued instantly.',
    icon: '🪪',
  },
  {
    num: '02',
    title: 'Scan In at Any Site',
    body: 'Every morning, scan the site QR with your phone. Your attendance record is timestamped and immutable.',
    icon: '📱',
  },
  {
    num: '03',
    title: 'Get Found & Get Paid',
    body: 'Verified workers are matched to verified contractors. Your record speaks for you — no referrals needed.',
    icon: '🔍',
  },
]

export function HowItWorks() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="how-it-works" className="relative bg-bg-2 py-20 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 40%, rgba(255,92,26,0.05) 0%, transparent 55%)' }}
      />

      <div className="max-w-content mx-auto px-4 md:px-8">
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp}>
            <SectionLabel>How It Works</SectionLabel>
          </motion.div>

          <motion.h2
            variants={shouldReduce ? undefined : fadeUp}
            className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
            style={{ letterSpacing: '-2px' }}
          >
            Three steps to{' '}
            <span
              style={{
                background: 'linear-gradient(90deg,#FF5C1A,#FF9F4A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              visibility.
            </span>
          </motion.h2>

          <motion.p
            variants={shouldReduce ? undefined : fadeUp}
            className="font-body text-base md:text-lg text-text-secondary max-w-[540px] leading-relaxed mb-16"
          >
            The entire journey — from unknown to verified, from offline to matched — in under a day.
          </motion.p>

          {/* Steps */}
          <div className="flex flex-col md:flex-row gap-0 md:gap-0 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={shouldReduce ? undefined : fadeUp}
                className="flex-1 flex flex-col md:flex-row"
              >
                <div className="flex flex-col items-start md:items-start flex-1 pr-0 md:pr-8">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full glass-brand flex items-center justify-center border border-brand/30 shadow-brand-sm flex-shrink-0">
                      <span className="font-mono text-xs font-bold text-brand">{step.num}</span>
                    </div>
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 tracking-tight">{step.title}</h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{step.body}</p>
                </div>

                {/* Connector line — between steps, desktop only */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-8 mt-5 flex-shrink-0">
                    <div className="w-full h-px bg-gradient-to-r from-brand/30 to-brand/10" />
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-brand/40" />
                  </div>
                )}

                {/* Connector — mobile vertical */}
                {i < steps.length - 1 && (
                  <div className="md:hidden w-px h-8 bg-gradient-to-b from-brand/30 to-transparent ml-4 my-2" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Type check & visual**

```bash
npx tsc --noEmit && npm run dev
```

- [ ] **Commit**

```bash
git add components/HowItWorks.tsx
git commit -m "feat: rebuild HowItWorks with animated connectors, numbered step circles"
```

---

### Task 15: Rebuild `components/FeaturesSection.tsx`

**Files:**
- Modify: `components/FeaturesSection.tsx`

- [ ] **Read current FeaturesSection**

```bash
cat "D:\Claude Project Repository\Website\kormik-website\components\FeaturesSection.tsx"
```

- [ ] **Replace entire `components/FeaturesSection.tsx`**

```typescript
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
    featured: true,
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
                      <Icon className={`w-5 h-5 ${feature.featured ? 'text-brand' : 'text-brand'}`} />
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
```

- [ ] **Type check & visual**

```bash
npx tsc --noEmit && npm run dev
```

- [ ] **Commit**

```bash
git add components/FeaturesSection.tsx
git commit -m "feat: rebuild FeaturesSection with glass-md/brand cards, stagger animation"
```

---

### Task 16: Create `components/AudienceDeepDive.tsx`

**Files:**
- Create: `components/AudienceDeepDive.tsx`

- [ ] **Create `components/AudienceDeepDive.tsx`**

```typescript
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionLabel } from './ui/SectionLabel'
import { AudienceSwitcher, AudienceTab } from './AudienceSwitcher'
import { fadeUp, stagger } from '@/lib/motion'

const DEEP_TABS: AudienceTab[] = [
  {
    key: 'workers',
    label: 'For Workers',
    icon: '👷',
    subline: 'Identity · Attendance · Job Matching',
    description: 'Build a verifiable work history. Show contractors what you\'ve done, where you\'ve worked, and how reliable you are — all from your phone.',
    cta: { text: 'Learn More →', href: '/for-workers' },
  },
  {
    key: 'contractors',
    label: 'For Contractors',
    icon: '🏗️',
    subline: 'Verified Hiring · QR Tracking · Payroll',
    description: 'Stop relying on word-of-mouth. Browse verified workers with track records, automate site attendance, and process payroll with clean data.',
    cta: { text: 'Learn More →', href: '/for-contractors' },
  },
  {
    key: 'sardars',
    label: 'For Sardars',
    icon: '🦺',
    subline: 'Gang Management · QR Check-in · Payments',
    description: 'You\'re the link between workers and contractors. Kormik gives you the tools to manage your gang digitally — QR check-in, payments, and dispute resolution.',
    cta: { text: 'Learn More →', href: '/for-sardars' },
  },
  {
    key: 'orgs',
    label: 'For Organizations',
    icon: '🏢',
    subline: 'Compliance · Analytics · ESG Reporting',
    description: 'Get clean, auditable labour records. Our API integrates with your HR stack and delivers ESG-ready attendance data for your reporting obligations.',
    cta: { text: 'Request a Demo →', href: '/for-enterprise' },
  },
]

export function AudienceDeepDive() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative bg-bg-2 py-20 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,92,26,0.05) 0%, transparent 60%)' }}
      />
      <div className="max-w-content mx-auto px-4 md:px-8">
        <motion.div
          variants={shouldReduce ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp}>
            <SectionLabel>Who It&apos;s For</SectionLabel>
          </motion.div>

          <motion.h2
            variants={shouldReduce ? undefined : fadeUp}
            className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
            style={{ letterSpacing: '-2px' }}
          >
            Built for every role<br />
            <span
              style={{
                background: 'linear-gradient(90deg,#FF5C1A,#FF9F4A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              in the chain.
            </span>
          </motion.h2>

          <motion.p
            variants={shouldReduce ? undefined : fadeUp}
            className="font-body text-base md:text-lg text-text-secondary max-w-[500px] leading-relaxed mb-12"
          >
            Kormik connects every link in Bangladesh&apos;s informal labour chain — workers, sardars, contractors, and enterprises.
          </motion.p>

          <motion.div variants={shouldReduce ? undefined : fadeUp} className="w-full max-w-2xl">
            <AudienceSwitcher tabs={DEEP_TABS} defaultTab="workers" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Type check**

```bash
npx tsc --noEmit
```

- [ ] **Commit**

```bash
git add components/AudienceDeepDive.tsx
git commit -m "feat: add AudienceDeepDive section with 4-tab per-audience showcase"
```

---

### Task 17: Rebuild `components/ImpactStats.tsx`

**Files:**
- Modify: `components/ImpactStats.tsx`

- [ ] **Replace entire `components/ImpactStats.tsx`**

```typescript
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
```

- [ ] **Type check & visual**

```bash
npx tsc --noEmit && npm run dev
```

- [ ] **Commit**

```bash
git add components/ImpactStats.tsx
git commit -m "feat: rebuild ImpactStats with countUp, gradient accent numbers, glass-dark surface"
```

---

### Task 18: Rebuild `components/CTASection.tsx`

**Files:**
- Modify: `components/CTASection.tsx`

- [ ] **Replace entire `components/CTASection.tsx`**

```typescript
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
```

- [ ] **Type check & visual**

```bash
npx tsc --noEmit && npm run dev
```

- [ ] **Commit**

```bash
git add components/CTASection.tsx
git commit -m "feat: rebuild CTASection with gradient headline, dual CTA, glowPulse orb"
```

---

### Task 19: Rebuild `components/Footer.tsx`

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Replace entire `components/Footer.tsx`**

```typescript
import Link from 'next/link'
import { Logo } from './ui/Logo'

const workerLinks  = [
  { label: 'For Workers',     href: '/for-workers' },
  { label: 'For Sardars',     href: '/for-sardars' },
]
const businessLinks = [
  { label: 'For Contractors', href: '/for-contractors' },
  { label: 'For Organizations', href: '/for-enterprise' },
]
const companyLinks = [
  { label: 'How It Works',    href: '/how-it-works' },
  { label: 'Impact',          href: '/impact' },
  { label: 'About',           href: '/about' },
  { label: 'Blog',            href: '/blog' },
  { label: 'Contact',         href: '/contact' },
]
const legalLinks = [
  { label: 'Privacy Policy',  href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

const socials = [
  { name: 'LinkedIn', href: '#', icon: 'in' },
  { name: 'Facebook', href: '#', icon: 'f'  },
  { name: 'WhatsApp', href: '#', icon: 'wa' },
]

function FooterCol({ title, links }: { title: string; links: typeof companyLinks }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-widest text-text-ghost mb-4">
        {title}
      </div>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-body text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="glass-dark border-t border-border-subtle py-16 px-4 md:px-8">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-3" />
            <p className="font-mono text-[10px] text-text-ghost mb-1">
              কর্মীক — Digital Labour Infrastructure
            </p>
            <p className="font-body text-sm text-text-muted mt-3 leading-relaxed">
              Bangladesh&apos;s verified worker platform. Making labour visible.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-8 h-8 rounded-lg glass-sm flex items-center justify-center font-mono text-[10px] text-text-muted hover:text-text-secondary hover:border-brand/30 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Workers"  links={workerLinks} />
          <FooterCol title="Business" links={businessLinks} />
          <FooterCol title="Company"  links={companyLinks} />
          <FooterCol title="Legal"    links={legalLinks} />
        </div>

        <div className="border-t border-border-subtle mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-text-ghost">
            Piloting in Mohammadpur · Adabor · Mirpur · Dhaka, Bangladesh
          </p>
          <p className="font-mono text-[10px] text-text-ghost">
            © 2026 Kormik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Type check & visual**

```bash
npx tsc --noEmit && npm run dev
```

- [ ] **Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: rebuild Footer with 5-column layout, glass-dark surface, For Sardars link"
```

---

### Task 20: Update `components/TestimonialsSection.tsx`, `PricingSection.tsx`, `FAQSection.tsx`

**Files:**
- Modify: `components/TestimonialsSection.tsx`
- Modify: `components/PricingSection.tsx`
- Modify: `components/FAQSection.tsx`

- [ ] **Read all three current files**

```bash
cat "D:\Claude Project Repository\Website\kormik-website\components\TestimonialsSection.tsx"
cat "D:\Claude Project Repository\Website\kormik-website\components\PricingSection.tsx"
cat "D:\Claude Project Repository\Website\kormik-website\components\FAQSection.tsx"
```

- [ ] **In `TestimonialsSection.tsx`:** Find every instance of `font-display` and verify it references `var(--font-pjs)` via Tailwind (it will, since we updated `tailwind.config.ts`). Replace any `bg-bg-2` card backgrounds with `<GlassCard variant="md" className="p-6">`. Replace any `font-bold` headings with `font-extrabold tracking-tight`. Add `style={{ letterSpacing: '-1px' }}` to `<h2>` elements.

- [ ] **In `PricingSection.tsx`:** Wrap each pricing card `<div>` in `<GlassCard variant={featured ? 'brand' : 'md'} className="p-6 md:p-8">`. Update section heading to use gradient: add `style` with `background: 'linear-gradient(90deg,#FF5C1A,#FF9F4A)'` + `WebkitBackgroundClip: 'text'` + `WebkitTextFillColor: 'transparent'` on the accent word.

- [ ] **In `FAQSection.tsx`:** If using `<details>/<summary>`, replace with a controlled `useState` accordion. Each item: clicking the question toggles a `motion.div` with `animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}` and `overflow: 'hidden'`. If already using motion, verify `transition` uses `{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }`.

- [ ] **Type check & build**

```bash
npx tsc --noEmit
npm run build
```

Expected: Build succeeds with 0 TypeScript errors.

- [ ] **Commit**

```bash
git add components/TestimonialsSection.tsx components/PricingSection.tsx components/FAQSection.tsx
git commit -m "feat: apply glass cards and PJS typography to Testimonials, Pricing, FAQ"
```

---

### Task 21: Update `app/page.tsx` (Homepage)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Replace `app/page.tsx`**

```typescript
import { Navbar }            from '@/components/Navbar'
import { HeroSection }       from '@/components/HeroSection'
import { StatsStrip }        from '@/components/StatsStrip'
import { ProblemSection }    from '@/components/ProblemSection'
import { HowItWorks }        from '@/components/HowItWorks'
import { FeaturesSection }   from '@/components/FeaturesSection'
import { AudienceDeepDive }  from '@/components/AudienceDeepDive'
import { ImpactStats }       from '@/components/ImpactStats'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { PricingSection }    from '@/components/PricingSection'
import { FAQSection }        from '@/components/FAQSection'
import { CTASection }        from '@/components/CTASection'
import { Footer }            from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsStrip />
        <ProblemSection />
        <HowItWorks />
        <FeaturesSection />
        <AudienceDeepDive />
        <ImpactStats />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Type check & build**

```bash
npx tsc --noEmit
npm run build
```

- [ ] **Visual check**

```bash
npm run dev
```

Open http://localhost:3000 — scroll through the full homepage. Verify: video hero → stats strip → problem → how it works → features → audience deep dive → impact → testimonials → pricing → FAQ → CTA → footer.

- [ ] **Commit**

```bash
git add app/page.tsx
git commit -m "feat: update homepage — add StatsStrip, AudienceDeepDive, remove TrustBar"
```

---

## Phase 6 — Inner Pages

### Task 22: Update `components/InnerPageLayout.tsx`

**Files:**
- Modify: `components/InnerPageLayout.tsx`

- [ ] **Replace `components/InnerPageLayout.tsx`**

```typescript
import { ReactNode } from 'react'
import { Navbar }     from './Navbar'
import { Footer }     from './Footer'
import { CTASection } from './CTASection'

interface InnerPageLayoutProps {
  children:   ReactNode
  showCTA?:   boolean
  heroTitle:  string
  heroAccent: string
  heroBadge:  string
  heroSub:    string
}

export function InnerPageLayout({
  children,
  showCTA = true,
  heroTitle,
  heroAccent,
  heroBadge,
  heroSub,
}: InnerPageLayoutProps) {
  return (
    <>
      <Navbar />
      <main>
        {/* Branded inner-page hero header */}
        <section className="relative pt-32 pb-16 px-4 md:px-8 text-center overflow-hidden bg-bg">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(255,92,26,0.09) 0%, transparent 60%)' }}
          />
          <div className="absolute inset-0 grid-texture pointer-events-none opacity-50" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 glass-brand rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-live-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand">
                {heroBadge}
              </span>
            </div>
            <h1
              className="font-display font-extrabold text-white mb-4"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)', letterSpacing: '-2.5px', lineHeight: 1.02 }}
            >
              {heroTitle}{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg,#FF5C1A,#FF9F4A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {heroAccent}
              </span>
            </h1>
            <p className="font-body text-base md:text-lg text-text-secondary max-w-[500px] mx-auto leading-relaxed">
              {heroSub}
            </p>
          </div>
        </section>

        {children}
        {showCTA && <CTASection />}
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Type check**

```bash
npx tsc --noEmit
```

*Note: Existing pages using `InnerPageLayout` will now require `heroTitle`, `heroAccent`, `heroBadge`, and `heroSub` props — update them in the next task.*

- [ ] **Commit**

```bash
git add components/InnerPageLayout.tsx
git commit -m "feat: update InnerPageLayout with branded gradient hero header"
```

---

### Task 23: Build `/app/for-sardars/page.tsx`

**Files:**
- Create: `app/for-sardars/page.tsx`

- [ ] **Create `app/for-sardars/page.tsx`**

```typescript
import { InnerPageLayout } from '@/components/InnerPageLayout'
import { GlassCard }       from '@/components/ui/GlassCard'
import { SectionLabel }    from '@/components/ui/SectionLabel'

const sardarsFeatures = [
  {
    icon: '👥',
    title: 'Manage Your Gang Digitally',
    body:  'Add workers to your gang, assign them to sites, and track who showed up — all from one screen.',
  },
  {
    icon: '📱',
    title: 'QR Check-in for Your Team',
    body:  'Open the app, show the site QR. Every gang member\'s attendance is logged automatically.',
  },
  {
    icon: '💰',
    title: 'Transparent Payments',
    body:  'Your contractor sees exactly who worked what days. No more payment disputes over attendance.',
  },
  {
    icon: '🏆',
    title: 'Build Your Reputation',
    body:  'Sardars with verified gangs get priority placement on new sites. Your track record travels with you.',
  },
]

export default function ForSardarsPage() {
  return (
    <InnerPageLayout
      heroBadge="For Sardars"
      heroTitle="The bridge between workers"
      heroAccent="and work."
      heroSub="Kormik gives sardars the digital tools to manage their gang, track attendance, and build a verified reputation — for the first time, ever."
    >
      {/* What is a Sardar */}
      <section className="bg-bg py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-content mx-auto">
          <SectionLabel>The Role</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-6">
            <div>
              <h2
                className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4"
                style={{ letterSpacing: '-1.5px' }}
              >
                Who is a Sardar?
              </h2>
              <p className="font-body text-base text-text-secondary leading-relaxed mb-4">
                A Sardar is a gang leader — the supervisor who recruits workers, brings them to a site, oversees daily work, and is accountable to the contractor. In Bangladesh&apos;s informal construction industry, Sardars are the invisible backbone of how labour moves.
              </p>
              <p className="font-body text-base text-text-secondary leading-relaxed">
                Yet Sardars have no digital presence. No record of the gangs they&apos;ve led, the sites they&apos;ve managed, or the workers they&apos;ve delivered. Kormik changes that.
              </p>
            </div>
            <GlassCard variant="brand" className="p-8">
              <div className="text-5xl mb-4">🦺</div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Sardar Fast Facts</h3>
              <ul className="space-y-2 font-body text-sm text-text-secondary">
                <li>→ Manages 5–30 workers per gang</li>
                <li>→ Recruits from their community network</li>
                <li>→ Accountable for attendance & discipline</li>
                <li>→ Currently operates without any digital tools</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-bg-2 py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-content mx-auto">
          <SectionLabel>What Kormik Gives You</SectionLabel>
          <h2
            className="font-display text-3xl md:text-4xl font-extrabold text-white mb-10 mt-2"
            style={{ letterSpacing: '-1.5px' }}
          >
            Tools built for how you actually work.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sardarsFeatures.map((f) => (
              <GlassCard key={f.title} variant="md" className="p-6">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">{f.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  )
}
```

- [ ] **Type check & visual**

```bash
npx tsc --noEmit
npm run dev
```

Open http://localhost:3000/for-sardars — verify the page renders with the branded hero header and feature cards.

- [ ] **Commit**

```bash
git add app/for-sardars/
git commit -m "feat: add /for-sardars audience page with role explainer and feature cards"
```

---

### Task 24: Fill out `/app/for-enterprise/page.tsx`

**Files:**
- Modify: `app/for-enterprise/page.tsx`

- [ ] **Read existing file**

```bash
cat "D:\Claude Project Repository\Website\kormik-website\app\for-enterprise\page.tsx"
```

- [ ] **Replace with full content**

```typescript
import { InnerPageLayout } from '@/components/InnerPageLayout'
import { GlassCard }       from '@/components/ui/GlassCard'
import { SectionLabel }    from '@/components/ui/SectionLabel'
import { Button }          from '@/components/ui/Button'

const features = [
  {
    icon: '📋',
    title: 'Labour Compliance Dashboard',
    body:  'Audit-ready attendance records for every worker on every site. Formatted for Bangladesh Labour Act reporting.',
  },
  {
    icon: '📊',
    title: 'Workforce Analytics',
    body:  'Real-time headcount, attendance rates, and productivity metrics across all your sites in one dashboard.',
  },
  {
    icon: '🌱',
    title: 'ESG-Ready Reporting',
    body:  'Verifiable labour data for your ESG disclosures — worker count, hours, safety compliance, and more.',
  },
  {
    icon: '🔌',
    title: 'API Integration',
    body:  'Connect Kormik attendance data to your existing HR and ERP systems via a clean REST API.',
  },
]

export default function ForEnterprisePage() {
  return (
    <InnerPageLayout
      heroBadge="For Organizations"
      heroTitle="Labour infrastructure for"
      heroAccent="enterprise scale."
      heroSub="Compliance dashboards, workforce analytics, and ESG-ready attendance records — for organizations that need verified labour data at scale."
    >
      {/* Features */}
      <section className="bg-bg py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-content mx-auto">
          <SectionLabel>What You Get</SectionLabel>
          <h2
            className="font-display text-3xl md:text-4xl font-extrabold text-white mb-10 mt-2"
            style={{ letterSpacing: '-1.5px' }}
          >
            Everything you need to manage labour at scale.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <GlassCard key={f.title} variant="md" className="p-6">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">{f.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Request demo CTA */}
      <section className="bg-bg-2 py-16 px-4 md:px-8 text-center">
        <div className="max-w-xl mx-auto">
          <GlassCard variant="brand" className="p-10">
            <h3
              className="font-display text-2xl font-extrabold text-white mb-3"
              style={{ letterSpacing: '-1px' }}
            >
              Ready to get started?
            </h3>
            <p className="font-body text-sm text-text-secondary mb-6 leading-relaxed">
              Book a 30-minute demo. We&apos;ll show you the compliance dashboard and walk through the API.
            </p>
            <Button variant="primary" size="md" href="/contact">
              Request a Demo →
            </Button>
          </GlassCard>
        </div>
      </section>
    </InnerPageLayout>
  )
}
```

- [ ] **Type check & visual**

```bash
npx tsc --noEmit
npm run dev
```

Open http://localhost:3000/for-enterprise — verify page renders.

- [ ] **Commit**

```bash
git add app/for-enterprise/
git commit -m "feat: fill out /for-enterprise with compliance features and demo CTA"
```

---

### Task 25: Update Audience Pages (`/for-workers`, `/for-contractors`)

**Files:**
- Modify: `app/for-workers/page.tsx`
- Modify: `app/for-contractors/page.tsx`

- [ ] **Read both files**

```bash
cat "D:\Claude Project Repository\Website\kormik-website\app\for-workers\page.tsx"
cat "D:\Claude Project Repository\Website\kormik-website\app\for-contractors\page.tsx"
```

- [ ] **Update `app/for-workers/page.tsx`**

The new `InnerPageLayout` requires `heroTitle`, `heroAccent`, `heroBadge`, `heroSub` props. Find the `<InnerPageLayout>` call and add these props:

```typescript
<InnerPageLayout
  heroBadge="For Workers"
  heroTitle="Your work."
  heroAccent="Your record."
  heroSub="Get verified, track your attendance with QR, and find your next job through trusted contractors — all from your phone."
>
```

Remove any existing `<h1>` or hero section that was inside the page if it was manually coded — the `InnerPageLayout` now provides the hero header.

- [ ] **Update `app/for-contractors/page.tsx`**

```typescript
<InnerPageLayout
  heroBadge="For Contractors"
  heroTitle="Hire verified workers."
  heroAccent="Build with confidence."
  heroSub="Browse verified workers with attendance records and trust scores. Automate site attendance with QR check-in. Pay based on real data."
>
```

- [ ] **Type check & build**

```bash
npx tsc --noEmit
npm run build
```

Expected: Clean build, 0 errors.

- [ ] **Commit**

```bash
git add app/for-workers/ app/for-contractors/
git commit -m "feat: update /for-workers and /for-contractors with new InnerPageLayout hero props"
```

---

## Phase 7 — Polish Pass

### Task 26: Polish Pass — `frontend-design-pro` + `ui-ux-pro-max`

**Files:** All previously modified components

- [ ] **Invoke `frontend-design-pro` skill**

Run the `frontend-design-pro` skill on the recently changed components for a design quality pass. Focus on:
- Typography consistency (PJS weights, tracking values)
- Spacing rhythm (section padding, card internal spacing)
- Mobile responsiveness (all sections down to 375px)
- Animation performance (check for layout-triggering properties)

- [ ] **Invoke `ui-ux-pro-max` skill**

Run the `ui-ux-pro-max` skill for a UI/UX review pass. Focus on:
- Visual hierarchy across all sections
- CTA prominence and button sizing
- Color contrast on text-over-glass surfaces
- Touch target sizes on mobile

- [ ] **Fix any issues identified by the skills**

Address each finding one at a time, verify with `npx tsc --noEmit` after each fix.

- [ ] **Final build**

```bash
npm run build
```

Expected: Clean production build with 0 errors.

- [ ] **Commit**

```bash
git add -A
git commit -m "polish: apply frontend-design-pro and ui-ux-pro-max review fixes"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by task |
|---|---|
| Plus Jakarta Sans typography | Task 1, 2, 3 |
| Updated CSS tokens (darker bg, 3-stop brand gradient) | Task 2, 3 |
| Glassmorphism utilities (sm/md/brand/dark) | Task 2 |
| 3D depth-shadow button system | Task 5 |
| Framer Motion presets (all 6) | Task 4 |
| VideoBackground component | Task 7 |
| nano-banana-pro video generation | Task 10 |
| AudienceSwitcher (4-panel, spring tab, AnimatePresence) | Task 8 |
| StatsStrip with countUp | Task 9 |
| Navbar with dropdowns and glass-sm | Task 11 |
| HeroSection full rebuild | Task 12 |
| ProblemSection glass cards + gradient headline | Task 13 |
| HowItWorks animated connectors | Task 14 |
| FeaturesSection glass-md stagger | Task 15 |
| AudienceDeepDive new section | Task 16 |
| ImpactStats countUp full-width | Task 17 |
| CTASection glowPulse dual CTA | Task 18 |
| Footer 5-column glass-dark | Task 19 |
| Testimonials/Pricing/FAQ glass treatment | Task 20 |
| Homepage page.tsx wired up | Task 21 |
| InnerPageLayout branded hero header | Task 22 |
| /for-sardars new page | Task 23 |
| /for-enterprise filled out | Task 24 |
| /for-workers and /for-contractors updated | Task 25 |
| frontend-design-pro + ui-ux-pro-max polish | Task 26 |
| .gitignore .superpowers/ | Task 1 |
| react-countup installed | Task 1 |
| TrustBar removed | Task 21 |

All 28 spec requirements covered. No placeholders found. Types consistent throughout — `AudienceTab` interface defined in Task 8 and consumed in Tasks 12 and 16. `GlassVariant` defined in Task 6 and used in Tasks 13–19.
