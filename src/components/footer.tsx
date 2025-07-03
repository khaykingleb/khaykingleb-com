"use client";

import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  if (resolvedTheme === "dark") {
    return (
      <MdLightMode
        className="h-6 w-6 md:hover:scale-110 md:hover:opacity-80"
        onClick={() => setTheme("light")}
      />
    );
  }
  return (
    <MdDarkMode
      className="h-6 w-6 md:hover:scale-110 md:hover:opacity-80"
      onClick={() => setTheme("dark")}
    />
  );
}

/**
 * Copyright component
 *
 * @returns Copyright component
 */
const Copyright = ({ startYear = 2024 }: { startYear?: number }) => {
  const currentYear = new Date().getFullYear();
  const yearLabel =
    startYear === currentYear
      ? `${currentYear}`
      : `${startYear}-${currentYear}`;
  return (
    <div className="mt-1 text-center text-sm">
      <p>&copy; {yearLabel}, Gleb Khaykin</p>
    </div>
  );
};

/**
 * Footer component
 *
 * @returns Footer component
 */
export const Footer = () => {
  return (
    <footer className={`relative z-10 mb-4 pt-2 pb-2`}>
      <div className="container mx-auto mt-4 flex flex-col items-center justify-between">
        <ThemeToggle />
        <Copyright />
      </div>
    </footer>
  );
};
