-- Run this entire file in Supabase Dashboard → SQL Editor → Run
-- Project: Settings → API → Project URL should match NEXT_PUBLIC_SUPABASE_URL

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  school text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  file_path text,
  file_name text,
  file_type text,
  extracted_text text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_outputs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  note_id uuid not null references public.notes(id) on delete cascade,
  type text not null check (type in ('summary', 'quiz', 'schedule')),
  content jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists notes_user_id_created_at_idx
  on public.notes(user_id, created_at desc);

create index if not exists ai_outputs_note_id_created_at_idx
  on public.ai_outputs(note_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.notes enable row level security;
alter table public.ai_outputs enable row level security;

grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on all tables in schema public to postgres, service_role;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant select on all tables in schema public to anon;

alter default privileges in schema public
  grant all on tables to postgres, service_role;

alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated;

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Profiles are editable by owner" on public.profiles;
create policy "Profiles are editable by owner"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Notes are readable by owner" on public.notes;
create policy "Notes are readable by owner"
  on public.notes for select
  using (auth.uid() = user_id);

drop policy if exists "Notes are insertable by owner" on public.notes;
create policy "Notes are insertable by owner"
  on public.notes for insert
  with check (auth.uid() = user_id);

drop policy if exists "Notes are editable by owner" on public.notes;
create policy "Notes are editable by owner"
  on public.notes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Notes are deletable by owner" on public.notes;
create policy "Notes are deletable by owner"
  on public.notes for delete
  using (auth.uid() = user_id);

drop policy if exists "AI outputs are readable by owner" on public.ai_outputs;
create policy "AI outputs are readable by owner"
  on public.ai_outputs for select
  using (auth.uid() = user_id);

drop policy if exists "AI outputs are insertable by owner" on public.ai_outputs;
create policy "AI outputs are insertable by owner"
  on public.ai_outputs for insert
  with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('study-notes', 'study-notes', false)
on conflict (id) do nothing;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, school)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'school', '')
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = excluded.full_name,
    school = excluded.school,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
