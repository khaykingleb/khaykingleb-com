import { generateSitemap } from "@nasa-gcn/remix-seo";
import type { LoaderFunctionArgs } from "@remix-run/node";
// @ts-expect-error Virtual modules are not recognized by TypeScript
// https://github.com/nasa-gcn/remix-seo/issues/7
// eslint-disable-next-line import/no-unresolved
import { routes } from "virtual:remix/server-build";

export function loader({ request }: LoaderFunctionArgs) {
  return generateSitemap(request, routes, {
    siteUrl: "https://khaykingleb.com",
  });
}
