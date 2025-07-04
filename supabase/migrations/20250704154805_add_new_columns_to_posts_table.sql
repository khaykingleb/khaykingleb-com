-- ----------------------------------------------------------------------------
-- Add `updated_at` (auto-maintained) and optional `description` columns to
-- `public.posts` table
-- ----------------------------------------------------------------------------

-- 1. Add the columns
alter table public.posts
add column updated_at timestamp with time zone not null default now(),
add column description text;

-- 2. Document the columns
comment on column public.posts.updated_at is
'Timestamp automatically set to NOW() whenever the post is updated';
comment on column public.posts.description is
'Optional short description of the post';

-- 3. Automatically keep `updated_at` in sync
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  NEW.updated_at := now();
  return NEW;
end;
$$;

create trigger update_posts_updated_at
before update on public.posts
for each row
execute procedure public.update_updated_at_column();
