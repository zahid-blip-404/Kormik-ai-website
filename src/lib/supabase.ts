// Minimal server-side insert into the Kormik Supabase project over its REST API (no SDK needed).
// Env (set in Vercel, never exposed to the browser):
//   SUPABASE_URL  e.g. https://<project-ref>.supabase.co
//   SUPABASE_KEY  the anon/publishable key. RLS allows insert only (see supabase/migrations).
const env = (k: string): string | undefined =>
  (typeof process !== 'undefined' ? process.env[k] : undefined) ?? (import.meta.env as Record<string, string | undefined>)[k];

export type InsertResult = { ok: true } | { ok: false; status: number; error: string };

export async function insertRow(table: string, row: Record<string, unknown>): Promise<InsertResult> {
  const url = env('SUPABASE_URL');
  const key = env('SUPABASE_KEY');
  if (!url || !key) {
    if (import.meta.env.DEV) {
      console.info(`[dev] Supabase not configured; would insert into ${table}:`, row);
      return { ok: true };
    }
    return { ok: false, status: 503, error: 'Form storage is not configured.' };
  }
  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${table}`, {
    method: 'POST',
    headers: { apikey: key, authorization: `Bearer ${key}`, 'content-type': 'application/json', prefer: 'return=minimal' },
    body: JSON.stringify(row),
  });
  if (!res.ok) return { ok: false, status: 502, error: `Supabase ${res.status}: ${(await res.text()).slice(0, 200)}` };
  return { ok: true };
}

// Best-effort, per-instance rate limit (serverless instances are short-lived; the database constraints are the backstop).
const hits = new Map<string, number[]>();
export function rateLimited(key: string, max = 8, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  return list.length > max;
}

export const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

/** Reject cross-site posts: the Origin (if sent) must be this site. */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try { return new URL(origin).host === new URL(request.url).host; } catch { return false; }
}
