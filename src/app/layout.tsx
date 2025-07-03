import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import "@/app/styles/global.css";
import "@/app/styles/notion.css";

import type { Metadata, Viewport } from "next";
import React from "react";

import { gillSans, poppins } from "@/app/fonts";
import { Providers } from "@/app/providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://khaykingleb.com"),
  title: "Gleb Khaykin",
  description: "Personal website and blog",
  authors: [{ name: "Gleb Khaykin" }],
  openGraph: {
    title: "Gleb Khaykin",
    description: "Personal website and blog",
    url: "https://khaykingleb.com",
    type: "website",
    images: ["/avatar.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

/**
 * Root layout component to define the HTML structure and apply global styles.
 *
 * @param children - The child components to be rendered within the layout.
 * @returns The root layout component.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${poppins.className}
        ${gillSans.className}
      `}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
