import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jsdocPlugin from "eslint-plugin-jsdoc";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import tsdocPlugin from "eslint-plugin-tsdoc";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Ignore specific directories
  {
    ignores: ["build/**", "vendor/**", "supabase/**"],
  },

  // Base config
  // The one coming after would override the one before it
  eslint.configs.recommended,

  // Use both browser and node environments
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSortPlugin,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  // React
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
    },
    settings: {
      "react": {
        version: "detect",
      },
      "formComponents": ["Form"],
      "linkComponents": [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/resolver": {
        typescript: {},
      },
    },
  },

  // Typescript
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
      "import": importPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
    },
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      "import/internal-regex": "^~/",
      "import/parsers": {
        espree: [".js", ".cjs", ".mjs", ".jsx"],
      },
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },

  // TSDoc
  {
    files: ["app/**/*.{ts,tsx}"],
    plugins: {
      tsdoc: tsdocPlugin,
      jsdoc: jsdocPlugin,
    },
    rules: {
      "tsdoc/syntax": "warn",
      "jsdoc/require-jsdoc": [
        "warn",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
      "jsdoc/require-returns": "warn",
    },
  },

  // JSDoc
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      jsdoc: jsdocPlugin,
    },
    rules: {
      "jsdoc/require-jsdoc": [
        "warn",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
      "jsdoc/require-param": "warn",
      "jsdoc/require-returns": "warn",
    },
  },
];
