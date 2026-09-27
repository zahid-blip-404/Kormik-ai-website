import type { APIRoute } from 'astro';
import { insertRow, json, rateLimited, sameOrigin } from '../../lib/supabase';

export const prerender = false;

const ROLES = new Set(['work', 'lead', 'crew', 'gov']);
const SOURCES = new Set(['home', 'for-clients', 'join']);

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!sameOrigin(request)) return json(403, { error: 'Forbidden' });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return json(400, { error: 'Invalid JSON' }); }

  // Honeypot: bots fill the hidden "company" field. Pretend success.
  if (typeof body.company === 'string' && body.company.trim()) return json(200, { ok: true });

  const role = String(body.role ?? '');
  const phone = String(body.phone ?? '').replace(/\D/g, '');
  const lang = body.lang === 'bn' ? 'bn' : 'en';
  const source = SOURCES.has(String(body.source)) ? String(body.source) : 'unknown';
  if (!ROLES.has(role)) return json(400, { error: 'Choose who you are.' });
  if (!/^1[3-9]\d{8}$/.test(phone)) return json(400, { error: 'Enter a valid Bangladeshi mobile number.' });
  if (rateLimited(`ea:${clientAddress ?? 'unknown'}`)) return json(429, { error: 'Too many requests. Try again later.' });

  const r = await insertRow('early_access', { role, phone: `+880${phone}`, lang, source });
  if (!r.ok) {
    console.error('early_access insert failed', r.error);
    return json(r.status, { error: 'Could not save right now.' });
  }
  return json(200, { ok: true });
};

export const ALL: APIRoute = () => json(405, { error: 'Method not allowed' });
