import { MdDarkMode, MdLightMode } from "react-icons/md";

import { useTheme } from "~/utils/theme";

/**
 * Theme toggle component
 *
 * @param className - Optional class name for the button
 * @returns Theme toggle button
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`z-50 rounded-full text-2xl transition-opacity hover:opacity-80 ${
        className
      }`}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <MdDarkMode className="h-6 w-6" />
      ) : (
        <MdLightMode className="h-6 w-6" />
      )}
    </button>
  );
}
