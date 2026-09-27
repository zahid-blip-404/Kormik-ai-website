# kormik.com.bd

Public pre-launch preview site for **Kormik (কর্মীক)**: a record that's yours for Bangladesh's informal workers.
Built with [Astro](https://astro.build) 7 and deployed on Vercel. English at `/`, Bangla at `/bn`.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static pages + /api functions in .vercel/output
```

Node 22.12 or newer.

## How the site is put together

| Path | What |
|---|---|
| `src/pages/*.astro`, `src/pages/bn/*.astro` | Routes (EN / BN). Each wraps a page component in the layout. |
| `src/components/pages/*.astro` | Page bodies. Home, Why it matters, For clients, Approach and About are **generated** from the Claude Design export (see below). Join is hand-built. |
| `src/components/{Nav,Footer,EarlyAccessForm,TradeIcon}.astro` | Shared parts. |
| `src/styles/` | Kormik design-system tokens and components (from the export), `mobile.css` (phone refinements), `global.css`. |
| `src/scripts/site.ts`, `src/scripts/join.ts` | Menu, language switch, early-access forms, the Join sign-up steps and partner form. |
| `src/pages/api/early-access.ts`, `src/pages/api/partner.ts` | Form endpoints (Vercel functions) that insert into Supabase. |
| `supabase/migrations/` | SQL for the two form tables (insert-only for the site). |
| `design/tools/` | The port: `gen.py` (snapshot → page component), `strings/*.json` (English → Bangla), `compare.py` (pixel diff against the design), `crawl.py` (link check). |

### Editing copy

For the generated pages, edit the Bangla (or fix English) in `design/tools/strings/<page>.json`, then run
`npm run port:generate` (needs Python 3 with `beautifulsoup4`). Join's copy lives in `src/components/pages/Join.astro`.
All Bangla is a draft for a native speaker to review.

## Forms (Supabase)

1. Run `supabase/migrations/20260928000000_kormik_site_forms.sql` in the Kormik Supabase project.
2. In Vercel → Project → Settings → Environment Variables, add `SUPABASE_URL` and `SUPABASE_KEY` (the anon key). Redeploy.

Until both are set, the live forms answer "Something went wrong" (locally they log the submission instead).
