import type { Lang, PageKey } from './i18n';

export const META: Record<PageKey, { path: string; sources: 'none' | 'lfs-findex' | 'lfs-wri-findex'; en: [string, string]; bn: [string, string] }> = {
  home: {
    path: '/', sources: 'lfs-findex',
    en: ["Kormik · A record that's yours", "Nearly 7 crore people keep Bangladesh working. 84 in 100 have no record of it. Kormik is building a record that's yours: every day of work recognised, paid and protected. Pre-launch preview, opening in Dhaka first."],
    bn: ['কর্মীক · একটি রেকর্ড, যা আপনার', 'প্রায় ৭ কোটি মানুষ বাংলাদেশকে সচল রাখেন। ১০০ জনে ৮৪ জনের কাজের কোনো রেকর্ড নেই। কর্মীক গড়ছে এমন একটি রেকর্ড, যা আপনার। চালুর আগের প্রিভিউ, প্রথমে ঢাকায়।'],
  },
  why: {
    path: '/why-it-matters', sources: 'lfs-wri-findex',
    en: ['Why it matters · Kormik', 'Every morning, a lottery. Every workday, unrecorded. Why unrecorded work matters for Bangladesh, in public figures with sources.'],
    bn: ['কেন জরুরি · কর্মীক', 'প্রতিদিন সকালে একটা লটারি। প্রতিটি কাজের দিন, রেকর্ডহীন। বাংলাদেশের জন্য রেকর্ডহীন কাজ কেন জরুরি, তথ্যসূত্রসহ।'],
  },
  clients: {
    path: '/for-clients', sources: 'none',
    en: ['For clients · Kormik', 'Need a crew? Hire people you can trust. Homes, shops, contractors, developers and public works. A Team Leader who answers for the crew, and every day of work on record.'],
    bn: ['ক্লায়েন্টদের জন্য · কর্মীক', 'দল দরকার? বিশ্বস্ত মানুষ নিন। বাড়ি, দোকান, ঠিকাদার, ডেভেলপার ও সরকারি কাজ। দলের দায় নেন একজন টিম লিডার, আর প্রতিটি কাজের দিন থাকে রেকর্ডে।'],
  },
  approach: {
    path: '/approach', sources: 'none',
    en: ['Approach · Kormik', "We don't replace the old way. We give it a memory. How Kormik works with workers, Team Leaders and clients."],
    bn: ['আমাদের পথ · কর্মীক', 'আমরা পুরনো পথ বদলাই না। তাকে একটি স্মৃতি দিই। কর্মী, টিম লিডার ও ক্লায়েন্টদের সঙ্গে কর্মীক যেভাবে কাজ করে।'],
  },
  about: {
    path: '/about', sources: 'none',
    en: ['About · Kormik', 'Kormik is named for the people who do the work. Our mission: every day of informal work in Bangladesh, recognised, paid and protected.'],
    bn: ['আমাদের কথা · কর্মীক', 'কর্মীক নামটি তাদের নামে, যারা কাজটি করেন। আমাদের লক্ষ্য: বাংলাদেশের প্রতিটি অনানুষ্ঠানিক কাজের দিন, স্বীকৃত, পারিশ্রমিকপ্রাপ্ত ও সুরক্ষিত।'],
  },
  join: {
    path: '/join', sources: 'none',
    en: ['Join · Kormik', 'Join Kormik early access: workers, Team Leaders, clients and public bodies. Opening in Dhaka first.'],
    bn: ['যোগ দিন · কর্মীক', 'কর্মীকে আগাম নিবন্ধন করুন: কর্মী, টিম লিডার, ক্লায়েন্ট ও সরকারি প্রতিষ্ঠান। প্রথমে ঢাকায় চালু হবে।'],
  },
};

export const metaFor = (key: PageKey, lang: Lang) => {
  const m = META[key];
  const [title, description] = m[lang];
  return { path: m.path, sources: m.sources, title, description };
};
