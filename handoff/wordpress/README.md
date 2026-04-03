# WordPress Handoff — For the CTO

This folder contains everything your developer needs to rebuild or mirror the Kormik website in WordPress.



---

## What the Current Site Is

The live Kormik website is built with:
- **Next.js 14** (React framework) — located in the root of this repository
- **Tailwind CSS** — for all styling (dark theme, glassmorphism, orange brand)
- **Framer Motion** — for animations
- **TypeScript** — all code is typed

The site is a **static export** (see `out/` folder in the root) — meaning it can be hosted anywhere without a server.

---

## For Your CTO: WordPress Options

There are two approaches depending on your goal:

### Option A — Mirror the Design in WordPress (Recommended for content management)

Use a **headless or full WordPress** setup with a custom theme that matches the Kormik design system.

**Design system to replicate:**
| Token | Value |
|-------|-------|
| Background | `#050505` |
| Background 2 | `#0D0D0D` |
| Brand orange | `#FF5C1A` |
| Brand orange 2 | `#FF9F4A` |
| Text primary | `#FFFFFF` |
| Text secondary | `#B8B8B8` |
| Font (headings) | Plus Jakarta Sans (Google Fonts) |
| Font (body) | Inter (Google Fonts) |
| Font (mono labels) | IBM Plex Mono (Google Fonts) |
| Border radius (cards) | `12px` |
| Border radius (buttons) | `10px` |

**Recommended WordPress plugins for this style:**
- **Elementor Pro** or **Bricks Builder** — drag-and-drop page builder with custom CSS support
- **GeneratePress** or **Astra** — lightweight base theme
- **Advanced Custom Fields (ACF)** — for structured content (testimonials, FAQs, stats)
- **WP Rocket** — performance/caching

**Steps for your CTO:**
1. Install WordPress with GeneratePress or Astra theme
2. Install Elementor Pro
3. Load the Google Fonts: Plus Jakarta Sans, Inter, IBM Plex Mono
4. Set the global color palette to the values above
5. Recreate each page section using the page content in `page-content/`

### Option B — Use Next.js as Headless CMS Frontend + WordPress as Backend

Keep the Next.js site as-is, and use **WordPress as a headless CMS** (content only, no frontend).

**How it works:**
- CTO manages blog posts, testimonials, team bios in WordPress
- The Next.js site fetches content from WordPress via the **WP REST API** or **WPGraphQL**
- No design changes needed on the Next.js side

**What your CTO needs to set up:**
1. Install WordPress (on any hosting)
2. Install **WPGraphQL** plugin (`https://www.wpgraphql.com/`)
3. Create post types: Blog, Testimonials, Team
4. Share the WordPress GraphQL endpoint URL with the developer working on the Next.js code

---

## Page Content

See `page-content/` subfolder — this contains the text content for each page in plain text format, ready for a CTO to copy into WordPress pages.

---

## Hosting

The static export (`out/` folder in project root) can be deployed to:
- **Vercel** (recommended — free tier available, zero config)

- **cPanel shared hosting** — just upload the `out/` folder contents via FTP

For WordPress hosting, your CTO would use a separate host (e.g., SiteGround, WP Engine, Kinsta).
