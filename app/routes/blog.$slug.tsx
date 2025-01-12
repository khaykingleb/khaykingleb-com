import { SEOHandle } from "@nasa-gcn/remix-seo";
import {
  defer,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Await,
  ClientLoaderFunction,
  ClientLoaderFunctionArgs,
  Link,
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
import { Tables } from "~/integrations/supabase/database.types";
import { getPostImageUrl } from "~/utils/supabase";
import { useTheme } from "~/utils/theme";

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
  const { theme } = useTheme();

  return (
    // @ts-expect-error: NotionRenderer is a React component
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={theme === "dark"}
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

/**
 * Loader function for the route.
 *
 * @param params - The parameters object
 * @returns The loader data
 */
export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const { data, error } = await supabaseClient
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .returns<Tables<"posts">[]>()
    .single();

  if (error) throw new Response("Failed to load post", { status: 500 });
  if (!data) throw new Response("Post not found", { status: 404 });
  data.image_url = getPostImageUrl(supabaseClient, data.image_url);

  const notion = new NotionAPI();
  const recordMapPromise = notion.getPage(data.notion_page_id);

  return defer({ post: data, recordMap: recordMapPromise });
};

const CACHE_KEY = "blogPosts";
const CACHE_TIMESTAMP_KEY = "blogPostsTimestamp";
const CACHE_DURATION = 60 * 60 * 1000;

export const clientLoader: ClientLoaderFunction = async ({
  params,
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  const cachedData = localStorage.getItem(`${CACHE_KEY}-${params.slug}`);
  const cachedTimestamp = localStorage.getItem(
    `${CACHE_TIMESTAMP_KEY}-${params.slug}`,
  );
  if (cachedData && cachedTimestamp) {
    if (Date.now() - Number(cachedTimestamp) < CACHE_DURATION) {
      const parsedData: {
        post: Tables<"posts">;
        recordMap: Promise<ExtendedRecordMap>;
      } = JSON.parse(cachedData);
      return {
        post: parsedData.post,
        recordMap: Promise.resolve(parsedData.recordMap),
      };
    }
  }

  const serverData = (await serverLoader()) as {
    post: Tables<"posts">;
    recordMap: Promise<ExtendedRecordMap>;
  };
  Promise.resolve(serverData.recordMap).then((recordMap) => {
    localStorage.setItem(
      `${CACHE_KEY}-${params.slug}`,
      JSON.stringify({
        post: serverData.post,
        recordMap,
      }),
    );
    localStorage.setItem(
      `${CACHE_TIMESTAMP_KEY}-${params.slug}`,
      Date.now().toString(),
    );
  });

  return serverData;
};
// Tell Remix to use the client loader during hydration
clientLoader.hydrate = true;

export const handle: SEOHandle = {
  /**
   * Asynchronously retrieve sitemap.xml entries for the route
   *
   * @returns The sitemap.xml entries for the route
   */
  getSitemapEntries: async () => {
    const supabaseClient = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
    const { data: posts } = await supabaseClient
      .from("posts")
      .select("slug")
      .returns<Tables<"posts">[]>();

    return (posts || []).map((post) => ({
      route: `/blog/${post.slug}`,
      priority: 0.7,
      changefreq: "monthly",
    }));
  },
};

/**
 * Generate metadata for the route
 *
 * @param post - The post object
 * @returns The meta tags
 */
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "Blog Post Not Found" },
      { description: "The requested blog post could not be found." },
    ];
  }

  const createdDate = new Date(data.post.created_at);
  const formattedDate = createdDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return [
    { title: data.post.title },
    { description: `Published on ${formattedDate}` },
    {
      property: "og:title",
      content: data.post.title,
    },
    {
      property: "og:description",
      content: `Published on ${formattedDate}`,
    },
    {
      property: "og:type",
      content: "article",
    },
    {
      property: "og:url",
      content: `https://khaykingleb.com/blog/${data.post.slug}`,
    },
    {
      property: "og:image",
      content:
        data.post.image_url || "/img/van_gogh_wheatfield_with_crows.webp",
    },
    {
      property: "article:published_time",
      content: data.post.created_at,
    },
    {
      property: "article:tag",
      content: Array.isArray(data.post.tags) ? data.post.tags.join(", ") : "",
    },
  ];
};

/**
 * The main component for the route
 *
 * @returns The route layout
 */
export default function BlogPostRoute() {
  const { post, recordMap } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[850px] flex-col px-4 sm:px-6 lg:px-8">
      <header className="mt-4">
        <div className="flex items-center gap-2 text-3xl font-semibold sm:text-4xl">
          <Link to="/blog">&lt;</Link>
          <h1>{post.title}</h1>
        </div>
        <div className="mt-4 h-px w-full bg-gray-200" />
      </header>
      <main className="flex flex-grow flex-col">
        <Suspense
          fallback={
            <div className="mb-2 mt-4 flex-grow animate-pulse rounded-lg bg-gray-200" />
          }
        >
          <h2 className="font-gill-sans ml-4 mt-6 text-[1.75rem] font-semibold">
            Table of Contents
          </h2>
          <Await resolve={recordMap}>
            {(resolvedRecordMap: ExtendedRecordMap) => (
              <NotionPage recordMap={resolvedRecordMap} />
            )}
          </Await>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
