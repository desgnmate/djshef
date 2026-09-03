-- SHEF's self-hosted content model. Public pages read only published rows;
-- editor writes happen through the protected Next.js admin API using the
-- server-only Supabase service key.
create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id text primary key default 'site',
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.releases (
  id uuid primary key default gen_random_uuid(),
  year text not null default '2026',
  title text not null,
  note text not null default '',
  href text not null default '',
  preview_url text,
  cover_image text,
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.appearances (
  id uuid primary key default gen_random_uuid(),
  year text not null default '2026',
  city text not null,
  venue text not null default '',
  note text not null default '',
  href text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  src text not null,
  alt text not null default 'SHEF archive image',
  code text not null default 'SHEF / ARCHIVE',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.press_kit (
  id text primary key default 'press',
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists releases_published_order_idx on public.releases (published, sort_order, year);
create index if not exists appearances_published_order_idx on public.appearances (published, sort_order, year);
create index if not exists gallery_published_order_idx on public.gallery_items (published, sort_order);

alter table public.site_settings enable row level security;
alter table public.releases enable row level security;
alter table public.appearances enable row level security;
alter table public.gallery_items enable row level security;
alter table public.press_kit enable row level security;

revoke all on table public.site_settings from anon, authenticated;
revoke all on table public.releases from anon, authenticated;
revoke all on table public.appearances from anon, authenticated;
revoke all on table public.gallery_items from anon, authenticated;
revoke all on table public.press_kit from anon, authenticated;

grant select on table public.site_settings, public.press_kit to anon, authenticated;
grant select on table public.releases, public.appearances, public.gallery_items to anon, authenticated;

drop policy if exists "public can read site settings" on public.site_settings;
create policy "public can read site settings" on public.site_settings
  for select to anon, authenticated using (true);

drop policy if exists "public can read press kit" on public.press_kit;
create policy "public can read press kit" on public.press_kit
  for select to anon, authenticated using (true);

drop policy if exists "public can read published releases" on public.releases;
create policy "public can read published releases" on public.releases
  for select to anon, authenticated using (published = true);

drop policy if exists "public can read published appearances" on public.appearances;
create policy "public can read published appearances" on public.appearances
  for select to anon, authenticated using (published = true);

drop policy if exists "public can read published gallery" on public.gallery_items;
create policy "public can read published gallery" on public.gallery_items
  for select to anon, authenticated using (published = true);
