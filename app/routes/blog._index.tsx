import { SEOHandle } from "@nasa-gcn/remix-seo";
import { defer, MetaFunction } from "@remix-run/node";
import {
  Await,
  ClientLoaderFunctionArgs,
  useLoaderData,
} from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { TagOption, TagSearchBar } from "~/components/molecules/TagSearchBar";
import { Carousel } from "~/components/organisms/Carousel";
import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";
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
    { charset: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "author",
      content: "Gleb Khaykin",
    },
    {
      property: "og:title",
      content: "Blog",
    },
    {
      property: "og:description",
      content: "Gleb Khaykin's personal website",
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

// TODO: use cache to avoid re-fetching posts on every page load
export const loader = async () => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const postsPromise = supabase
    .from("posts")
    .select("*")
    .returns<Tables<"posts">[]>()
    .then(({ data, error }) => {
      if (error) throw new Response("Failed to load posts", { status: 500 });
      return data;
    });

  return defer({
    posts: postsPromise as Promise<Tables<"posts">[]>,
  });
};

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const clientLoader = async ({
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  const cachedData = sessionStorage.getItem("blogPosts");
  const cachedTimestamp = sessionStorage.getItem("blogPostsTimestamp");

  // Use cached data if it's valid
  if (cachedData && cachedTimestamp) {
    const isExpired = Date.now() - Number(cachedTimestamp) > CACHE_DURATION;
    const parsedData = JSON.parse(cachedData);
    if (!isExpired && parsedData.posts?.length > 0) {
      return { posts: Promise.resolve(parsedData.posts) };
    }
  }

  // Get fresh data from server and cache it
  const serverData = (await serverLoader()) as {
    posts: Promise<Tables<"posts">[]>;
  };
  serverData.posts.then((posts) => {
    sessionStorage.setItem("blogPosts", JSON.stringify({ posts }));
    sessionStorage.setItem("blogPostsTimestamp", Date.now().toString());
  });

  return serverData;
};
// Tell Remix to use the client loader during hydration
clientLoader.hydrate = true;

const MAX_POSTS_PER_PAGE_DESKTOP = 4;
const MAX_POSTS_PER_PAGE_MOBILE = 3;

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
  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        selectedTags.every((tag: string) => post.tags.includes(tag)),
      ),
    [selectedTags, posts],
  );

  const [postsPerPage, setPostsPerPage] = useState(MAX_POSTS_PER_PAGE_DESKTOP);
  const updatePostsPerPage = useCallback(() => {
    if (window.matchMedia("(min-height: 800px)").matches) {
      setPostsPerPage(MAX_POSTS_PER_PAGE_DESKTOP);
    } else {
      setPostsPerPage(MAX_POSTS_PER_PAGE_MOBILE);
    }
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
      <TagSearchBar tagOptions={tagOptions} setTagOptions={setTagOptions} />
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

const LoadingState = () => (
  <div className="flex flex-grow flex-col">
    <TagSearchBar tagOptions={[]} setTagOptions={() => {}} />
    <div className="flex flex-grow">
      <div className="flex-grow animate-pulse rounded bg-gray-200"></div>
    </div>
    <div className="flex justify-center">
      <Pagination currentPage={0} pagesInTotal={1} onPageChange={() => {}} />
    </div>
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
    <div className="flex min-h-screen flex-col">
      <Header backgroundImageUrl="/img/van_gogh_wheatfield_with_crows.webp" />
      <main className="flex flex-grow flex-col px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[750px] flex-grow flex-col">
          <Suspense fallback={<LoadingState />}>
            <Await resolve={posts}>
              {(resolvedPosts: Tables<"posts">[]) => (
                <PostsContent posts={resolvedPosts} />
              )}
            </Await>
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
