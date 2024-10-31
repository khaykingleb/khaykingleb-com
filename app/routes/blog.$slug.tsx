import { SEOHandle } from "@nasa-gcn/remix-seo";
import {
  defer,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { NotionAPI } from "notion-client";
import React, { lazy, Suspense } from "react";
import { ClientOnly } from "remix-utils/client-only";
import {
  CodeBlock,
  CollectionViewBlock,
  EquationBlock,
  PdfBlock,
} from "vendor/react-notion-x/packages/notion-types/src/block";
import { ExtendedRecordMap } from "vendor/react-notion-x/packages/notion-types/src/maps";
import { NotionRenderer } from "vendor/react-notion-x/packages/react-notion-x";

import { LoadingSpinner } from "~/components/atoms/LoadingSpinner";
import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";
import { Post, posts } from "~/data/posts";

const Equation = lazy(() =>
  import("react-notion-x/build/third-party/equation").then((module) => ({
    default: module.Equation as React.ComponentType<{
      block: EquationBlock;
      math?: string;
      inline?: boolean;
    }>,
  })),
);
const Pdf = lazy(() =>
  import("react-notion-x/build/third-party/pdf").then((module) => ({
    default: (props: { block: PdfBlock }) => {
      const PdfComponent = module.Pdf as React.ComponentType<{ file: string }>;
      return <PdfComponent file={props.block.properties?.source?.[0]?.[0]} />;
    },
  })),
);
const Code = lazy(() =>
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
const Collection = lazy(() =>
  import("react-notion-x/build/third-party/collection").then((module) => ({
    default: module.Collection as React.ComponentType<{
      block: CollectionViewBlock;
    }>,
  })),
);

const NotionPage = React.memo(
  ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
    return (
      // @ts-expect-error: Expect missing type declarations for NotionRenderer
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
  },
);
NotionPage.displayName = "NotionPage";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const slug = params.slug;
  if (!slug) {
    throw new Response("Slug is required", { status: 400 });
  }
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  const notion = new NotionAPI();
  const recordMapPromise = notion.getPage(post.notionPageId);

  return defer({ post, recordMap: recordMapPromise });
};

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    return posts.map((post) => ({
      route: `/blog/${post.slug}`,
      priority: 0.7,
      changefreq: "monthly",
    }));
  },
};

// @ts-expect-error: Expect not assignable type (otherwise, it would be a server timeout)
export const meta: MetaFunction = ({ data }: { data: { post: Post } }) => {
  const { post } = data;
  const description = `Created at ${post.publishDate.replace(/-/g, "/")}`;

  return [
    { charset: "utf-8" },
    { name: "author", content: "Gleb Khaykin" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      property: "og:image",
      content: post.imageUrl || "/img/van_gogh_wheatfield_with_crows.jpg",
    },
    { property: "og:title", content: post.title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: post.publishDate },
    {
      property: "og:url",
      content: `https://khaykingleb.com/blog/${post.slug}`,
    },
  ];
};

export default function BlogPostRoute() {
  const { recordMap } = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen flex-col">
      <Header backgroundImage="/img/van_gogh_wheatfield_with_crows.jpg" />
      <main className="flex-grow px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[750px] flex-col">
          <Suspense fallback={<LoadingSpinner />}>
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
