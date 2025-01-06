import { SEOHandle } from "@nasa-gcn/remix-seo";
import { defer, MetaFunction } from "@remix-run/node";
import {
  Await,
  ClientLoaderFunctionArgs,
  Link,
  useLoaderData,
} from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

import { TagOption, TagSearchBar } from "~/components/molecules/TagSearchBar";
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
  const [tagOptions, setTagOptions] = useState(
    Array.from(new Set(posts.flatMap((post) => post.tags)))
      .sort()
      .map((tag) => ({ name: tag, selected: false })),
  );
  const selectedTags = useMemo(
    () =>
      tagOptions
        .filter((option: TagOption) => option.selected)
        .map((option: TagOption) => option.name),
    [tagOptions],
  );

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesTags = selectedTags.every((tag: string) =>
          post.tags.includes(tag),
        );
        const matchesSearch =
          searchQuery === "" ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTags && matchesSearch;
      }),
    [selectedTags, posts, searchQuery],
  );

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
        <div className="relative flex items-center">
          {searchOpen ? (
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="font-gill-sans input input-bordered h-10 w-56 pr-8 text-base sm:w-64"
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="absolute right-2 text-gray-500 hover:text-black"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center text-xl sm:text-2xl"
              aria-label="Search posts"
            >
              <FaSearch />
            </button>
          )}
        </div>
      </div>
      <div className="my-4 h-px w-full bg-gray-200" />
      {/* <TagSearchBar tagOptions={tagOptions} setTagOptions={setTagOptions} /> */}
      <div className="flex-grow">
        <Carousel
          posts={filteredPosts.slice(
            currentPage * postsPerPage,
            (currentPage + 1) * postsPerPage,
          )}
        />
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          pagesInTotal={pagesInTotal}
          onPageChange={updateCurrentPage}
        />
      </div>
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
    <footer className="flex justify-center">
      <Pagination currentPage={0} pagesInTotal={5} onPageChange={() => {}} />
    </footer>
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
      <main className="flex flex-grow flex-col">
        <Suspense fallback={<LoadingFallback />}>
          <Await resolve={posts}>
            {(resolvedPosts: Tables<"posts">[]) => (
              <PostsContent posts={resolvedPosts} />
            )}
          </Await>
        </Suspense>
        <Footer textColor="text-gray-500" />
      </main>
    </div>
  );
}
