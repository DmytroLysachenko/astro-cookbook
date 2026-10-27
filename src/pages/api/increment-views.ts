import type { APIRoute } from "astro";
import { sql } from "drizzle-orm";

import { db } from "@/db";
import { views } from "@/db/schema/views";
import { jsonResponse, parseJson, recipeExists, recipeMutationSchema } from "@/lib/api-input";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const parsed = await parseJson(request, recipeMutationSchema);
  if (!parsed.success)
    return jsonResponse({ error: "Recipe slug is required" }, 400);
  const { recipeSlug } = parsed.data;
  if (!(await recipeExists(recipeSlug))) return jsonResponse({ error: "Recipe not found" }, 404);

  try {
    await db
      .insert(views)
      .values({ recipeSlug, count: 1 })
      .onConflictDoUpdate({
        target: views.recipeSlug,
        set: { count: sql`${views.count} + 1` },
      });
    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Error incrementing recipe views:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
};
