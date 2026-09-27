# kormik.com.bd: notes for coding agents

- This is an **Astro 7** site (not Next.js). Astro 7 defaults differ from older versions: `compressHTML` is `'jsx'` by default (this project sets `true` because pages are ported from rendered HTML), and the Rust compiler rejects unclosed or mis-nested tags. Check https://docs.astro.build/en/guides/upgrade-to/v7/ before changing config.
- Desktop pages are a pixel-faithful port of the Claude Design export. Don't restyle `src/components/pages/*` by hand; regenerate with `npm run port:generate`, and put phone-only changes in `src/styles/mobile.css`.
- Public copy rules: no pricing, fees, business model or partner names; say "Team Leader" (broker/sardar only for how hiring works today); never "mukadam" or "hat".
