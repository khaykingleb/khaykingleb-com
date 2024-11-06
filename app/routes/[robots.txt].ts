import { generateRobotsTxt } from "@nasa-gcn/remix-seo";

/**
 * Loader function for generating the robots.txt file for the website.
 *
 * @returns The generated robots.txt content.
 */
export function loader() {
  return generateRobotsTxt([
    { type: "sitemap", value: "https://khaykingleb.com/sitemap.xml" },
  ]);
}
