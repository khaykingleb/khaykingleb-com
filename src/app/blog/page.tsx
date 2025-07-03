import { Metadata } from "next";

import PostsContent from "@/app/blog/components/posts";
import { Footer } from "@/components/footer";
import { getPosts } from "@/utils/supabase";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on software, technology, and personal projects",
  openGraph: {
    title: "Blog",
    description: "Articles on software, technology, and personal projects",
    type: "website",
    url: "https://khaykingleb.com/blog",
    images: ["/avatar.webp"],
  },
};

/**
 *
 */
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-grow flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex flex-grow flex-col">
        <PostsContent posts={posts} />
        <Footer />
      </div>
    </div>
  );
}
