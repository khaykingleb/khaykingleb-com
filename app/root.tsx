import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

import { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/remix";

import notionStylesheetUrl from "./styles/notion.css?url";
import tailwindStylesheetUrl from "./styles/tailwind.css?url";

export const meta: MetaFunction = () => {
  return [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { property: "og:title", content: "Gleb Khaykin" },
    { property: "og:description", content: "Personal website" },
    {
      name: "keywords",
      content:
        "Gleb Khaykin, Computer Science, Finance, Deep Learning, Machine Learning, MLOps",
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    // Preload styles for speed
    {
      rel: "preload",
      href: tailwindStylesheetUrl,
      as: "style",
    },
    {
      rel: "stylesheet",
      href: tailwindStylesheetUrl,
    },
    {
      rel: "stylesheet",
      href: notionStylesheetUrl,
    },

    // Favicons
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },

    // Prefetch PDF and images
    {
      rel: "prefetch",
      href: "/Gleb_Khaykin.pdf",
      as: "document",
    },
    {
      rel: "prefetch",
      as: "image",
      href: "/avatar.jpg",
    },
    {
      rel: "prefetch",
      as: "image",
      href: "/img/van_gogh_wheatfield_with_crows.jpg",
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Analytics />
        <SpeedInsights />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
