import type { AstroIntegration } from "astro";

import { views } from "../src/db/schema/views";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import path from "path";
import fs from "fs/promises";

const RECIPES_DIR = path.join(process.cwd(), "src", "content", "recipes");

async function getAllSlugs() {
  const files = await fs.readdir(RECIPES_DIR);

  const slugs = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));

  return slugs;
}

export const syncRecipesToDb = (): AstroIntegration => ({
  name: "sync-recipes-to-db",
  hooks: {
    "astro:build:done": async ({ logger }) => {
      logger.info("🔄 Syncing recipes to DB...");

      const slugs = await getAllSlugs();

      await checkRecipesExists(slugs);

      logger.info("✅ Recipes synced to DB successfully!");
    },
  },
});

const checkRecipesExists = async (recipesSlugs: string[]) => {
  const sql = neon(process.env.DATABASE_URL!);

  const db = drizzle(sql);

  for (const slug of recipesSlugs) {
    const recipe = await db
      .select()
      .from(views)
      .where(eq(views.recipeSlug, slug))
      .then((res) => res[0]);

    if (!recipe) {
      await db.insert(views).values({ recipeSlug: slug, count: 0 });
    }
  }
};
