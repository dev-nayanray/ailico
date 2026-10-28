-- AIlico initial schema: leads table
-- Apply with `supabase db push` (CLI) or by pasting into the Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 100),
  email text not null check (char_length(email) <= 200),
  website text check (char_length(website) <= 300),
  service text not null check (service in ('website-quick-fix', 'landing-page-development', 'ai-workflow-setup', 'other')),
  budget text check (char_length(budget) <= 50),
  message text not null check (char_length(message) <= 3000),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost', 'spam')),
  source text not null default 'contact-form' check (char_length(source) <= 50),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Operational indexes: newest leads first, and pipeline filtering.
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_idx on public.leads (email);

-- updated_at maintenance.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- Row Level Security: enabled with NO policies for anon/authenticated roles.
-- The server-side application writes and reads exclusively with the
-- service-role key, which bypasses RLS. Public visitors therefore can neither
-- read nor write leads through any client API. Never add an anon insert or
-- select policy to this table.
alter table public.leads enable row level security;
