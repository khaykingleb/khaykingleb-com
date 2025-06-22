import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

import type { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights as SpeedInsightsOriginal } from "@vercel/speed-insights/remix";
import type { ElementType } from "react";
import { FaHome as FaHomeOriginal } from "react-icons/fa";

import { Footer } from "~/components/organisms/Footer";

const FaHome = FaHomeOriginal as ElementType;
const SpeedInsights = SpeedInsightsOriginal as ElementType;

import notionStylesheetUrl from "./styles/notion.css?url";
import tailwindStylesheetUrl from "./styles/tailwind.css?url";

/**
 * Generate link tags for the application
 *
 * @returns An array of link tag objects
 */
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

    // Favicons and manifest
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

    // Images
    {
      rel: "preload",
      as: "image",
      href: "/img/van_gogh_wheatfield_with_crows.webp",
    },
  ];
};

/**
 * The error boundary component for handling errors in the application
 *
 * @remarks Acts as a catch-all for errors that occur during rendering. It provides
 * a fallback UI to display when an error is caught, preventing the entire
 * application from crashing.
 *
 * @returns The error boundary component
 */
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Gleb Khaykin" />
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col">
        <main className="flex flex-grow flex-col items-center justify-center px-4 text-center">
          {isRouteErrorResponse(error) && error.status === 404 ? (
            <>
              <h2 className="font-poppins text-4xl font-black">
                Page doesn&apos;t exist
              </h2>
            </>
          ) : (
            <>
              <h1 className="font-poppins mb-2 text-4xl font-black">
                Something went wrong!
              </h1>
              <h2 className="text-base">
                If the issue continues, please try again later or reach out to
                me
              </h2>
            </>
          )}
          <Link
            to="/"
            className="btn btn-ghost z-50 mt-2 flex items-center gap-x-2 text-xl font-bold transition-all md:hover:scale-105 md:hover:bg-white/10"
          >
            <FaHome /> Go Home
          </Link>
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * The main application component that renders the entire application
 *
 * @returns The rendered application component
 */
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Gleb Khaykin" />
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
