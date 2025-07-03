import type { MetadataRoute } from "next";

// TODO: Add blog posts and other pages

// // TODO: Replace this with your real data source once the blog is wired up
// async function getBlogPosts() {
//   // Example: Fetch posts from Supabase, file system, or CMS
//   // return [{ slug: "my-post", updatedAt: "2024-01-01" }];
//   return [] as Array<{ slug: string; updatedAt?: string | Date }>;
// }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://khaykingleb.com";
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.9,
    // },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  //   const posts = await getBlogPosts();
  //   const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
  //     url: `${baseUrl}/blog/${post.slug}`,
  //     lastModified: post.updatedAt ?? new Date(),
  //     changeFrequency: "weekly",
  //     priority: 0.9,
  //   }));

  return Promise.resolve(staticRoutes);

  //   return [...staticRoutes, ...postRoutes];
}
