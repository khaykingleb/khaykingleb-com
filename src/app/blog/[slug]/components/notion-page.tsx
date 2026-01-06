import { unstable_cache } from "next/cache";
import { NotionAPI } from "notion-client";
import type { ExtendedRecordMap } from "notion-types";
import { getPageTableOfContents } from "notion-utils";

import NotionRendererClient from "@/app/blog/[slug]/components/notion-renderer";

/**
 * Converts text to a URL-friendly slug.
 *
 * @param text - The text to convert.
 * @returns A URL-friendly slug.
 */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Fetches a Notion page using the provided page ID.
 *
 * @param pageId - The ID of the Notion page.
 * @returns The Notion page record map.
 */
async function fetchNotionPage(pageId: string): Promise<ExtendedRecordMap> {
  const notion = new NotionAPI({
    // Hotfix: https://github.com/NotionX/react-notion-x/issues/659
    // Thanks Notion for breaking changes :)
    kyOptions: {
      hooks: {
        beforeRequest: [
          (request, options) => {
            const url = request.url.toString();
            if (url.includes("/api/v3/syncRecordValues")) {
              return new Request(
                url.replace(
                  "/api/v3/syncRecordValues",
                  "/api/v3/syncRecordValuesMain",
                ),
                options,
              );
            }
            return request;
          },
        ],
      },
    },
  });
  return notion.getPage(pageId);
}

const getNotionPage = unstable_cache(fetchNotionPage, ["notionPage"], {
  revalidate: 60,
});

/**
 * Builds a mapping from block IDs to readable header slugs.
 *
 * @param recordMap - The Notion page record map.
 * @returns A mapping from block IDs (with and without dashes) to header slugs.
 */
function buildHeaderSlugMap(
  recordMap: ExtendedRecordMap,
): Record<string, string> {
  const pageId = Object.keys(recordMap.block)[0];
  const pageBlock = recordMap.block[pageId]?.value;

  if (!pageBlock || pageBlock.type !== "page") {
    return {};
  }

  const toc = getPageTableOfContents(pageBlock, recordMap);
  const mapping: Record<string, string> = {};

  for (const entry of toc) {
    if (entry.text) {
      const slug = slugify(entry.text);
      mapping[entry.id] = slug;
      mapping[entry.id.replace(/-/g, "")] = slug;
    }
  }

  return mapping;
}

/**
 * Renders a Notion page using the provided page ID.
 *
 * @param page_id - The ID of the Notion page to render.
 * @returns The rendered Notion page component.
 */
export default async function NotionPage({ page_id }: { page_id: string }) {
  const recordMap = await getNotionPage(page_id);

  return (
    <NotionRendererClient
      recordMap={recordMap}
      headerSlugMap={buildHeaderSlugMap(recordMap)}
    />
  );
}
