import { SEOHandle } from "@nasa-gcn/remix-seo";
import { defer, MetaFunction } from "@remix-run/node";
import {
  Await,
  ClientLoaderFunctionArgs,
  Link,
  useLoaderData,
} from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { Suspense, useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { TagSearchLoop } from "~/components/molecules/TagSearchLoop";
import { Carousel } from "~/components/organisms/Carousel";
import { Footer } from "~/components/organisms/Footer";
import { Pagination } from "~/components/organisms/Pagination";
import { Tables } from "~/integrations/supabase/database.types";

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
      content: "/img/van_gogh_wheatfield_with_crows.jpg",
    },
  ];
};

export const loader = async () => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const postsPromise = supabase
    .from("posts")
    .select("*")
    .returns<Tables<"posts">[]>()
    .then(async ({ data, error }) => {
      if (error) throw new Response("Failed to load posts", { status: 500 });
      return data.reverse();
    });

  return defer({ posts: postsPromise });
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
  xs: 96 + 4, //
  sm: 112 + 4, // h-28 (28 * 4px) + padding
  md: 128 + 4, // h-32 (32 * 4px) + padding
  lg: 160, // h-40 (40 * 4px) + padding
} as const;

const PostsContent = ({ posts }: { posts: Tables<"posts">[] }) => {
  const [displayedPosts, setDisplayedPosts] = useState(posts);
  const [postsPerPage, setPostsPerPage] = useState(4);

  const updatePostsPerPage = useCallback(() => {
    const windowHeight = window.innerHeight;
    const headerHeight = 60;
    const paginationHeight = 40;
    const footerHeight = 48;
    const spacing = 20; // Increased spacing buffer
    const availableHeight =
      windowHeight - headerHeight - paginationHeight - footerHeight - spacing;

    let itemHeight = CAROUSEL_ITEM_HEIGHTS.xs;
    if (window.matchMedia("(min-width: 1024px)").matches) {
      itemHeight = CAROUSEL_ITEM_HEIGHTS.lg;
    } else if (window.matchMedia("(min-width: 768px)").matches) {
      itemHeight = CAROUSEL_ITEM_HEIGHTS.md;
    } else if (window.matchMedia("(min-width: 640px)").matches) {
      itemHeight = CAROUSEL_ITEM_HEIGHTS.sm;
    }

    const calculatedPosts = Math.floor(availableHeight / itemHeight);
    setPostsPerPage(Math.max(2, calculatedPosts));
  }, []);

  useEffect(() => {
    updatePostsPerPage();
    window.addEventListener("resize", updatePostsPerPage);
    return () => window.removeEventListener("resize", updatePostsPerPage);
  }, [updatePostsPerPage]);

  const [currentPage, setCurrentPage] = useState(0);
  const pagesInTotal = Math.ceil(posts.length / postsPerPage);
  const updateCurrentPage = useCallback(
    (pageIndex: number) => {
      if (pageIndex >= 0 && pageIndex < pagesInTotal) {
        setCurrentPage(pageIndex);
      }
    },
    [pagesInTotal],
  );

  return (
    <div className="flex flex-grow flex-col">
      <div className="mt-4 flex items-center justify-between">
        <div className="font-gill-sans flex items-center gap-2">
          <Link to="/" className="text-3xl font-semibold sm:text-4xl">
            &lt;
          </Link>
          <h1 className="text-3xl font-semibold sm:text-4xl">Blog</h1>
        </div>
        <TagSearchLoop posts={posts} setDisplayedPosts={setDisplayedPosts} />
      </div>
      <div className="my-4 h-px w-full bg-gray-200" />
      <Carousel
        posts={displayedPosts.slice(
          currentPage * postsPerPage,
          (currentPage + 1) * postsPerPage,
        )}
      />
      <Pagination
        currentPage={currentPage}
        pagesInTotal={Math.ceil(displayedPosts.length / postsPerPage)}
        onPageChange={updateCurrentPage}
      />
    </div>
  );
};

const LoadingFallback = () => (
  <div className="flex flex-grow flex-col">
    <header className="mt-4">
      <div className="font-gill-sans flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-3xl font-semibold sm:text-4xl">
            &lt;
          </Link>
          <h1 className="text-3xl font-semibold sm:text-4xl">Blog</h1>
        </div>
        <div className="relative flex items-center">
          <button className="text-xl sm:text-2xl" aria-label="Search">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="my-4 h-px w-full bg-gray-200" />
    </header>
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
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-grow flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex flex-grow flex-col">
        <Suspense fallback={<LoadingFallback />}>
          <Await resolve={posts}>
            {(resolvedPosts: Tables<"posts">[]) => (
              <PostsContent posts={resolvedPosts} />
            )}
          </Await>
        </Suspense>
        <Footer textColor="text-gray-500" />
      </div>
    </div>
  );
}
