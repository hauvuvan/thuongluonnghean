begin;

create table public.warranties (
  id text primary key,
  code text not null unique,
  customer text not null,
  phone text not null,
  product text not null,
  clinic text not null,
  quantity integer not null check (quantity between 1 and 32),
  positions text not null default '',
  start date not null,
  "end" date not null,
  status text not null default 'active' check (status in ('active', 'revoked')),
  notes text not null default '',
  updated_at timestamptz not null default now(),
  check ("end" >= start)
);

create index warranties_phone_idx on public.warranties (phone);
create index warranties_recent_idx on public.warranties (updated_at desc, id);
alter table public.warranties enable row level security;
revoke all on public.warranties from public, anon, authenticated;
grant select, insert, update on public.warranties to service_role;

create table public.warranty_admin_sessions (
  token_hash text primary key check (token_hash ~ '^[a-f0-9]{64}$'),
  admin_id uuid not null references auth.users(id) on delete cascade,
  expires_at timestamptz not null
);
create index warranty_admin_sessions_expiry_idx on public.warranty_admin_sessions (expires_at);
alter table public.warranty_admin_sessions enable row level security;
revoke all on public.warranty_admin_sessions from public, anon, authenticated;
grant select, insert, delete on public.warranty_admin_sessions to service_role;

create function public.lookup_warranties(lookup_code text, lookup_phone text)
returns table (
  code text, customer text, phone text, product text, clinic text,
  quantity integer, positions text, start date, "end" date, status text
)
language sql stable security invoker
set search_path = ''
as $$
  select w.code, w.customer, w.phone, w.product, w.clinic, w.quantity,
         w.positions, w.start, w."end", w.status
  from public.warranties w
  where w.code = lookup_code or w.phone = lookup_phone
  limit 20;
$$;

revoke all on function public.lookup_warranties(text, text) from public, anon, authenticated;
grant execute on function public.lookup_warranties(text, text) to service_role;
notify pgrst, 'reload schema';

commit;
