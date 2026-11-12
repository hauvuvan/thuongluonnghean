begin;
revoke all on public.warranties, public.warranty_admin_sessions from service_role;
grant select, insert, update on public.warranties to service_role;
grant select, insert, delete on public.warranty_admin_sessions to service_role;
commit;
