// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import auth from "auth-astro";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react(), auth()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@components": "/src/components",
        "@astro": "/src/components/astro",
        "@react": "/src/components/react",
        "@db": "/src/db",
        "@db/schema": "/src/db/schema",
        "@db/functions": "/src/db/functions",
        "@services": "/src/services",
        "@styles": "/src/styles",
      },
    },
  },

  adapter: node({
    mode: "standalone",
  }),
});
