"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Tables } from "@/integrations/supabase/database.types";

/**
 * Carousel component to display a list of posts.
 *
 * @param posts - Array of post items to display.
 * @returns The Carousel component.
 */
export const Carousel = ({ posts }: { posts: Tables<"posts">[] }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="-mt-1 flex h-full flex-grow">
      {posts.length > 0 ? (
        <div className="carousel h-full w-full carousel-vertical">
          {posts.map((post) => (
            <div key={post.id} className="carousel-item w-full">
              <Link
                href={`/blog/${post.slug}`}
                className={`
                  block w-full cursor-pointer rounded p-1 transition-colors
                  duration-300
                  md:p-3 md:hover:bg-base-200
                `}
              >
                <div className="flex w-full items-center">
                  <div className={`flex-grow`}>
                    <h1
                      className={`
                        mb-1 text-sm font-semibold
                        sm:text-base
                        md:text-lg
                        lg:text-xl
                      `}
                    >
                      {post.title}
                    </h1>
                    <p
                      className={`
                        mb-1 text-xs
                        sm:text-sm
                        md:text-base
                      `}
                    >
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div
                      className={`
                        flex flex-wrap gap-1 text-xs
                        sm:text-sm
                      `}
                    >
                      {post.tags.map((tag) => (
                        <span key={tag} className="inline-block">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`
                      relative h-20 w-32 flex-shrink-0 overflow-hidden rounded
                      sm:h-24 sm:w-40
                      md:h-28 md:w-48
                      lg:h-32 lg:w-56
                      ${isLoading ? "animate-pulse bg-gray-200" : ""}
                    `}
                  >
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className={`
                        object-contain object-center transition-opacity
                        duration-500
                        ${isLoading ? "opacity-0" : "opacity-100"}
                      `}
                      onLoad={(e) => {
                        if (e.currentTarget.complete) {
                          setIsLoading(false);
                        }
                      }}
                    />
                  </div>
                </div>
              </Link>
            </div>
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
