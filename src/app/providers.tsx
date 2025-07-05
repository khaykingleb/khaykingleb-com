"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import React from "react";

/**
 * Providers component to wrap the application with necessary context providers.
 *
 * @param children - The child components to be wrapped by the providers.
 * @returns The Providers component.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system">
      {children}
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
