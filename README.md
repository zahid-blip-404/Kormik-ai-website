# Kormik — Digital Labour Infrastructure

Marketing website for **Kormik** (কর্মীক), Bangladesh's verified worker platform.



## Tech Stack

- **Next.js 14** (App Router, static export)
- **Tailwind CSS v3** (custom dark design system)
- **Framer Motion** (animations, respects reduced motion)
- **TypeScript**

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # generates /out folder
```

## Deploy

The site exports to a static `out/` folder. Upload it to any host:

- **Vercel** — `npx vercel --prod`
- **cPanel/VPS** — upload `out/` contents via FTP

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page (hero with video bg, 13 sections) |
| `/for-workers` | Worker-focused features |
| `/for-sardars` | Sardar/gang-leader features |
| `/for-contractors` | Contractor hiring features |
| `/for-enterprise` | Enterprise/org features |
| `/how-it-works` | Platform walkthrough |
| `/impact` | Social impact metrics |
| `/about` | Company story |
| `/blog` | Blog listing |
| `/contact` | Contact form |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Brand Assets

| File | Description |
|------|-------------|
| `public/logo.svg` | White-text logo for dark backgrounds |
| `public/logo.png` | Transparent PNG logo |
| `public/og-image.jpg` | Social sharing image |
| `public/video/hero-bg.mp4` | Hero background video |
| `Kormik logo file delivery/` | Full brand kit (AI, EPS, PDF, SVG, PNG) |

## Design System

- **Background:** `#050505` (near-black)
- **Brand:** `#FF5C1A` (electric orange)
- **Fonts:** Plus Jakarta Sans (display) + Inter (body) + IBM Plex Mono (labels)
- **Glass effects:** 4 tiers of glassmorphism (sm, md, brand, dark)

See `handoff/figma-relume/design-tokens.json` for the full token set.

## Handoff

| Folder | For |
|--------|-----|
| `handoff/claude-vscode/` | Developers — VS Code + Claude Code setup guide |
| `handoff/figma-relume/` | Designers — design tokens JSON + Figma/Relume import guide |
| `handoff/wordpress/` | CTO — WordPress migration options |
