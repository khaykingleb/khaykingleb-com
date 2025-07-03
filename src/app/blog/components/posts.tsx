"use client";

import { useCallback, useEffect, useState } from "react";

import { Carousel } from "@/app/blog/components/carousel";
import { Pagination } from "@/app/blog/components/pagination";
import { TagSearch } from "@/app/blog/components/tag-search";
import { Header } from "@/components/header";
import { Tables } from "@/integrations/supabase/database.types";

const CAROUSEL_ITEM_HEIGHTS = {
  xs: 100,
  sm: 116,
  md: 132,
  lg: 160,
} as const;

const LAYOUT_HEIGHTS = {
  header: 60,
  pagination: 40,
  footer: 48,
  spacing: 20,
} as const;

/**
 * Component to display blog posts with pagination and search functionality.
 *
 * @param posts - Array of post items to display.
 * @returns The rendered component.
 */
export default function PostsContent({ posts }: { posts: Tables<"posts">[] }) {
  const [displayedPosts, setDisplayedPosts] = useState(posts);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  const updatePostsPerPage = useCallback(() => {
    const totalFixedHeight = Object.values(LAYOUT_HEIGHTS).reduce(
      (a, b) => a + b,
      0,
    );
    const availableHeight = window.innerHeight - totalFixedHeight;

    const carouselItemHeight = window.matchMedia("(min-width: 1024px)").matches
      ? CAROUSEL_ITEM_HEIGHTS.lg
      : window.matchMedia("(min-width: 768px)").matches
        ? CAROUSEL_ITEM_HEIGHTS.md
        : window.matchMedia("(min-width: 640px)").matches
          ? CAROUSEL_ITEM_HEIGHTS.sm
          : CAROUSEL_ITEM_HEIGHTS.xs;

    setPostsPerPage(
      Math.max(2, Math.floor(availableHeight / carouselItemHeight)),
    );
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
        <TagSearch posts={posts} setDisplayedPosts={setDisplayedPosts} />
      </Header>
      <Carousel posts={visiblePosts} />
      <Pagination
        currentPage={currentPage}
        pagesInTotal={pagesInTotal}
        onPageChange={updateCurrentPage}
      />
    </div>
  );
}
