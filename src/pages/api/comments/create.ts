import { db } from "@/db";
import { comments } from "@/db/schema/comments";
import { type APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { user } = locals;

    const { recipeSlug, commentText } = await request.json();

    const newComment = await db
      .insert(comments)
      .values({ recipeSlug, userId: user.id, commentText })
      .returning();

    return new Response(JSON.stringify(newComment[0]), {
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
