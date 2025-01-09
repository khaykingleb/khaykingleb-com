import daisyUI from "daisyui";
import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  plugins: [daisyUI],
  darkMode: "class",
  daisyui: {
    themes: [
      {
        light: {
          "base-100": "#ffffff",
          "base-content": "#000000",
        },
        dark: {
          "base-100": "#000000",
          "base-content": "#ffffff",
        },
      },
    ],
  },
} satisfies Config;
