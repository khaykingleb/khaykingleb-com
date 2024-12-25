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
    <div className="mb-2 mt-2">
      {posts.length > 0 ? (
        <div className="carousel carousel-vertical h-full w-full">
          {posts.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.id}
              className="carousel-item block w-full cursor-pointer transition-all duration-300 hover:bg-gray-100"
            >
              <div className="flex w-full items-center p-3">
                <div className="flex-grow">
                  <h2 className="font-gill-sans mb-1 text-base font-semibold sm:text-base">
                    {post.title}
                  </h2>
                  <p className="font-gill-sans mb-1 text-sm">
                    Created at{" "}
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </p>
                  <div className="font-gill-sans">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge badge-ghost ml-[-0.2rem] mr-1 bg-blue-100 bg-opacity-50 px-1.5 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="h-28 w-auto"
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
