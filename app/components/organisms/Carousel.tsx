import { Link } from "@remix-run/react";

import { Post } from "~/data/posts";

/**
 * Carousel component to display a list of posts.
 *
 * @param items - Array of post items to display.
 * @returns Carousel component
 */
export const Carousel = ({ items }: { items: Post[] }) => {
  return (
    <div className="mb-2 mt-2">
      {items.length > 0 ? (
        <div className="carousel carousel-vertical h-full w-full">
          {items.map((item) => (
            <Link
              to={`/blog/${item.slug}`}
              key={item.id}
              className="carousel-item block w-full cursor-pointer transition-all duration-300 hover:bg-gray-100"
            >
              <div className="flex w-full p-2">
                <div className="flex-grow">
                  <h2 className="font-gill-sans-semibold mb-2 text-sm sm:text-base">
                    {item.title}
                  </h2>
                  <p className="font-gill-sans-regular mb-2 text-xs">
                    Created at {item.publishDate.replace(/-/g, "/")}
                  </p>
                  <div className="font-gill-sans-regular">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge badge-ghost mr-1 bg-blue-100 bg-opacity-50 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-20 w-auto"
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="pt-40 text-center">
          <p className="font-gill-sans-bold text-lg">No posts found</p>
        </div>
      )}
    </div>
  );
};
