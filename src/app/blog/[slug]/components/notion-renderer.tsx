"use client";

import dynamic from "next/dynamic";
import type { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code),
);

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection,
  ),
);

const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
);

const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  },
);

/**
 * Renders the Notion content using the NotionRenderer component.
 *
 * @param recordMap - The record map containing the Notion data.
 * @returns The rendered Notion content.
 */
export default function NotionRendererClient({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      disableHeader={true}
      components={{ Code, Collection, Equation, Pdf }}
    />
  );
}
