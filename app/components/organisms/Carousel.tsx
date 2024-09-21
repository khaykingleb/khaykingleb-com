interface CarouselItem {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

export default function Carousel({ items }: { items: CarouselItem[] }) {
  return (
    <div className="mt-4 w-full max-w-2xl">
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
                  <span
                    key={tag}
                    className="badge badge-ghost mr-1 bg-blue-100 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
