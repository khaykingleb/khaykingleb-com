import { SEOHandle } from "@nasa-gcn/remix-seo";
import {
  defer,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Await,
  ClientLoaderFunctionArgs,
  useLoaderData,
} from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { NotionAPI } from "notion-client";
import React, { Suspense } from "react";
import { ClientOnly } from "remix-utils/client-only";
import {
  CodeBlock,
  CollectionViewBlock,
  EquationBlock,
  PdfBlock,
} from "vendor/react-notion-x/packages/notion-types/src/block";
import { ExtendedRecordMap } from "vendor/react-notion-x/packages/notion-types/src/maps";
import { NotionRenderer } from "vendor/react-notion-x/packages/react-notion-x";

import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";
import { Tables } from "~/integrations/supabase/database.types";

const Equation = React.lazy(() =>
  import("react-notion-x/build/third-party/equation").then((module) => ({
    default: module.Equation as React.ComponentType<{
      block: EquationBlock;
      math?: string;
      inline?: boolean;
    }>,
  })),
);

const Pdf = React.lazy(() =>
  import("react-notion-x/build/third-party/pdf").then((module) => ({
    default: (props: { block: PdfBlock }) => {
      const PdfComponent = module.Pdf as React.ComponentType<{ file: string }>;
      return <PdfComponent file={props.block.properties?.source?.[0]?.[0]} />;
    },
  })),
);

const Code = React.lazy(() =>
  import("react-notion-x/build/third-party/code").then(async (module) => {
    await Promise.all([
      // @ts-expect-error: Expect missing type declarations for prism components
      import("prismjs/components/prism-python"),
      // @ts-expect-error: Expect missing type declarations for prism components
      import("prismjs/components/prism-rust"),
      // @ts-expect-error: Expect missing type declarations for prism components
      import("prismjs/components/prism-bash"),
    ]);
    return {
      default: module.Code as React.ComponentType<{
        block: CodeBlock;
      }>,
    };
  }),
);

const Collection = React.lazy(() =>
  import("react-notion-x/build/third-party/collection").then((module) => ({
    default: module.Collection as React.ComponentType<{
      block: CollectionViewBlock;
    }>,
  })),
);

const NotionPage = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  return (
    // @ts-expect-error: NotionRenderer is a React component
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      disableHeader={true}
      components={{
        Pdf,
        Collection,
        Equation: (props: React.ComponentProps<typeof Equation>) => (
          <ClientOnly fallback={<div>Loading equation...</div>}>
            {() => <Equation {...props} />}
          </ClientOnly>
        ),
        Code: (props: React.ComponentProps<typeof Code>) => (
          <ClientOnly fallback={<div>Loading code...</div>}>
            {() => <Code {...props} />}
          </ClientOnly>
        ),
      }}
    />
  );
};

// TODO: use cache to avoid re-fetching posts on every page load
/**
 * Loader function for the route.
 *
 * @param params - The parameters object
 * @returns The loader data
 */
export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const slug = params.slug;
  if (!slug) {
    throw new Response("Slug is required", { status: 400 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const postPromise = supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .returns<Tables<"posts">[]>()
    .single()
    .then(({ data, error }) => {
      if (error) throw new Response("Failed to load post", { status: 500 });
      return data;
    });

  const notion = new NotionAPI();
  const recordMapPromise = postPromise.then((post) =>
    notion.getPage(post.notion_page_id),
  );

  return defer({ post: postPromise, recordMap: recordMapPromise });
};

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds

export const clientLoader = async ({
  params,
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  const cachedData = sessionStorage.getItem(`blogPosts-${params.slug}`);
  const cachedTimestamp = sessionStorage.getItem(
    `blogPostsTimestamp-${params.slug}`,
  );

  // Use cached data if it's valid
  if (cachedData && cachedTimestamp) {
    const isExpired = Date.now() - Number(cachedTimestamp) > CACHE_DURATION;
    const parsedData = JSON.parse(cachedData);
    if (!isExpired && parsedData.post && parsedData.recordMap) {
      return {
        post: Promise.resolve(parsedData.post),
        recordMap: Promise.resolve(parsedData.recordMap),
      };
    }
  }

  // Get fresh data from server
  const serverData = (await serverLoader()) as {
    post: Promise<Tables<"posts">>;
    recordMap: Promise<ExtendedRecordMap>;
  };

  // Cache the data after it resolves
  Promise.all([serverData.post, serverData.recordMap]).then(
    ([post, recordMap]) => {
      sessionStorage.setItem(
        `blogPosts-${params.slug}`,
        JSON.stringify({ post, recordMap }),
      );
      sessionStorage.setItem(
        `blogPostsTimestamp-${params.slug}`,
        Date.now().toString(),
      );
      console.log("Cached fresh data");
    },
  );

  return serverData;
};
// Tell Remix to use the client loader during hydration
clientLoader.hydrate = true;

// export const handle: SEOHandle = {
//   /**
//    * Asynchronously retrieve sitemap.xml entries for the route
//    *
//    * @returns The sitemap.xml entries for the route
//    */
//   getSitemapEntries: async () => {
//     const supabase = createClient(
//       process.env.SUPABASE_URL!,
//       process.env.SUPABASE_SERVICE_ROLE_KEY!,
//     );
//     const { data: posts } = await supabase
//       .from("posts")
//       .select("slug")
//       .returns<Tables<"posts">[]>();

//     return (posts || []).map((post) => ({
//       route: `/blog/${post.slug}`,
//       priority: 0.7,
//       changefreq: "monthly",
//     }));
//   },
// };

// /**
//  * Generate metadata for the route
//  *
//  * @param post - The post object
//  * @returns The meta tags
//  */
// export const meta: MetaFunction<typeof loader> = ({ data }) => {
//   // If no data at all
//   if (!data) {
//     return [
//       { title: "Post not found" },
//       { description: "The requested blog post could not be found" }
//     ];
//   }

//   // If post is a promise (still loading)
//   if (data.post instanceof Promise) {
//     return [
//       { title: "Loading..." },
//       { description: "Loading blog post..." }
//     ];
//   }

//   // Format the date in a more readable way
//   const createdDate = new Date(data.post.created_at);
//   const formattedDate = createdDate.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   return [
//     { title: data.post.title },
//     { description: `Published on ${formattedDate}` },
//     { charset: "utf-8" },
//     {
//       name: "viewport",
//       content: "width=device-width, initial-scale=1",
//     },
//     {
//       name: "author",
//       content: "Gleb Khaykin",
//     },
//     {
//       property: "og:title",
//       content: data.post.title,
//     },
//     {
//       property: "og:description",
//       content: `Published on ${formattedDate}`,
//     },
//     {
//       property: "og:type",
//       content: "article",
//     },
//     {
//       property: "og:url",
//       content: `https://khaykingleb.com/blog/${data.post.slug}`,
//     },
//     {
//       property: "og:image",
//       content: data.post.image_url || "/img/van_gogh_wheatfield_with_crows.webp",
//     },
//     {
//       property: "article:published_time",
//       content: data.post.created_at,
//     },
//     {
//       property: "article:modified_time",
//       content: data.post.updated_at || data.post.created_at,
//     },
//     {
//       property: "article:tag",
//       content: Array.isArray(data.post.tags) ? data.post.tags.join(", ") : "",
//     },
//   ];
// };

/**
 * The main component for the route
 *
 * @returns The route layout
 */
export default function BlogPostRoute() {
  const { recordMap } = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen flex-col">
      <Header backgroundImageUrl="/img/van_gogh_wheatfield_with_crows.webp" />
      <main className="flex flex-grow px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[750px] flex-col">
          <Suspense
            fallback={
              <div className="mb-2 mt-4 w-full flex-grow animate-pulse rounded-lg bg-gray-200" />
            }
          >
            <Await resolve={recordMap}>
              {(resolvedRecordMap: ExtendedRecordMap) => {
                return <NotionPage recordMap={resolvedRecordMap} />;
              }}
            </Await>
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
