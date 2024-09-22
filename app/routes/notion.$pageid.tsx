import { defer, LoaderFunction } from "@remix-run/node";
import {
  Await,
  ClientLoaderFunctionArgs,
  useLoaderData,
} from "@remix-run/react";
import { NotionAPI } from "notion-client";
import React, { lazy, Suspense, useEffect } from "react";
import { NotionRenderer } from "react-notion-x";
import { ClientOnly } from "remix-utils/client-only";
import { ExtendedRecordMap } from "vendor/react-notion-x/packages/notion-types/src/maps";

import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";

const Equation = lazy(() =>
  import("react-notion-x/build/third-party/equation").then((module) => ({
    default: module.Equation,
  })),
);
const Modal = lazy(() =>
  import("react-notion-x/build/third-party/modal").then((module) => ({
    default: module.Modal,
  })),
);
const Pdf = lazy(() =>
  import("react-notion-x/build/third-party/pdf").then((module) => ({
    default: module.Pdf,
  })),
);
const Code = lazy(() =>
  import("react-notion-x/build/third-party/code").then(async (module) => {
    await Promise.all([
      import("prismjs/components/prism-python"),
      import("prismjs/components/prism-rust"),
      import("prismjs/components/prism-bash"),
    ]);
    return { default: module.Code };
  }),
);
const Collection = lazy(() =>
  import("react-notion-x/build/third-party/collection").then((module) => ({
    default: module.Collection,
  })),
);

function NotionPage({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      disableHeader={true}
      components={{
        Modal,
        Pdf,
        Collection,
        Equation: (props) => (
          <ClientOnly fallback={<div>Loading equation...</div>}>
            {() => <Equation {...props} />}
          </ClientOnly>
        ),
        Code: (props) => (
          <ClientOnly fallback={<div>Loading code...</div>}>
            {() => <Code {...props} />}
          </ClientOnly>
        ),
      }}
    />
  );
}

export const loader: LoaderFunction = async ({ params }) => {
  const notion = new NotionAPI();
  const pageId = params.pageid ?? "";
  if (!pageId) {
    throw new Error("Page ID is required");
  }
  const recordMapPromise = notion.getPage(pageId);
  return defer({ recordMap: recordMapPromise });
};

// export const clientLoader = async ({
//   serverLoader,
// }: ClientLoaderFunctionArgs) => {
//   const cacheKey = `notion-page-da3f7c0bec29407ba43b9ab606b54876`;
//   const cacheTTL = 60 * 60 * 1000; // 1 hour in milliseconds
//   const currentTime = Date.now();

//   const cache = localStorage.getItem(cacheKey);
//   if (cache) {
//     const { timestamp, recordMap } = JSON.parse(cache);
//     if (currentTime - timestamp < cacheTTL) {
//       return { recordMap };
//     }
//   }

//   // Fetch data from server if cache is expired or doesn't exist
//   const serverLoaderResult = await serverLoader();
//   const recordMap = await (
//     serverLoaderResult as { recordMap: ExtendedRecordMap }
//   ).recordMap;
//   localStorage.setItem(
//     cacheKey,
//     JSON.stringify({ timestamp: currentTime, recordMap }),
//   );
//   return { recordMap };
// };
// clientLoader.hydrate = true;

export default function NotionRoute() {
  const { recordMap } = useLoaderData<typeof loader>();
  return (
    <div className="flex min-h-screen flex-col">
      <Header backgroundImage="/img/van_gogh_wheatfield_with_cypresses.jpg" />
      <main className="flex-grow px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem-6rem)] max-w-[700px] flex-col">
          <Suspense
            fallback={
              <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                <div className="loading loading-infinity loading-md"></div>
              </div>
            }
          >
            <Await resolve={recordMap}>
              {(resolvedRecordMap: ExtendedRecordMap) => (
                <NotionPage recordMap={resolvedRecordMap} />
              )}
            </Await>
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
