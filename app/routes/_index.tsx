import { SEOHandle } from "@nasa-gcn/remix-seo";
import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { GoArrowUpRight } from "react-icons/go";

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
    <div className="flex min-h-screen flex-col">
      <main className="mx-8 flex w-full flex-1 flex-col sm:mx-60">
        <AsciiDonut />
        <div className="z-10 flex flex-1 flex-col justify-center">
          <div className="font-poppins mb-6 flex flex-col gap-4 font-black sm:gap-6">
            {["Hey", "I'm Gleb Khaykin", "I build things"].map((text, i) => (
              <h1 key={i} className="text-4xl sm:text-6xl">
                {text}
              </h1>
            ))}
          </div>
          <div className="flex flex-col gap-2 font-bold">
            <Link
              to="/Gleb_Khaykin.pdf"
              prefetch="intent"
              target="_blank"
              className="inline-flex items-center gap-1 text-xl sm:text-2xl"
            >
              <GoArrowUpRight className="h-6 w-6" /> CV
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-xl sm:text-2xl"
            >
              <GoArrowUpRight className="h-6 w-6" /> Blog
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 text-xl sm:text-2xl"
            >
              <GoArrowUpRight className="h-6 w-6" /> Contact
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
