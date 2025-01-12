import { SEOHandle } from "@nasa-gcn/remix-seo";
import { defer, MetaFunction } from "@remix-run/node";
import {
  Await,
  ClientLoaderFunctionArgs,
  useLoaderData,
} from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { Suspense, useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { TagSearchLoop } from "~/components/molecules/TagSearchLoop";
import { Carousel } from "~/components/organisms/Carousel";
import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";
import { Pagination } from "~/components/organisms/Pagination";
import { Tables } from "~/integrations/supabase/database.types";
import { getPostImageUrl } from "~/utils/supabase";

export const handle: SEOHandle = {
  /**
   * Asynchronously retrieve sitemap.xml entries for the route
   *
   * @returns The sitemap.xml entries for the route
   */
  getSitemapEntries: async () => {
    return [{ route: "/blog", priority: 1, changefreq: "weekly" }];
  },
};

/**
 * Generate metadata for the route
 *
 * @returns The meta tags for the route
 */
export const meta: MetaFunction = () => {
  return [
    { title: "Blog" },
    { description: "Blog posts by Gleb Khaykin" },
    {
      property: "og:title",
      content: "Blog",
    },
    {
      property: "og:description",
      content: "Blog posts by Gleb Khaykin",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://khaykingleb.com/blog",
    },
    {
      property: "og:image",
      content: "/img/van_gogh_wheatfield_with_crows.webp",
    },
  ];
};

export const loader = async () => {
  const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const postsPromise = supabaseClient
    .from("posts")
    .select("*")
    .returns<Tables<"posts">[]>()
    .then(async ({ data, error }) => {
      if (error) throw new Response("Failed to load posts", { status: 500 });
      return data.reverse().map((post) => ({
        ...post,
        image_url: getPostImageUrl(supabaseClient, post.image_url),
      }));
    });

  return defer({ posts: postsPromise as Promise<Tables<"posts">[]> });
};

const CACHE_KEY = "blogPosts";
const CACHE_TIMESTAMP_KEY = "blogPostsTimestamp";
const CACHE_DURATION = 60 * 60 * 1000;

export const clientLoader = async ({
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (cachedData && cachedTimestamp) {
    if (Date.now() - Number(cachedTimestamp) < CACHE_DURATION) {
      const parsedData: { posts: Tables<"posts">[] } = JSON.parse(cachedData);
      return { posts: parsedData.posts };
    }
  }

  const serverData = (await serverLoader()) as {
    posts: Promise<Tables<"posts">[]>;
  };
  serverData.posts.then((posts) => {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ posts }));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  });
  return serverData;
};
// Tell Remix to use the client loader during hydration
clientLoader.hydrate = true;

const CAROUSEL_ITEM_HEIGHTS = {
  xs: 100,
  sm: 116,
  md: 132,
  lg: 160,
} as const;

const PostsContent = ({ posts }: { posts: Tables<"posts">[] }) => {
  const [displayedPosts, setDisplayedPosts] = useState(posts);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  const updatePostsPerPage = useCallback(() => {
    const LAYOUT_HEIGHTS = {
      header: 60,
      pagination: 40,
      footer: 48,
      spacing: 20,
    };

    const totalFixedHeight = Object.values(LAYOUT_HEIGHTS).reduce(
      (a, b) => a + b,
      0,
    );
    const availableHeight = window.innerHeight - totalFixedHeight;

    const itemHeight = window.matchMedia("(min-width: 1024px)").matches
      ? CAROUSEL_ITEM_HEIGHTS.lg
      : window.matchMedia("(min-width: 768px)").matches
        ? CAROUSEL_ITEM_HEIGHTS.md
        : window.matchMedia("(min-width: 640px)").matches
          ? CAROUSEL_ITEM_HEIGHTS.sm
          : CAROUSEL_ITEM_HEIGHTS.xs;

    setPostsPerPage(Math.max(2, Math.floor(availableHeight / itemHeight)));
  }, []);

  // Update the number of posts per page when the window is resized
  useEffect(() => {
    updatePostsPerPage();
    window.addEventListener("resize", updatePostsPerPage);
    return () => window.removeEventListener("resize", updatePostsPerPage);
  }, [updatePostsPerPage]);

  const pagesInTotal = Math.ceil(displayedPosts.length / postsPerPage);
  const updateCurrentPage = useCallback(
    (pageIndex: number) => {
      if (pageIndex >= 0 && pageIndex < pagesInTotal) {
        setCurrentPage(pageIndex);
      }
    },
    [pagesInTotal],
  );

  const visiblePosts = displayedPosts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage,
  );

  return (
    <div className="flex flex-grow flex-col">
      <Header headerName="Blog">
        <TagSearchLoop posts={posts} setDisplayedPosts={setDisplayedPosts} />
      </Header>
      <Carousel posts={visiblePosts} />
      <Pagination
        currentPage={currentPage}
        pagesInTotal={pagesInTotal}
        onPageChange={updateCurrentPage}
      />
    </div>
  );
};

const LoadingFallback = () => (
  <div className="flex flex-grow flex-col">
    <Header headerName="Blog">
      <div className="relative flex items-center">
        <button className="text-xl sm:text-2xl" aria-label="Search">
          <FaSearch />
        </button>
      </div>
    </Header>
    <main className="flex flex-grow">
      <div className="flex-grow animate-pulse rounded-lg bg-gray-200" />
    </main>
    <Pagination currentPage={0} pagesInTotal={5} onPageChange={() => {}} />
  </div>
);

/**
 * The main component for the route
 *
 * @returns The route layout
 */
export default function BlogRoute() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[850px] flex-grow flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex flex-grow flex-col">
        <Suspense fallback={<LoadingFallback />}>
          <Await resolve={posts}>
            {(resolvedPosts) => <PostsContent posts={resolvedPosts} />}
          </Await>
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}
