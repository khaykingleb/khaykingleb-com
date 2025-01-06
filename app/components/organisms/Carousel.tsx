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
    <div className="h-full">
      {posts.length > 0 ? (
        <div className="carousel carousel-vertical h-full w-full space-y-1">
          {posts.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.id}
              className="carousel-item block w-full cursor-pointer transition-all duration-300 hover:bg-gray-50"
            >
              <div className="flex w-full items-center px-2 py-2 sm:px-3 md:px-4">
                <div className="flex-grow pr-2 sm:pr-3 md:pr-4">
                  <h1 className="font-gill-sans mb-1 text-sm font-semibold sm:text-base md:text-lg lg:text-xl">
                    {post.title}
                  </h1>
                  <p className="font-gill-sans mb-1 text-xs sm:text-sm md:text-base">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="font-gill-sans flex flex-wrap gap-1 text-xs sm:text-sm">
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
        <div className="pt-40 text-center">
          <p className="font-gill-sans text-lg font-semibold">No posts found</p>
        </div>
      )}
    </div>
  );
};
