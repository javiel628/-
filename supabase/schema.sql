-- Run this script in Supabase SQL Editor.
-- Applications can be submitted by visitors; only admins can read/update them.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'member' check (role in ('member','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.membership_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  reason text not null check (char_length(reason) between 10 and 1500),
  status text not null default 'pending' check (status in ('pending','approved','declined')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.membership_applications enable row level security;

-- A user may read only their own profile. Admin access is separately granted below.
drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile" on public.profiles
for select to authenticated using (auth.uid() = id);

drop policy if exists "Visitors submit applications" on public.membership_applications;
create policy "Visitors submit applications" on public.membership_applications
for insert to anon, authenticated with check (
  char_length(full_name) between 2 and 100
  and char_length(email) between 3 and 254
  and char_length(reason) between 10 and 1500
);

-- Admin checks use a protected app_metadata claim, not a user-editable profile field.
create or replace function public.is_site_admin()
returns boolean language sql stable security definer
set search_path = '' as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

drop policy if exists "Admins read applications" on public.membership_applications;
create policy "Admins read applications" on public.membership_applications
for select to authenticated using (public.is_site_admin());

drop policy if exists "Admins update applications" on public.membership_applications;
create policy "Admins update applications" on public.membership_applications
for update to authenticated using (public.is_site_admin()) with check (public.is_site_admin());

drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles" on public.profiles
for select to authenticated using (public.is_site_admin());

-- Create an admin only from the Supabase dashboard/trusted server:
-- Authentication > Users > select user > Edit app metadata
-- Set {"role":"admin"} in app_metadata. Never use user_metadata for admin authorization.
