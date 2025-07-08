"use client";

import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

/**
 * Component to toggle between light and dark themes.
 *
 * @returns The ThemeToggle component.
 */
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  /**
   * Handle the theme toggle.
   */
  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return resolvedTheme === "dark" ? (
    <MdLightMode
      className={`
        h-6 w-6
        md:hover:scale-110
      `}
      onClick={handleThemeToggle}
    />
  ) : (
    <MdDarkMode
      className={`
        h-6 w-6
        md:hover:scale-110
      `}
      onClick={handleThemeToggle}
    />
  );
}

/**
 * Copyright component
 *
 * @param startYear - The starting year for the copyright range.
 * @returns The Copyright component.
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
 * @returns The Footer component.
 */
export const Footer = () => {
  return (
    <footer className="relative z-10 mb-4 pt-2 pb-2">
      <div
        className={`
          container mx-auto mt-4 flex flex-col items-center justify-between
        `}
      >
        <ThemeToggle />
        <Copyright />
      </div>
    </footer>
  );
};
