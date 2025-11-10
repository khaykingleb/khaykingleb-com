import type { Metadata } from "next";
import { Suspense } from "react";

import NotionPage from "@/app/blog/[slug]/components/notion-page";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getPostBySlug } from "@/utils/supabase";

/**
 * Generate metadata for the blog post.
 *
 * @param params - An object containing the slug of the blog post.
 * @returns A promise that resolves to the metadata of the blog post.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const publishedTime = new Date(post.created_at).toISOString();
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    title: post.title,
    description: post.description ?? `Published on ${formattedDate}`,
    authors: [{ name: "Gleb Khaykin" }],
    openGraph: {
      type: "article",
      url: `https://khaykingleb.com/blog/${post.slug}`,
      title: post.title,
      description: post.description ?? `Published on ${formattedDate}`,
      images: [post.image_url],
    },
    other: {
      "article:author": "Gleb Khaykin",
      "article:published_time": publishedTime,
      "article:tag": Array.isArray(post.tags) ? post.tags.join(", ") : "",
    },
  };
}

/**
 * Render the blog post page.
 *
 * @param slug - The slug of the blog post to render.
 * @returns The rendered blog post page.
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <div
      className={`
        mx-auto flex min-h-screen w-full max-w-[800px] flex-col px-4
        sm:px-6
        lg:px-8
      `}
    >
      <Header headerName={post.title} backLink="/blog" />
      <main className="flex flex-grow flex-col">
        <Suspense
          fallback={
            <div
              className={`
                mt-2 -mb-2 flex-grow animate-pulse rounded-lg bg-gray-200
              `}
            />
          }
        >
          <h2
            className={`
              mt-2 -mb-10 ml-2 font-gill-sans text-2xl font-semibold
              tracking-tight
              sm:text-3xl
            `}
          >
            Table of Contents
          </h2>
          <NotionPage page_id={post.notion_page_id} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
