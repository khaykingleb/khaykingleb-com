import { unstable_cache } from "next/cache";
import { NotionAPI } from "notion-client";
import type { ExtendedRecordMap } from "notion-types";

import NotionRendererClient from "@/app/blog/[slug]/components/notion-renderer"; // ← direct import

/**
 * Fetches a Notion page using the provided page ID.
 *
 * @param page_id - The ID of the Notion page to fetch.
 * @returns The record map of the Notion page.
 */
async function fetchNotionPage(page_id: string): Promise<ExtendedRecordMap> {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(page_id);
  return recordMap;
}

const getNotionPage = unstable_cache(fetchNotionPage, ["notionPage"], {
  revalidate: 60,
});

/**
 * Renders a Notion page using the provided page ID.
 *
 * @param page_id - The ID of the Notion page to render.
 * @returns The rendered Notion page component.
 */
export default async function NotionPage({ page_id }: { page_id: string }) {
  const recordMap = await getNotionPage(page_id);
  return <NotionRendererClient recordMap={recordMap} />;
}
