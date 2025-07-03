"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Tables } from "@/integrations/supabase/database.types";

/**
 * Carousel component to display a list of posts.
 *
 * @param posts - Array of post items to display.
 * @returns Carousel component
 */
export const Carousel = ({ posts }: { posts: Tables<"posts">[] }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="flex h-full flex-grow">
      {posts.length > 0 ? (
        <div className="carousel carousel-vertical h-full w-full">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="carousel-item md:hover:bg-base-200 mb-1 block w-full cursor-pointer rounded p-2 transition-all duration-300 md:mb-4"
            >
              <div className="flex w-full items-center">
                <div className="flex-grow pr-2 sm:pr-3 md:pr-4">
                  <h1 className="mb-1 text-sm font-semibold sm:text-base md:text-lg lg:text-xl">
                    {post.title}
                  </h1>
                  <p className="mb-1 text-xs sm:text-sm md:text-base">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex flex-wrap gap-1 text-xs sm:text-sm">
                    {post.tags.map((tag) => (
                      <span key={tag} className="inline-block">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Image
                  src={post.image_url}
                  alt={post.title}
                  width={100}
                  height={100}
                  quality={90}
                  loading="lazy"
                  priority={false}
                  onLoad={(e) => {
                    if (e.currentTarget.complete) {
                      setIsLoading(false);
                    }
                  }}
                  className={`mr-4 w-auto sm:h-24 md:h-28 lg:h-32 ${isLoading ? "animate-pulse" : ""}`}
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <p className="text-xl font-semibold">No posts found...</p>
        </div>
      )}
    </div>
  );
};
