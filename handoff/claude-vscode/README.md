# Working with Claude & VS Code

This is where YOU work on the Kormik website. The actual code is in the root of this repository (`D:\Claude Project Repository\Website\kormik-website\`).

---

## Quick Start (First Time)

### Step 1 — Open the project in VS Code

1. Open VS Code
2. `File` → `Open Folder` → navigate to `D:\Claude Project Repository\Website\kormik-website`
3. VS Code will open the full project

### Step 2 — Install dependencies (only needed once)

Open the VS Code terminal (`Ctrl + ~`) and run:
```
npm install
```

### Step 3 — Start the development server

In the VS Code terminal, run:
```
npm run dev
```

Then open your browser and go to: `http://localhost:3000`

You'll see the live website. Any changes you make to the code will update instantly in the browser.

---

## Working with Claude (Claude Code CLI)

Claude Code is what was used to build this website. You can continue using it.

### How to open Claude Code

1. Open the VS Code terminal (`Ctrl + ~`)
2. Type: `claude`
3. Claude will start in the context of your project folder

### Example things to ask Claude

- `"Change the headline in HeroSection to say XYZ"`
- `"Add a new section to the homepage after FeaturesSection"`
- `"Update the FAQ with these new questions: ..."`
- `"Change the brand orange color to #FF6B35"`
- `"Add a new page for /careers"`
- `"Fix the spacing on the footer on mobile"`

Claude reads your files, understands the design system, and makes precise edits.

---

## Project Structure (What Each Folder Does)

```
kormik-website/
│
├── app/                    ← Page files (one folder per URL)
│   ├── page.tsx            ← Homepage (http://localhost:3000/)
│   ├── for-workers/        ← http://localhost:3000/for-workers
│   ├── for-sardars/        ← http://localhost:3000/for-sardars
│   ├── for-contractors/    ← http://localhost:3000/for-contractors
│   ├── for-enterprise/     ← http://localhost:3000/for-enterprise
│   ├── how-it-works/       ← http://localhost:3000/how-it-works
│   ├── impact/             ← http://localhost:3000/impact
│   ├── about/              ← http://localhost:3000/about
│   ├── blog/               ← http://localhost:3000/blog
│   ├── contact/            ← http://localhost:3000/contact
│   ├── privacy/            ← http://localhost:3000/privacy
│   ├── terms/              ← http://localhost:3000/terms
│   ├── layout.tsx          ← Font setup, metadata (don't edit unless asked)
│   └── globals.css         ← Global CSS variables and utilities
│
├── components/             ← Reusable sections (used in pages above)
│   ├── Navbar.tsx          ← Top navigation bar
│   ├── HeroSection.tsx     ← Big hero at top of homepage
│   ├── StatsStrip.tsx      ← Stats bar below hero
│   ├── ProblemSection.tsx  ← "The Problem" section
│   ├── HowItWorks.tsx      ← 3-step how it works
│   ├── FeaturesSection.tsx ← 6-feature grid
│   ├── AudienceDeepDive.tsx ← 4-tab audience switcher section
│   ├── ImpactStats.tsx     ← Numbers section
│   ├── TestimonialsSection.tsx ← Testimonials
│   ├── PricingSection.tsx  ← Pricing
│   ├── FAQSection.tsx      ← FAQ accordion
│   ├── CTASection.tsx      ← Final call-to-action
│   ├── Footer.tsx          ← Site footer
│   ├── InnerPageLayout.tsx ← Template for inner pages (wraps Navbar+Footer+Hero)
│   ├── VideoBackground.tsx ← Video/poster background component
│   ├── AudienceSwitcher.tsx ← Tab switcher used in hero and AudienceDeepDive
│   └── ui/                 ← Small reusable UI pieces
│       ├── Button.tsx      ← All buttons
│       ├── GlassCard.tsx   ← Glass-effect card container
│       ├── SectionLabel.tsx ← Small orange label above headings
│       ├── Logo.tsx        ← Kormik logo
│       ├── FAQItem.tsx     ← Single FAQ accordion item
│       ├── PricingCard.tsx ← Pricing tier card
│       ├── StatCell.tsx    ← Stat number cell
│       └── TestimonialCard.tsx ← Testimonial quote card
│
├── lib/
│   └── motion.ts           ← Animation presets (fadeUp, stagger, etc.)
│
├── public/                 ← Static files (images, video, icons)
│   ├── logo.svg            ← Brand logo (white text, for dark background)
│   ├── logo.png            ← Brand logo (transparent PNG)
│   ├── og-image.jpg        ← Social sharing image (black bg)
│   ├── video/
│   │   ├── hero-bg.mp4     ← Hero background video (construction site)
│   │   └── hero-bg-poster.jpg  ← Hero video poster (fallback still)
│   └── images/             ← Any images you add
│
├── handoff/                ← THIS FOLDER — docs for CTO, Figma, and you
│
├── tailwind.config.ts      ← Design system (colors, fonts, spacing)
├── next.config.js          ← Build settings
└── package.json            ← Dependencies list
```

---

## How to Make Common Changes

### Change text on the homepage
- Open `components/HeroSection.tsx` to change the hero text
- Open `components/ProblemSection.tsx` to change the problem section
- Each component file contains the text — just edit the strings

### Add a new page
- Create a folder in `app/` with the URL name, e.g. `app/careers/`
- Create a file `app/careers/page.tsx`
- Use `InnerPageLayout` as the wrapper (look at `app/for-sardars/page.tsx` as an example)

### Change colors
- Open `tailwind.config.ts` — all colors are defined here
- Or open `app/globals.css` — CSS variables like `--brand` and `--bg` are here

### Add an image
- Put the image file in `public/images/`
- Use it in code as: `<img src="/images/your-image.jpg" />`

### Build the final website for upload
Run in terminal:
```
npm run build
```
This creates the `out/` folder — upload its contents to your web host.

---

## Recommended VS Code Extensions

Install these for a better experience:
- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **ESLint** — catches code errors
- **Prettier** — auto-formats code
- **TypeScript and JavaScript Language Features** — built-in, make sure it's enabled

---

## Getting Help

1. Open Claude Code in the terminal: `claude`
2. Describe what you want to change in plain English
3. Claude will find the right file and make the edit

You don't need to know how to code — just describe what you want.
