/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("daisyui")],
  darkMode: ["selector", '[data-theme="dark"]'],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
  },
};
