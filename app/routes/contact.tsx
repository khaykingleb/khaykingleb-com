import { SEOHandle } from "@nasa-gcn/remix-seo";
import { MetaFunction } from "@remix-run/node";

import { Avatar } from "~/components/atoms/Avatar";
import { SocialMedia } from "~/components/molecules/SocialMedia";
import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";

export const handle: SEOHandle = {
  /**
   * Asynchronously retrieve sitemap.xml entries for the route
   *
   * @returns The sitemap.xml entries for the route
   */
  getSitemapEntries: async () => {
    return [{ route: "/contact", priority: 0.7, changefreq: "monthly" }];
  },
};

/**
 * Generate metadata for the route
 *
 * @returns The meta tags for the route
 */
export const meta: MetaFunction = () => {
  return [
    { title: "Contact" },
    { description: "Gleb Khaykin's contact information" },
    {
      property: "og:title",
      content: "Contact",
    },
    {
      property: "og:description",
      content: "Gleb Khaykin's contact information",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://khaykingleb.com/contact",
    },
    {
      property: "og:image",
      content: "avatar.webp",
    },
  ];
};

/**
 * The main component for the route
 *
 * @returns The route layout
 */
export default function ContactRoute() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[850px] flex-grow flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex flex-grow flex-col">
        <Header headerName="Contact" />
        <main className="flex flex-grow flex-col">
          <div className="mb-6 flex flex-col md:flex-row md:items-start">
            <div className="flex flex-col md:items-start">
              <div className="mb-6 flex justify-center md:hidden">
                <Avatar />
              </div>
              <h2 className="mb-1 text-2xl font-bold">About</h2>
              <div className="space-y-1 text-base">
                <ul className="list-disc space-x-0 space-y-1 pl-4">
                  <li>
                    Full-stack developer specializing in MLOps/DevOps
                    engineering
                  </li>
                  <li>
                    When I&apos;m not coding, you&apos;ll find me at the gym,
                    lifting weights
                  </li>
                  <li>
                    Studied Computer Science and Finance at the Higher School of
                    Economics (this dual background helps me understand both
                    business and technical aspects of the projects)
                  </li>
                </ul>
              </div>
              <h2 className="mb-2 mt-6 text-2xl font-bold">Links</h2>
              <div className="flex flex-col space-y-4">
                <SocialMedia size={24} displayLabels={true} />
              </div>
            </div>
            <div className="hidden flex-shrink-0 md:block">
              <Avatar />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
