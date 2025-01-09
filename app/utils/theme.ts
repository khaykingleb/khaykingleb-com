import { useEffect, useState } from "react";

export type Theme = "light" | "dark";
export const THEME_COOKIE = "theme";

export const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("theme") as Theme) || "light";
};

export const setTheme = (theme: Theme) => {
  localStorage.setItem("theme", theme);
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=${60 * 60 * 24 * 365}`;
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");
  }
};

/**
 * Custom hook to manage theme
 *
 * @returns Theme and setTheme function
 */
export function useTheme() {
  const [theme, setCurrentTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return {
    theme,
    setTheme: setCurrentTheme,
  };
}
