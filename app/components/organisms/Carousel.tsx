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
    <div className="carousel carousel-vertical mt-8 w-full max-w-2xl">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div
            id={`item${index}`}
            key={item.id}
            className="carousel-item block h-full"
          >
            <div className="p-4">
              <h2 className="font-eb-garamond-black text-xl font-bold">
                {item.title}
              </h2>
              <p className="font-eb-garamond-light">{item.content}</p>
              <div className="font-eb-garamond-light mt-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="badge badge-primary mr-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="font-eb-garamond-light p-4">
          <p>No items found.</p>
        </div>
      )}
    </div>
  );
}
