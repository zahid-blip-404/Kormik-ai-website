-- Kormik website forms: early-access sign-ups and partner enquiries.
-- Run once in the Kormik Supabase project (SQL editor, or `supabase db push`).
-- The site inserts with the anon key. RLS allows INSERT only, so the key cannot read rows back.

create table if not exists public.early_access (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  role        text not null check (role in ('work', 'lead', 'crew', 'gov')),
  phone       text not null check (phone ~ '^\+8801[3-9][0-9]{8}$'),
  lang        text not null default 'en' check (lang in ('en', 'bn')),
  source      text not null default 'unknown' check (source in ('home', 'for-clients', 'join', 'unknown'))
);
create index if not exists early_access_phone_idx on public.early_access (phone);

create table if not exists public.partner_enquiries (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 1 and 120),
  organisation  text check (organisation is null or char_length(organisation) <= 160),
  type          text check (type is null or type in ('ngo', 'research', 'public', 'contractor', 'business', 'media', 'other')),
  message       text not null check (char_length(message) between 1 and 4000),
  lang          text not null default 'en' check (lang in ('en', 'bn'))
);

alter table public.early_access enable row level security;
alter table public.partner_enquiries enable row level security;

drop policy if exists "site can insert early access" on public.early_access;
create policy "site can insert early access" on public.early_access
  for insert to anon with check (true);

drop policy if exists "site can insert partner enquiries" on public.partner_enquiries;
create policy "site can insert partner enquiries" on public.partner_enquiries
  for insert to anon with check (true);

-- No select, update or delete policies: read the data in the Supabase dashboard (or with the service role).
