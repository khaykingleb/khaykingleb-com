import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Get a public URL for an image stored in Supabase Storage
 *
 * @param supabaseClient - Supabase client instance
 * @param path - Path to the image in storage
 * @returns Public URL for the image
 */
export function getPostImageUrl(
  supabaseClient: SupabaseClient,
  path: string,
): string {
  const { data } = supabaseClient.storage.from("posts").getPublicUrl(path);
  return data.publicUrl;
}
