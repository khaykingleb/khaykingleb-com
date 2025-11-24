"use client";

import { useTheme } from "next-themes";
import { MdAutoMode, MdDarkMode, MdLightMode } from "react-icons/md";

/**
 * Component to toggle between light and dark themes.
 *
 * @returns The ThemeToggle component.
 */
export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  /**
   * Handle the theme toggle.
   */
  const handleThemeToggle = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  /**
   * Get the appropriate icon based on current theme
   */
  const getThemeIcon = () => {
    const iconClass = `
      h-6 w-6 cursor-pointer transition-transform
      md:hover:scale-110
    `;

    switch (theme) {
      case "light":
        return (
          <MdLightMode className={iconClass} onClick={handleThemeToggle} />
        );
      case "dark":
        return <MdDarkMode className={iconClass} onClick={handleThemeToggle} />;
      case "system":
        return <MdAutoMode className={iconClass} onClick={handleThemeToggle} />;
    }
  };
  return getThemeIcon();
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
