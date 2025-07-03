import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import tsdocPlugin from "eslint-plugin-tsdoc";
import jsdocPlugin from "eslint-plugin-jsdoc";
// import betterTailwindcssPlugin from "eslint-plugin-better-tailwindcss";

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
    "plugin:better-tailwindcss/recommended",
  ),
  {
    plugins: {
      "simple-import-sort": simpleImportSortPlugin,
      "tsdoc": tsdocPlugin,
      "jsdoc": jsdocPlugin,
      // "better-tailwindcss": betterTailwindcssPlugin,
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/app/styles/global.css",
        tailwindConfig: "tailwind.config.js",
      },
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "react/react-in-jsx-scope": "off",
      "tsdoc/syntax": "warn",
      "jsdoc/require-jsdoc": [
        "warn",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
        },
      ],
      "jsdoc/require-param": [
        "warn",
        {
          checkDestructured: false,
        },
      ],
      "jsdoc/require-returns": "warn",
    },
  },
];

export default eslintConfig;
