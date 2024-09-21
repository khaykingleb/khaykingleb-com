interface CarouselItem {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

interface CarouselProps {
  items: CarouselItem[];
}

export default function Carousel({ items }: CarouselProps) {
  return (
    <div className="flex h-full min-h-[50vh] w-full max-w-2xl items-center justify-center">
      {items.length > 0 ? (
        <div className="carousel carousel-vertical h-full w-full">
          {items.map((item, index) => (
            <div
              id={`item${index}`}
              key={item.id}
              className="carousel-item block h-full"
            >
              <div className="p-2">
                <h2 className="font-eb-garamond-black text-xl font-bold">
                  {item.title}
                </h2>
                <p className="font-eb-garamond-light">{item.content}</p>
                <div className="font-eb-garamond-light mt-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="badge badge-primary mr-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-20 text-center">
          <p className="font-eb-garamond-light font-bold">No posts found</p>
        </div>
      )}
    </div>
  );
}
