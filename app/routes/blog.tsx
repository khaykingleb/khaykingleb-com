import { MetaFunction } from "@remix-run/node";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import SearchByTags from "~/components/molecules/SearchByTags";
import Carousel from "~/components/organisms/Carousel";
import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";
import Pagination from "~/components/organisms/Pagination";

// Sample posts data with tags
const posts = [
  {
    id: 1,
    title: "Introduction to Digital Signal Processing",
    content: "Content of post 1",
    tags: ["speech", "dsp", "notes"],
  },
  {
    id: 2,
    title: "Post 2",
    content: "Content of post 2",
    tags: ["tag2", "tag3", "rust"],
  },
  {
    id: 3,
    title: "Post 3",
    content: "Content of post 3",
    tags: ["tag1", "tag3", "deep learning", "dla"],
  },
  {
    id: 4,
    title: "Post 4",
    content: "Content of post 4",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 5,
    title: "Post 5",
    content: "Content of post 5",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 6,
    title: "Post 6",
    content: "Content of post 6",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 7,
    title: "Post 7",
    content: "Content of post 7",
    tags: ["tag1", "tag2", "tag3", "deep learning", "abcd"],
  },
  {
    id: 8,
    title: "Post 8",
    content: "Content of post 8",
    tags: ["tag1", "tag2", "tag3", "deep learning", "ansible"],
  },
  {
    id: 9,
    title: "Post 9",
    content: "Content of post 9",
    tags: ["tag1", "tag2", "tag3", "deep learning", "ansible"],
  },
  {
    id: 10,
    title: "Post 10",
    content: "Content of post 10",
    tags: ["tag1", "tag2", "tag3", "deep learning", "ansible"],
  },
  {
    id: 11,
    title: "Post 11",
    content: "Content of post 11",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 12,
    title: "Post 12",
    content: "Content of post 12",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 13,
    title: "Post 13",
    content: "Content of post 13",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 14,
    title: "Post 14",
    content: "Content of post 14",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 15,
    title: "Post 15",
    content: "Content of post 15",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 16,
    title: "Post 16",
    content: "Content of post 16",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 17,
    title: "Post 17",
    content: "Content of post 17",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 18,
    title: "Post 18",
    content: "Content of post 18",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 19,
    title: "Post 19",
    content: "Content of post 19",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 20,
    title: "Post 20",
    content: "Content of post 20",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 21,
    title: "Post 21",
    content: "Content of post 21",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 22,
    title: "Post 22",
    content: "Content of post 22",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 23,
    title: "Post 23",
    content: "Content of post 23",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 24,
    title: "Post 24",
    content: "Content of post 24",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 25,
    title: "Post 25",
    content: "Content of post 25",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 26,
    title: "Post 26",
    content: "Content of post 26",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 27,
    title: "Post 27",
    content: "Content of post 27",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
  {
    id: 28,
    title: "Post 28",
    content: "Content of post 28",
    tags: ["tag1", "tag2", "tag3", "deep learning"],
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Posts | Gleb Khaykin" },
    { property: "og:title", content: "Posts | Gleb Khaykin" },
    { property: "og:description", content: "Gleb Khaykin's personal website" },
  ];
};

export default function BlogRoute() {
  const [postsPerPage, setPostsPerPage] = useState(6);
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
        setPostsPerPage(6);
      } else {
        setPostsPerPage(3);
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
      <Header backgroundImage="/img/van_gogh_wheatfield_under_thunderclouds.jpg" />
      <main className="flex flex-grow flex-col items-center justify-center">
        {/* <SearchByTags tagOptions={tagOptions} setTagOptions={setTagOptions} /> */}
        <Carousel
          items={filteredPosts.slice(
            currentPage * postsPerPage,
            (currentPage + 1) * postsPerPage,
          )}
        />
        <Pagination
          currentPage={currentPage}
          pagesInTotal={pagesInTotal}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </div>
  );
}
