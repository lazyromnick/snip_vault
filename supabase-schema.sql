-- ── SnipVault · Supabase Schema ─────────────────────────────
-- Run this entire file in: Supabase Dashboard → SQL Editor → New Query

-- ── Enable UUID extension ───────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Snippets table ──────────────────────────────────────────
create table if not exists snippets (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  title       text not null,
  description text default '',
  language    text not null default 'python',
  category    text not null default 'snippet',
  code        text not null default '',
  tags        text[] default '{}',
  favorited   boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Collections table ───────────────────────────────────────
create table if not exists collections (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid references auth.users(id) on delete cascade not null,
  name       text not null,
  icon       text default '📦',
  created_at timestamptz default now()
);

-- ── Collection ↔ Snippet join table ─────────────────────────
create table if not exists collection_snippets (
  collection_id uuid references collections(id) on delete cascade not null,
  snippet_id    uuid references snippets(id)    on delete cascade not null,
  primary key (collection_id, snippet_id)
);

-- ── Row Level Security ───────────────────────────────────────
-- Users can only see and modify their own data.

alter table snippets          enable row level security;
alter table collections       enable row level security;
alter table collection_snippets enable row level security;

-- snippets
create policy "snippets: owner access" on snippets
  for all using (auth.uid() = user_id);

-- collections
create policy "collections: owner access" on collections
  for all using (auth.uid() = user_id);

-- collection_snippets (user owns the collection)
create policy "collection_snippets: owner access" on collection_snippets
  for all using (
    exists (
      select 1 from collections c
      where c.id = collection_id and c.user_id = auth.uid()
    )
  );

-- ── Auto-update updated_at ───────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger snippets_updated_at
  before update on snippets
  for each row execute function update_updated_at();

-- ── Done ─────────────────────────────────────────────────────
-- After running this, go back to SnipVault and sign in with GitHub.
