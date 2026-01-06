"use client";

import dynamic from "next/dynamic";
import type { ExtendedRecordMap } from "notion-types";
import { useEffect } from "react";
import { NotionRenderer } from "react-notion-x";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    await Promise.all([
      // @ts-expect-error: language files don't ship with types
      import("prismjs/components/prism-python"),
      // @ts-expect-error: language files don't ship with types
      import("prismjs/components/prism-rust"),
      // @ts-expect-error: language files don't ship with types
      import("prismjs/components/prism-bash"),
      // @ts-expect-error: language files don't ship with types
      import("prismjs/components/prism-hcl"),
      // @ts-expect-error: language files don't ship with types
      import("prismjs/components/prism-yaml"),
    ]);
    return m.Code;
  }),
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
  { ssr: false },
);

/**
 * Rewrites Notion's block IDs to human-readable slugs in the DOM.
 * Also handles initial scroll to hash anchor on page load.
 *
 * @param headerSlugMap - Mapping from block IDs to header slugs.
 */
function useHeaderSlugRewrites(headerSlugMap: Record<string, string>) {
  useEffect(() => {
    for (const [blockId, slug] of Object.entries(headerSlugMap)) {
      const cleanId = blockId.replace(/-/g, "");

      // Update anchor element ID
      const anchor = document.getElementById(cleanId);
      if (anchor?.classList.contains("notion-header-anchor")) {
        anchor.id = slug;
      }

      // Update hash link href
      document
        .querySelector(`a.notion-hash-link[href="#${cleanId}"]`)
        ?.setAttribute("href", `#${slug}`);
    }

    // Update table of contents links
    for (const item of document.querySelectorAll(
      ".notion-table-of-contents-item",
    )) {
      const href = item.getAttribute("href");
      if (href?.startsWith("#")) {
        const slug = headerSlugMap[href.substring(1)];
        if (slug) item.setAttribute("href", `#${slug}`);
      }
    }

    // Scroll to anchor after DOM updates (for direct link navigation)
    const { hash } = window.location;
    if (hash) {
      setTimeout(() => {
        document
          .getElementById(hash.substring(1))
          ?.scrollIntoView({ behavior: "instant" });
      }, 50);
    }
  }, [headerSlugMap]);
}

/**
 * Renders Notion content with human-readable anchor slugs.
 *
 * @param recordMap - The Notion page record map.
 * @param headerSlugMap - Mapping from block IDs to header slugs.
 * @returns The rendered Notion content.
 */
export default function NotionRendererClient({
  recordMap,
  headerSlugMap,
}: {
  recordMap: ExtendedRecordMap;
  headerSlugMap: Record<string, string>;
}) {
  useHeaderSlugRewrites(headerSlugMap);

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage
      disableHeader
      components={{ Code, Collection, Equation, Pdf }}
      mapPageUrl={(pageId) => {
        const cleanId = pageId.replace(/-/g, "");
        return `#${headerSlugMap[pageId] ?? headerSlugMap[cleanId] ?? cleanId}`;
      }}
    />
  );
}
