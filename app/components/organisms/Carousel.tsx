import { Link } from "@remix-run/react";

interface CarouselItem {
  id: number;
  title: string;
  content: string;
  slug: string;
  tags: string[];
  notionPageId: string;
}

export const Carousel = ({ items }: { items: CarouselItem[] }) => {
  return (
    <div className="mb-2 mt-2 w-full max-w-2xl">
      {items.length > 0 ? (
        <div className="carousel carousel-vertical h-full w-full">
          {items.map((item) => (
            <Link
              to={`/blog/${item.slug}`}
              key={item.id}
              className="carousel-item block w-full cursor-pointer transition-all duration-300 hover:bg-gray-100"
            >
              <div className="w-full p-3">
                <h2 className="font-eb-garamond-black mb-1 text-lg font-bold">
                  {item.title}
                </h2>
                <p className="font-eb-garamond-light mb-2 text-sm">
                  {item.content}
                </p>
                <div className="font-eb-garamond-light">
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
          <p className="font-eb-garamond-bold text-xl">No posts found</p>
        </div>
      )}
    </div>
  );
};
