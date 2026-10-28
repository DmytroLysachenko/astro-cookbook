import { and, eq } from "drizzle-orm";
import type { APIRoute } from "astro";

import { db } from "@/db";
import { likeRecipe, unLikeRecipe } from "@/services/likes";
import { likes } from "@/db/schema/likes";
import { jsonResponse, parseJson, recipeExists, recipeMutationSchema } from "@/lib/api-input";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals: { user } }) => {
  try {
    if (!user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    const parsed = await parseJson(request, recipeMutationSchema);
    if (!parsed.success) return jsonResponse({ error: "Invalid recipe" }, 400);
    const { recipeSlug } = parsed.data;
    if (!(await recipeExists(recipeSlug))) return jsonResponse({ error: "Recipe not found" }, 404);

    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, user.id), eq(likes.recipeSlug, recipeSlug)))
      .then((res) => (res.length > 0 ? res[0] : null));

    if (existingLike) {
      await unLikeRecipe(user.id, recipeSlug);
    } else {
      await likeRecipe(user.id, recipeSlug);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Error liking recipe:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
};
