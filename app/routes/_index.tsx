import { SEOHandle } from "@nasa-gcn/remix-seo";
import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { AsciiDonut } from "~/components/molecules/AsciiDonut";
import { Footer } from "~/components/organisms/Footer";

/**
 * Generate metadata for the route
 *
 * @returns An array of meta tag objects for the route
 */
export const meta: MetaFunction = () => {
  return [
    { title: "About" },
    { description: "Gleb Khaykin's personal website" },
    {
      property: "og:title",
      content: "About",
    },
    {
      property: "og:description",
      content: "Gleb Khaykin's personal website",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://khaykingleb.com",
    },
    {
      property: "og:image",
      content: "/avatar.webp",
    },
  ];
};

export const handle: SEOHandle = {
  /**
   * Asynchronously retrieve sitemap.xml entries for the route
   *
   * @returns The sitemap.xml entries for the route
   */
  getSitemapEntries: async () => {
    return [{ route: "/", priority: 1, changefreq: "monthly" }];
  },
};

/**
 * The main component for the route
 *
 * @returns The route layout
 */
export default function IndexRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <main className="z-5 mx-8 flex w-full flex-1 flex-col text-white sm:mx-32">
        <AsciiDonut />
        <div className="z-10 flex flex-1 flex-col justify-center">
          <div className="font-poppins mb-6 flex flex-col gap-4 font-black sm:gap-6">
            {["Hey!", "I'm Gleb Khaykin", "I build things"].map((text, i) => (
              <h1 key={i} className="text-4xl sm:text-6xl">
                {text}
              </h1>
            ))}
          </div>
          <div className="font-gill-sans flex flex-col gap-2 font-bold">
            <Link to="/blog" className="text-xl sm:text-2xl">
              ↗ Blog
            </Link>
            <Link
              to="/Gleb_Khaykin.pdf"
              prefetch="intent"
              target="_blank"
              className="text-xl sm:text-2xl"
            >
              ↗ CV
            </Link>
          </div>
        </div>
      </main>
      <Footer textColor="text-white" />
    </div>
  );
}
