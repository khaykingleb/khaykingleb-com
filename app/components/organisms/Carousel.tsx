import { Link } from "@remix-run/react";

import { Tables } from "~/integrations/supabase/database.types";

/**
 * Carousel component to display a list of posts
 *
 * @param posts - Array of post items to display
 * @returns Carousel component
 */
export const Carousel = ({ posts }: { posts: Tables<"posts">[] }) => {
  return (
    <div className="flex h-full flex-grow">
      {posts.length > 0 ? (
        <div className="carousel carousel-vertical h-full w-full space-y-1">
          {posts.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.id}
              className="carousel-item block w-full cursor-pointer transition-all duration-300"
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
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="h-20 w-auto sm:h-24 md:h-28 lg:h-32"
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
