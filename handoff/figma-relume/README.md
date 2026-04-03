# Figma & Relume Handoff

This folder contains the Kormik design system in a format you can import into Figma or Relume.

---

## File in This Folder

| File | What it is |
|------|------------|
| `design-tokens.json` | All colors, fonts, spacing, shadows, glass effects, gradients, and animations |

---

## How to Use in Figma

### Method 1 — Tokens Studio Plugin (Recommended)

1. Open your Figma file
2. Install the **Tokens Studio for Figma** plugin (free): `figma.com/community/plugin/843461159747178978`
3. In the plugin, click **Import** → paste or upload `design-tokens.json`
4. The colors, typography, and spacing will appear as Figma variables/styles
5. Apply them to your frames

### Method 2 — Manual Setup

Use the values in `design-tokens.json` to manually set up your Figma file:

1. **Colors** → Go to `Assets` panel → `Local styles` → add each color from the `colors` section
2. **Fonts** → Install from Google Fonts first:
   - Plus Jakarta Sans (headings/display)
   - Inter (body text)
   - IBM Plex Mono (labels, mono text)
   - Download at: `fonts.google.com`
3. **Text styles** → Create styles matching the `typography.scale` values
4. **Effects** → Add glassmorphism effects using the `glassmorphism` values (use Background blur)

---

## How to Use in Relume

Relume is a Figma-to-website tool. Here's how to match the Kormik style:

1. Go to `app.relume.io` and start a new project
2. In **Brand settings**, enter:
   - Primary color: `#FF5C1A`
   - Background: `#050505`
   - Text: `#FFFFFF`
   - Heading font: **Plus Jakarta Sans**
   - Body font: **Inter**
3. Build your page using Relume's components
4. Export to Figma — this gives you editable frames
5. To get the **exact Kormik look** (glass cards, dark theme), you'll need to apply the glassmorphism values from `design-tokens.json` manually in Figma after export

---

## How to Get the Exact Current Design in Figma

The most accurate way to get the current Kormik design into Figma is:

1. **Run the website locally** (see `handoff/claude-vscode/README.md`)
2. Open `http://localhost:3000` in Chrome
3. Use the **Figma for Chrome** browser extension to capture live web pages into Figma frames:
   - Install: `figma.com/community/plugin/1325756911989186500`
   - It will convert the live HTML/CSS into Figma layers

Alternatively, take full-page screenshots and trace in Figma.

---

## Live Site URL (for Relume Import)

To import into Relume: paste your live site URL into Relume's **Import by URL** field once deployed.

---

## Brand Assets

| Asset | Location | Format |
|-------|----------|--------|
| Logo SVG (white text, for dark bg) | `public/logo.svg` | SVG |
| Logo PNG (transparent bg) | `public/logo.png` | PNG |
| OG / social image (black bg) | `public/og-image.jpg` | JPG |
| Hero background video | `public/video/hero-bg.mp4` | MP4 (14MB) |
| Hero video poster (fallback) | `public/video/hero-bg-poster.jpg` | JPG |
| Logo component | `components/ui/Logo.tsx` | React (renders logo.svg via next/image) |
| Full brand kit (AI, EPS, PDF, all versions) | `Kormik logo file delivery/` | Various |

To use the logo in Figma: drag `public/logo.svg` directly into your Figma canvas, or use `File → Import`.

---

## Key Design Principles

- **Dark-first**: everything is on `#050505` or `#0D0D0D`
- **Glassmorphism**: cards use blur + semi-transparent backgrounds (see `glassmorphism` in tokens)
- **Brand gradient**: headlines use `#FF5C1A → #FF9F4A → #FFD580` on key words
- **Typography contrast**: headings are `font-extrabold` with tight letter-spacing (`-2px`)
- **Orange accent only**: no other accent color — the brand orange is the only color
- **Card glow hover**: all cards use `.card-glow` — on hover, a warm orange radial gradient fades in from the bottom, the border tints orange, and the card lifts 3px
