import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

async function fetchPosts() {
  const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data, error } = await supabaseClient
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error("Failed to load posts");
  }

  const postsWithUrls = await Promise.all(
    data.map(async (post) => ({
      ...post,
      image_url: await getPostImageUrl(post.image_url),
    })),
  );
  return postsWithUrls;
}

export const getPosts = unstable_cache(fetchPosts, ["posts"], {
  revalidate: 60 * 60 * 1,
  tags: ["posts"],
});

async function fetchPostBySlug(slug: string) {
  const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data, error } = await supabaseClient
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    if (error.code === "PGRST116") {
      throw notFound();
    }
    throw new Error("Failed to load post");
  }

  return data;
}

export const getPostBySlug = unstable_cache(fetchPostBySlug, ["post"], {
  revalidate: 60 * 60 * 24,
});

/**
 * Get a public URL for an image stored in Supabase Storage
 *
 * @param path - Path to the image in storage
 * @returns Public URL for the image
 */
async function fetchPostImageUrl(path: string) {
  const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const { data } = supabaseClient.storage.from("posts").getPublicUrl(path);
  return data.publicUrl;
}

const getPostImageUrl = unstable_cache(fetchPostImageUrl, ["postImageUrl"], {
  revalidate: 60 * 60 * 24,
});
