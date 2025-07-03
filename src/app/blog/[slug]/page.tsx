import { Suspense } from "react";

import NotionPage from "@/app/blog/[slug]/components/notion-page";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getPostBySlug } from "@/utils/supabase";

// TODO: METADATA TAGS

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col px-4 sm:px-6 lg:px-8">
      <Header headerName={post.title} backLink="/blog" />
      <main className="flex flex-grow flex-col">
        <Suspense
          fallback={
            <div className="flex-grow animate-pulse rounded-lg bg-gray-200" />
          }
        >
          <h2 className="font-gill-sans mt-2 -mb-10 ml-2 text-2xl font-semibold sm:text-3xl">
            Table of Contents
          </h2>
          <NotionPage page_id={post.notion_page_id} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
