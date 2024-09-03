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

import tailwindStylesheetUrl from "./styles/tailwind.css?url";

export const meta: MetaFunction = () => {
  return [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "Gleb Khaykin" },
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
    {
      rel: "stylesheet",
      href: tailwindStylesheetUrl,
    },

    // Prefetch an image into the browser cache
    {
      rel: "prefetch",
      as: "image",
      href: "/avatar.jpg",
    },
    {
      rel: "prefetch",
      as: "image",
      href: "/img/van_gogh_wheatfield_with_cypresses.jpg",
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
