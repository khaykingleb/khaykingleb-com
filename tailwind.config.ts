import daisyUI from "daisyui";
import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  plugins: [daisyUI],
} satisfies Config;
