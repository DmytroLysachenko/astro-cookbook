import { type APIRoute } from "astro";

import { db } from "@/db";
import { comments } from "@/db/schema/comments";
import { commentSchema, jsonResponse, parseJson, recipeExists } from "@/lib/api-input";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { user } = locals;

    if (!user) return jsonResponse({ error: "Unauthorized" }, 401);
    const parsed = await parseJson(request, commentSchema);
    if (!parsed.success) return jsonResponse({ error: "Invalid comment" }, 400);
    const { recipeSlug, commentText } = parsed.data;
    if (!(await recipeExists(recipeSlug))) return jsonResponse({ error: "Recipe not found" }, 404);

    const newComment = await db
      .insert(comments)
      .values({ recipeSlug, userId: user.id, commentText })
      .returning();

    return jsonResponse(newComment[0]);
  } catch (error) {
    console.error("Error creating comment:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
};
