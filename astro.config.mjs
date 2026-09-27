// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.kormik.com.bd',
  // Pages are static; only /api/* runs on the server (Vercel functions).
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-GB', bn: 'bn-BD' } },
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  // The pages are ported from rendered HTML, so keep HTML-aware whitespace (Astro 7 defaults to 'jsx').
  compressHTML: true,
  trailingSlash: 'never',
  build: { format: 'file' },
});
