export type Lang = 'en' | 'bn';

export type PageKey = 'home' | 'why' | 'clients' | 'approach' | 'about' | 'join';

export const PAGES: { key: PageKey; path: string; en: string; bn: string }[] = [
  { key: 'home', path: '/', en: 'Home', bn: 'হোম' },
  { key: 'why', path: '/why-it-matters', en: 'Why it matters', bn: 'কেন জরুরি' },
  { key: 'clients', path: '/for-clients', en: 'For clients', bn: 'ক্লায়েন্টদের জন্য' },
  { key: 'approach', path: '/approach', en: 'Approach', bn: 'আমাদের পথ' },
  { key: 'about', path: '/about', en: 'About', bn: 'আমাদের কথা' },
  { key: 'join', path: '/join', en: 'Join', bn: 'যোগ দিন' },
];

/** Pick the English or Bangla string for the current page language. */
export const makeL = (lang: Lang) => (en: string, bn: string) => (lang === 'bn' ? bn : en);

/** Prefix an internal path with /bn for Bangla pages. Keeps #hash and ?query. */
export function localize(path: string, lang: Lang): string {
  if (lang !== 'bn' || !path.startsWith('/')) return path;
  const m = path.match(/^([^?#]*)(.*)$/)!;
  const base = m[1] === '/' ? '' : m[1];
  return `/bn${base}${m[2]}` || '/bn';
}

/** The same page in the other language. */
export function alternate(path: string, lang: Lang): string {
  return lang === 'bn' ? path : localize(path, 'bn');
}

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
export const toBnDigits = (s: string) => s.replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
