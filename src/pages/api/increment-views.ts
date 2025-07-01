import { db } from "@/db";
import { views } from "@/db/schema/views";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { recipeSlug } = await request.json();

  if (!recipeSlug) {
    return new Response(JSON.stringify({ error: "Recipe slug is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const existingView = await db
      .select()
      .from(views)
      .where(eq(views.recipeSlug, recipeSlug));

    if (existingView.length > 0) {
      await db
        .update(views)
        .set({ count: existingView[0].count + 1 })
        .where(eq(views.recipeSlug, recipeSlug));
    } else {
      await db.insert(views).values({ recipeSlug, count: 1 });
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
