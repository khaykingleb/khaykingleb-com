import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

import type { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/remix";

import { Background } from "~/components/molecules/Background";
import { Footer } from "~/components/organisms/Footer";

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
    // TODO: move to webp
    {
      rel: "preload",
      as: "image",
      href: "/img/van_gogh_wheatfield_with_crows.jpg",
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
        <Background backgroundImageUrl="/img/van_gogh_wheatfield_with_crows.jpg" />
        <main className="font-gill-sans z-10 flex flex-grow flex-col items-center justify-center text-center text-white">
          {isRouteErrorResponse(error) && error.status === 404 ? (
            <h2 className="mb-4 text-4xl font-bold">Page doesn&apos;t exist</h2>
          ) : (
            <>
              <h1 className="mb-2 text-4xl font-bold">Something went wrong!</h1>
              <h2 className="text-2xl font-semibold">
                Please try again later or contact me if the issue persists
              </h2>
            </>
          )}
          <button
            onClick={() => window.history.back()}
            className="btn btn-ghost text-xl text-white hover:bg-white/20"
          >
            Go Back
          </button>
        </main>
        <Footer textColor="text-white" />
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
