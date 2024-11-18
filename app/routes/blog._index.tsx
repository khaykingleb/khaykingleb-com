import { SEOHandle } from "@nasa-gcn/remix-seo";
import { MetaFunction } from "@remix-run/node";
import { useCallback, useEffect, useMemo, useState } from "react";

import { TagSearchBar } from "~/components/molecules/TagSearchBar";
import { Carousel } from "~/components/organisms/Carousel";
import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";
import { Pagination } from "~/components/organisms/Pagination";
import { posts } from "~/data/posts";

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

// TODO: have conflict with Pagination component
const MAX_POSTS_PER_PAGE_DESKTOP = 4;
const MAX_POSTS_PER_PAGE_MOBILE = 3;

/**
 * The main component for the route
 *
 * @returns The route layout
 */
export default function BlogRoute() {
  const [postsPerPage, setPostsPerPage] = useState(MAX_POSTS_PER_PAGE_DESKTOP);
  const [currentPage, setCurrentPage] = useState(0);
  const [tagOptions, setTagOptions] = useState(
    Array.from(new Set(posts.flatMap((post) => post.tags)))
      .sort()
      .map((tag) => ({ name: tag, selected: false })),
  );

  const selectedTags = useMemo(
    () =>
      tagOptions
        .filter((option) => option.selected)
        .map((option) => option.name),
    [tagOptions],
  );
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTags]);

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        selectedTags.every((tag) => post.tags.includes(tag)),
      ),
    [selectedTags],
  );

  useEffect(() => {
    const updatePostsPerPage = () => {
      if (window.matchMedia("(min-height: 800px)").matches) {
        setPostsPerPage(MAX_POSTS_PER_PAGE_DESKTOP);
      } else {
        setPostsPerPage(MAX_POSTS_PER_PAGE_MOBILE);
      }
    };

    updatePostsPerPage();
    window.addEventListener("resize", updatePostsPerPage);

    return () => window.removeEventListener("resize", updatePostsPerPage);
  }, []);

  const pagesInTotal = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = useCallback(
    (pageIndex: number) => {
      if (pageIndex >= 0 && pageIndex < pagesInTotal) {
        setCurrentPage(pageIndex);
      }
    },
    [pagesInTotal],
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header backgroundImageUrl="/img/van_gogh_wheatfield_with_crows.webp" />
      <main className="flex flex-grow flex-col px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[750px] flex-grow flex-col">
          <TagSearchBar tagOptions={tagOptions} setTagOptions={setTagOptions} />
          <div className="flex-grow">
            <Carousel
              items={filteredPosts.slice(
                currentPage * postsPerPage,
                (currentPage + 1) * postsPerPage,
              )}
            />
          </div>
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              pagesInTotal={pagesInTotal}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
