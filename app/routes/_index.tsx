import { SEOHandle } from "@nasa-gcn/remix-seo";
import { MetaFunction } from "@remix-run/node";

import { Avatar } from "~/components/atoms/Avatar";
import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";

/**
 * Generate metadata for the route
 *
 * @returns An array of meta tag objects for the route
 */
export const meta: MetaFunction = () => {
  return [
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
      <Header backgroundImageUrl="/img/van_gogh_wheatfield_with_crows.webp" />
      <div className="avatar mb-6 mt-6 flex items-center justify-center">
        <Avatar />
      </div>
      <div className="flex-grow">
        <div className="font-gill-sans mx-auto max-w-[550px] px-4 text-center text-sm sm:text-base">
          <p className="mb-3">
            Hi there! I&apos;m Gleb, a full-stack developer specializing in
            DevOps and MLOps engineering. My background includes distributed
            systems, speech processing, speech synthesis, natural language
            processing, and finance. When I&apos;m not coding, you&apos;ll
            likely find me at the gym, lifting weights.
          </p>
          <p className="mb-3">
            I&apos;ve graduated summa cum laude from the Higher School of
            Economics, where I studied both Computer Science and Finance. This
            dual background helps me understand both the technical and business
            aspects of projects.
          </p>
          <p className="mb-3">
            On this site, you&apos;ll find a collection of resources that
            I&apos;ve found valuable. Feel free to explore, and I hope you
            discover some useful tools and materials for yourself! For more of
            my thoughts and freestyle content, check out my{" "}
            <a
              href="https://t.me/khaykingleb_blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Telegram channel
            </a>{" "}
            (in Russian) and{" "}
            <a
              href="https://x.com/khaykingleb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              X profile
            </a>{" "}
            (in English).
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
