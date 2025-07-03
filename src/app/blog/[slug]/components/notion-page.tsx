import { unstable_cache } from "next/cache";
import { NotionAPI } from "notion-client";

import NotionRendererClient from "@/app/blog/[slug]/components/notion-renderer"; // ← direct import

async function fetchNotionPage(page_id: string) {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(page_id);
  return recordMap;
}

const getNotionPage = unstable_cache(fetchNotionPage, ["notionPage"], {
  revalidate: 60,
});

export default async function NotionPage({ page_id }: { page_id: string }) {
  const recordMap = await getNotionPage(page_id);
  return <NotionRendererClient recordMap={recordMap} />;
}
