import { defer, LoaderFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { NotionAPI } from "notion-client";
import React, { lazy, Suspense } from "react";
import {
  CodeProps,
  CollectionProps,
  EquationProps,
  ExtendedRecordMap,
  ModalProps,
  NotionRenderer,
  PdfProps,
} from "react-notion-x";

import { Footer } from "~/components/organisms/Footer";
import { Header } from "~/components/organisms/Header";

const Equation = lazy(() =>
  import("react-notion-x/build/third-party/equation").then((module) => ({
    default: module.Equation as React.ComponentType<EquationProps>,
  })),
);
const Modal = lazy(() =>
  import("react-notion-x/build/third-party/modal").then((module) => ({
    default: module.Modal as React.ComponentType<ModalProps>,
  })),
);
const Pdf = lazy(() =>
  import("react-notion-x/build/third-party/pdf").then((module) => ({
    default: module.Pdf as React.ComponentType<PdfProps>,
  })),
);
const Code = lazy(() =>
  import("react-notion-x/build/third-party/code").then((module) => ({
    default: module.Code as React.ComponentType<CodeProps>,
  })),
);
const Collection = lazy(() =>
  import("react-notion-x/build/third-party/collection").then((module) => ({
    default: module.Collection as React.ComponentType<CollectionProps>,
  })),
);

function NotionPage({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      disableHeader={true}
      components={{ Equation, Modal, Pdf, Code, Collection }}
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
      <div className="flex-grow">
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
      <Footer />
    </div>
  );
}
