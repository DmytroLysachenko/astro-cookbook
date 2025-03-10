// Your Drizzle database client
import { and, eq } from "drizzle-orm";
import type { APIRoute } from "astro";
import { db } from "@/db";
import { likeRecipe, unLikeRecipe } from "@/services/likes";
import { likes } from "@/db/schema/likes";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals: { user } }) => {
  try {
    const { recipeSlug } = await request.json();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, user.id), eq(likes.recipeSlug, recipeSlug)))
      .execute()
      .then((res) => (res.length > 0 ? res[0] : null));

    if (existingLike) {
      await unLikeRecipe(user.id, recipeSlug);
    } else {
      await likeRecipe(user.id, recipeSlug);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error rating recipe:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
