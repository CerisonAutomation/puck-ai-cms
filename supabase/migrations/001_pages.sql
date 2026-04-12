-- Puck AI CMS — pages table
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  title text not null default 'Untitled',
  data jsonb not null default '{}'::jsonb,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS
alter table public.pages enable row level security;

-- Public can read published pages
create policy "Public read published pages"
  on public.pages for select
  using (published = true);

-- Authenticated users have full access
create policy "Auth users full access"
  on public.pages for all
  using (auth.role() = 'authenticated');

-- Auto-update updated_at trigger
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger pages_updated_at
  before update on public.pages
  for each row execute function update_updated_at();
