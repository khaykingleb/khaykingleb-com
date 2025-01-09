-- Add table description
comment on table public.posts is 'Table storing blog posts from Notion';

-- Add column descriptions
comment on column public.posts.title is 'Title of the blog post';
comment on column public.posts.slug is
'URL-friendly version of the title used for routing';
comment on column public.posts.notion_page_id is
'Associated Notion page identifier';
comment on column public.posts.tags is 'Array of tags associated with the post';
comment on column public.posts.image_url is
'URL of the featured image for the post';
