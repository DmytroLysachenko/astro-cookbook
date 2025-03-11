// @ts-check
import { defineConfig, envField } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import auth from "auth-astro";
import path from "path";
import vercel from "@astrojs/vercel";
import dotenv from "dotenv";
import { PRIVATE_ROUTES } from "./src/constants/config";

dotenv.config();

// eslint-disable-next-line no-undef
const site = process.env.BASE_URL;

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        for (const route of PRIVATE_ROUTES) {
          if (page.includes(route)) {
            return false;
          }
        }
        return true;
      },
    }),
    react(),
    auth(),
  ],
  output: "static",
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
  env: {
    schema: {
      DATABASE_URL: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      GOOGLE_CLIENT_ID: envField.string({
        context: "server",
        access: "public",
        optional: false,
      }),
      GOOGLE_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      FACEBOOK_CLIENT_ID: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      FACEBOOK_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),

      GITHUB_CLIENT_ID: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      GITHUB_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      IMAGEKIT_URL_ENDPOINT: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      IMAGEKIT_PUBLIC_KEY: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      IMAGEKIT_PRIVATE_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      BASE_URL: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      API_BASE_URL: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
    },
  },
});
