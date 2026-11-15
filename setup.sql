-- AcadaBee: one private table ("the hive") that holds the family's game data.
-- Run this once in Supabase: SQL Editor → New query → paste → Run.

create table if not exists public.hive (
  owner      uuid        not null default auth.uid() references auth.users(id) on delete cascade,
  k          text        not null,          -- e.g. "players/p1", "progress/p2", "notes/abc123"
  v          jsonb       not null,
  updated_at timestamptz not null default now(),
  primary key (owner, k)
);

-- Only the signed-in family account can see or change its own rows.
alter table public.hive enable row level security;

drop policy if exists "family reads own rows"   on public.hive;
drop policy if exists "family adds own rows"    on public.hive;
drop policy if exists "family changes own rows" on public.hive;
drop policy if exists "family removes own rows" on public.hive;

create policy "family reads own rows"   on public.hive for select to authenticated using (owner = auth.uid());
create policy "family adds own rows"    on public.hive for insert to authenticated with check (owner = auth.uid());
create policy "family changes own rows" on public.hive for update to authenticated using (owner = auth.uid()) with check (owner = auth.uid());
create policy "family removes own rows" on public.hive for delete to authenticated using (owner = auth.uid());

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.hive to authenticated;
revoke all on public.hive from anon;
