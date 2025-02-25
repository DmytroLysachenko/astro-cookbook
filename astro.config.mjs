// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import auth from "auth-astro";
import path from "path";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react(), auth()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
        "@components": path.resolve("./src/components"),
        "@astro": path.resolve("./src/components/astro"),
        "@react": path.resolve("./src/components/react"),
        "@db": path.resolve("./src/db"),
        "@db/schema": path.resolve("./src/db/schema"),
        "@db/functions": path.resolve("./src/db/functions"),
        "@services": path.resolve("./src/services"),
        "@styles": path.resolve("./src/styles"),
        "@lib": path.resolve("./src/lib"),
      },
    },
  },

  adapter: vercel(),
});
