import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import tsdocPlugin from "eslint-plugin-tsdoc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ),
  {
    plugins: {
      "simple-import-sort": simpleImportSortPlugin,
      "tsdoc": tsdocPlugin,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "react/react-in-jsx-scope": "off",
      "tsdoc/syntax": "warn",
    },
  },
  {
    files: ["app/**/*.{ts,tsx}"],
    rules: {
      "tsdoc/syntax": "warn",
    },
  },
];

export default eslintConfig;
