import { Link } from "@remix-run/react";

import { Post } from "~/data/posts";

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
              <div className="w-full p-3">
                <h2 className="font-gill-sans-semibold mb-1 text-lg">
                  {item.title}
                </h2>
                <p className="font-gill-sans-regular mb-2 text-sm">
                  Created at {item.publishDate.replace(/-/g, "/")}
                </p>
                <div className="font-gill-sans-regular">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge badge-ghost mr-1 bg-blue-100 bg-opacity-50 px-1.5 py-0.5 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="pt-52 text-center">
          <p className="font-gill-sans-bold text-xl">No posts found</p>
        </div>
      )}
    </div>
  );
};
