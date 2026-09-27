import type { APIRoute } from 'astro';
import { insertRow, json, rateLimited, sameOrigin } from '../../lib/supabase';

export const prerender = false;

const TYPES = new Set(['ngo', 'research', 'public', 'contractor', 'business', 'media', 'other']);
const clip = (v: unknown, n: number) => String(v ?? '').trim().slice(0, n);

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!sameOrigin(request)) return json(403, { error: 'Forbidden' });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return json(400, { error: 'Invalid JSON' }); }
  if (typeof body.company === 'string' && body.company.trim()) return json(200, { ok: true });

  const name = clip(body.name, 120);
  const organisation = clip(body.org, 160) || null;
  const message = clip(body.message, 4000);
  const type = TYPES.has(String(body.type)) ? String(body.type) : null;
  const lang = body.lang === 'bn' ? 'bn' : 'en';
  if (!name || !message) return json(400, { error: 'Name and message are required.' });
  if (rateLimited(`pe:${clientAddress ?? 'unknown'}`, 5)) return json(429, { error: 'Too many requests. Try again later.' });

  const r = await insertRow('partner_enquiries', { name, organisation, type, message, lang });
  if (!r.ok) {
    console.error('partner_enquiries insert failed', r.error);
    return json(r.status, { error: 'Could not send right now.' });
  }
  return json(200, { ok: true });
};

export const ALL: APIRoute = () => json(405, { error: 'Method not allowed' });
