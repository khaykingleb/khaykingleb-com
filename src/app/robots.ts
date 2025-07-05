import type { MetadataRoute } from "next";

/**
 * Robots component.
 *
 * @returns The robots component.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://khaykingleb.com/sitemap.xml",
  };
}
