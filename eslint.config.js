import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/.astro",
      "**/.github",
      "**/.changeset",
      "**/.vercel",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["scripts/**"],
    languageOptions: {
      globals: globals.node,
    },
  },
);
