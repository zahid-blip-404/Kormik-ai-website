# Kormik Website Redesign — Design Spec
**Date:** 2026-04-02  
**Status:** Approved  
**Approach:** Design System First (Approach 1)

---

## Overview

A full visual and structural redesign of `kormik.com.bd` — transforming the current generic dark landing page into a cinematic, dynamic platform site. The redesign introduces a construction-site video background, a 4-panel audience switcher, Plus Jakarta Sans typography with poetic contrast copy, depth-shadowed 3D buttons, glassmorphic cards, and enhanced Framer Motion animations throughout.

The project is built on Next.js (App Router), Tailwind CSS, and Framer Motion. All implementation uses the existing stack — no new frameworks.

---

## Design Direction

**Aesthetic:** Cinematic Dark + Gradient Glow  
Deep blacks (`#050505`), warm orange gradient glows (`#FF5C1A → #FF9F4A → #FFD580`), glassmorphic surfaces, depth-shadowed 3D buttons. Inspired by Linear/Vercel but with warmth, humanity, and a strong sense of place.

**Typography:** Plus Jakarta Sans (display/headings) + IBM Plex Mono (labels/mono) + Inter (body)  
Replaces: Syne + IBM Plex Mono + Inter

**Copy direction:** Poetic contrast — fading opacity between headline lines creates visual rhythm.  
Hero headline: *"From invisible to verified. From forgotten to found."*

---

## Section 1 — Design System

### Typography Scale

| Token | Font | Size | Weight | Tracking |
|---|---|---|---|---|
| `display-xl` | Plus Jakarta Sans | 52px | 800 | -3px |
| `display-lg` | Plus Jakarta Sans | 40px | 800 | -2px |
| `heading` | Plus Jakarta Sans | 26px | 700 | -1px |
| `subheading` | Plus Jakarta Sans | 18px | 600 | 0 |
| `body` | Inter | 15px | 400 | 0, lh 1.6 |
| `mono-label` | IBM Plex Mono | 11px | 500 | +2px, uppercase |

### Color Tokens

```css
--bg:      #050505
--bg2:     #0D0D0D
--bg3:     #161616
--brand:   #FF5C1A
--brand-2: #FF9F4A
--brand-3: #FFD580
--t1:      #FFFFFF
--t2:      #B8B8B8
--t3:      #888888
--t4:      #666666
--success: #22C55E
```

### Shadow Tokens

| Token | Usage | Value |
|---|---|---|
| `shadow-sm` | Small buttons, tags | `0 4px 12px rgba(255,92,26,0.2), 0 2px 0 rgba(100,25,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)` |
| `shadow-md` | Primary CTA buttons | `0 8px 28px rgba(255,92,26,0.45), 0 3px 0 rgba(100,25,0,0.7), inset 0 1px 0 rgba(255,255,255,0.28)` |
| `shadow-lg` | Hero CTA, hover state | `0 16px 48px rgba(255,92,26,0.6), 0 4px 0 rgba(100,25,0,0.8), inset 0 1px 0 rgba(255,255,255,0.3)` |

### Glassmorphism Utilities

| Class | Background | Border | Blur | Usage |
|---|---|---|---|---|
| `glass-sm` | `rgba(255,255,255,0.03)` | `rgba(255,255,255,0.07)` | 12px | Navbar, badges, tags |
| `glass-md` | `rgba(255,255,255,0.05)` | `rgba(255,255,255,0.10)` | 24px | Cards, panels |
| `glass-brand` | `rgba(255,92,26,0.06)` | `rgba(255,92,26,0.18)` | 16px | Feature cards, CTA |
| `glass-dark` | `rgba(0,0,0,0.5)` | `rgba(255,255,255,0.05)` | 32px | Overlays, stats strip |

### Button System

- **Primary:** gradient `#FF5C1A → #FF7A42`, `shadow-md`, inset top highlight, `border-radius: 10px`
- **Secondary:** `glass-sm`, `border-radius: 10px`, hover lifts with brand border glow
- **Ghost:** transparent, minimal `1px solid #1E1E1E` border
- **Icon:** 42×42px square, `glass-brand` variant

### Framer Motion Presets (`lib/motion.ts`)

| Preset | Spec | Usage |
|---|---|---|
| `fadeUp` | y 24→0, opacity 0→1, easeOut 0.5s | Section entrances |
| `stagger` | children delay 0.08s | Card grids, lists |
| `tabSwitch` | y 8→0, opacity fade, spring stiffness 400 | Audience switcher |
| `glowPulse` | scale 1↔1.08, opacity 0.6↔1, 6s loop | Orbs, badge dot |
| `countUp` | 0 → target on viewport, 1.5s easeOut via `react-countup` library | ImpactStats, StatsStrip |
| `cardHover` | y -4, shadow boost, border glow | All interactive cards |

All animations respect `prefers-reduced-motion` via the existing `useReducedMotion()` hook.

---

## Section 2 — Site Architecture

### Navigation

**Structure:**
- Logo (`Kormik কর্মীক`)
- Dropdown: **For Workers** → `/for-workers`, `/for-sardars`
- Dropdown: **For Business** → `/for-contractors`, `/for-enterprise`
- Links: How It Works · Impact · About
- CTA button: **Get Started ↗** (primary, 3D shadow)

**Treatment:** `glass-sm`, sticky, scroll-triggered bottom border fade-in, animated entry on load.

### Site Map

| Page | Status | Notes |
|---|---|---|
| `/` | REDESIGN | Full homepage overhaul |
| `/for-workers` | REDESIGN | New design system applied |
| `/for-sardars` | **NEW** | New audience page |
| `/for-contractors` | REDESIGN | New design system applied |
| `/for-enterprise` | FILL OUT | Content was empty — full page built |
| `/how-it-works` | REDESIGN | Animated step flow |
| `/impact` | REDESIGN | Data-driven cinematic section |
| `/about` | REDESIGN | Mission + team |
| `/contact` | REDESIGN | Updated treatment |
| `/blog` | KEEP | No changes |
| `/privacy` | KEEP | No changes |
| `/terms` | KEEP | No changes |

### Homepage Section Order

| # | Section | Change | Notes |
|---|---|---|---|
| 01 | Navbar | MAJOR | Glass, dropdowns, animated |
| 02 | HeroSection | MAJOR | Video bg, poetic copy, 4-panel switcher |
| 03 | Stats Strip | MAJOR | New component `StatsStrip.tsx`, count-up, glass-dark surface |
| 04 | ProblemSection | MAJOR | Contrast typography, cinematic layout |
| 05 | HowItWorks | MAJOR | Animated connectors, step stagger |
| 06 | FeaturesSection | MAJOR | Glass cards, stagger, hover glow |
| 07 | 4-Audience Deep Dive | **NEW** | Tabbed, per-audience showcase |
| 08 | ImpactStats | MAJOR | countUp on viewport, full-width |
| 09 | TestimonialsSection | MAJOR | Glass cards, horizontal scroll mobile |
| 10 | PricingSection | MINOR | Glass surfaces, brand highlight |
| 11 | FAQSection | MINOR | Accordion + smooth expand |
| 12 | CTASection | MAJOR | Full-bleed gradient, dual CTA |
| 13 | Footer | MAJOR | 4-column, Bengali logo, glass-dark |

---

## Section 3 — Component Redesign

### Existing Components

**Navbar.tsx** — `glass-sm` blur, dropdown menus for Workers/Business, PJS font, 3D primary button, scroll border.

**HeroSection.tsx** — Full rebuild: `VideoBackground` component, poetic PJS display-xl headline with fading contrast lines, `AudienceSwitcher` with 4 tabs, floating particles, breathing glow orbs, stats strip pinned to bottom.

**FeaturesSection.tsx** — `glass-md` cards, stagger on viewport entry, brand-highlighted featured card, cardHover motion.

**HowItWorks.tsx** — Animated SVG connector lines between steps, numbered orange circles with glow, each step fadeUp with stagger.

**ImpactStats.tsx** — countUp animation on viewport entry, full-width `glass-dark` section, brand gradient numbers.

**Footer.tsx** — 4-column layout (Brand · Workers · Business · Company), Bengali script logo, `glass-dark` surface, social links.

**AudienceSection.tsx** — Replaced by new 4-Audience Deep Dive section using `AudienceSwitcher`. File deleted.

**TrustBar.tsx** — Removed from homepage. Replaced by Stats Strip (section 03).

**CTASection.tsx** — Full-bleed brand gradient, dual CTA (workers download vs enterprise demo), glow orb backdrop, `VideoBackground` optional second video or CSS gradient fallback.

**InnerPageLayout.tsx** — Updated with new Navbar, brand gradient hero header, PJS typography, consistent section spacing.

### New Components

**`components/VideoBackground.tsx`**  
Wraps `<video>` with autoPlay, muted, loop, playsInline. Accepts `src`, `poster`, `overlayOpacity`, `gradientColor` props. Falls back to static poster + CSS gradient when video unavailable or reduced-motion is active.

**`components/AudienceSwitcher.tsx`**  
4-tab pill switcher. Accepts `tabs[]` array with `{ label, icon, subline, cta: { text, href } }`. Uses Framer Motion `AnimatePresence` for content swap. Reused in HeroSection and 4-Audience section.

**`app/for-sardars/page.tsx`**  
New audience page using `InnerPageLayout`. Sections:
1. Hero: *"The bridge between workers and work."*
2. What a Sardar does (role explainer)
3. How Kormik empowers Sardars
4. QR gang check-in deep-dive
5. Payment & record tracking
6. CTA: Join as Sardar →

**`components/ui/GlassCard.tsx`**  
New primitive. Accepts `variant: 'sm' | 'md' | 'brand' | 'dark'`, `hover: boolean`. Applies correct glass token + cardHover motion.

### UI Primitives Updated

- **`components/ui/Button.tsx`** — all 4 variants (primary/secondary/ghost/icon) with new shadow tokens
- **`components/ui/SectionLabel.tsx`** — mono-label style, flanking lines, optional dot
- **`lib/motion.ts`** — all 6 presets added (fadeUp, stagger, tabSwitch, glowPulse, countUp, cardHover)

---

## Section 4 — Video Background & Animation

### Cinematic Video — Production Spec

**nano-banana-pro Prompt:**
> "Cinematic aerial drone shot of a massive construction site in Dhaka, Bangladesh. Wide establishing view — sweeping slowly across the site like a film city introduction sequence. Heavy machinery below: tower cranes, excavators, concrete mixers, scaffolding spanning the full frame. Dozens of workers in bright orange vests visible from above, each busy at their station — welding, carrying materials, operating machinery. Dust rising in golden-hour light. Deep sense of scale and human industry. Dark cinematic grade, slow drift, seamless loop, 4K."

**Technical Requirements:**
- Format: MP4 (H.264)
- Duration: 15–20s seamless loop
- Resolution: 1920×1080 minimum
- File size: <8MB (compress with ffmpeg if needed)
- Audio: None (muted)
- Output path: `/public/video/hero-bg.mp4`
- Fallback poster: `/public/video/hero-bg-poster.jpg`

**Overlay Layer Stack (applied in VideoBackground.tsx):**
1. `rgba(0,0,0,0.55)` — base darken
2. `radial-gradient` orange glow at 8% opacity (centre-top)
3. Grid texture at 2% opacity
4. Bottom fade `linear-gradient` → `#050505`

### Homepage Load Animation Sequence

| Time | Event | Motion |
|---|---|---|
| 0ms | Page load | Navbar fades down — `y -12→0, opacity 0→1, 0.8s easeOut` |
| +100ms | Live badge | `fadeUp` spring, green dot starts pulse loop |
| +200ms | Headline lines | 3 lines stagger in — `0.1s` between each, `fadeUp 0.7s` |
| +450ms | Subline + switcher | Body fades, switcher springs up — `stiffness 400, damping 20` |
| +550ms | CTA buttons | `fadeUp 0.5s easeOut`, 3D shadow active |
| +650ms | Particles | 8 dust particles drift upward, 10–18s staggered loops |
| Scroll | Each section | `whileInView` + `once: true`, stagger 0.08s between children |
| Tab switch | Switcher | `AnimatePresence` — exit 0.2s, enter 0.35s |

### Scroll Animation Intensity

Sections ranked by motion richness: Hero (highest) → 4-Audience Deep Dive → FeaturesSection → ImpactStats → CTASection → ProblemSection → HowItWorks → TestimonialsSection → Footer → Pricing → FAQ → Stats Strip (lowest).

---

## Implementation Approach

**Approach 1 — Design System First:**

1. Install `react-countup`, add `plus-jakarta-sans` to Google Fonts in `layout.tsx`, update `globals.css` and `tailwind.config.ts` with all new tokens (typography, shadows, glass utilities, color tokens)
2. Update `lib/motion.ts` with all 6 presets
3. Update UI primitives (Button, SectionLabel, add GlassCard)
4. Generate video with nano-banana-pro, place in `/public/video/`
5. Create `VideoBackground` and `AudienceSwitcher` components
6. Rebuild `Navbar`, `HeroSection` (highest impact first)
7. Rebuild remaining homepage components in section order
8. Build new `/for-sardars` page
9. Fill out `/for-enterprise` page
10. Update `InnerPageLayout` and apply to all audience pages
11. Polish pass — spacing, motion timing, mobile responsiveness

---

## Skills to Invoke During Implementation

- `nano-banana-pro` — generate construction site drone video
- `frontend-design-pro` — frontend design quality pass
- `ui-ux-pro-max` — UI/UX reference and design polish
- `ui-component` — UI component generation for complex elements
