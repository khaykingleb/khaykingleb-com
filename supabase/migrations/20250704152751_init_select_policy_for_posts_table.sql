-- ----------------------------------------------------------------------------
-- Allow everyone (anon + authenticated) to read posts
-- ----------------------------------------------------------------------------
create policy public_read_of_posts
on public.posts
for select
to anon, authenticated
using (true);
