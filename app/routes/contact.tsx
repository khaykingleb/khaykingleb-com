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
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-grow flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex flex-grow flex-col">
        <Header headerName="Contact" />
        <main className="flex flex-grow flex-col">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col md:mr-2 md:items-start">
              <div className="flex justify-center md:hidden">
                <Avatar />
              </div>
              <h2 className="text-xl font-semibold sm:text-2xl">About</h2>
              <div className="space-y-1 text-base">
                <ul className="list-disc space-x-0 space-y-1 pl-4">
                  <li>
                    I&apos;m a full-stack developer with a focus on MLOps/DevOps
                    engineering — love building applications and architecting
                    systems
                  </li>
                  <li>
                    Studied{" "}
                    <a
                      href="https://cs.hse.ru/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Computer Science
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://economics.hse.ru/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Economics
                    </a>{" "}
                    at the{" "}
                    <a
                      href="https://www.hse.ru/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      National Research University &quot;Higher School of
                      Economics&quot;
                    </a>{" "}
                    — this dual background equips me with a comprehensive
                    understanding of both the business and technical aspects of
                    projects
                  </li>
                  <li>
                    Passed{" "}
                    <a
                      href="https://www.cfainstitute.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      CFA Level 1
                    </a>{" "}
                    in my third year of undergrad — I was very interested in
                    finance and might complete the remaining levels someday
                  </li>
                </ul>
              </div>
              <h2 className="mb-2 mt-4 text-xl font-semibold sm:text-2xl">
                Links
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
