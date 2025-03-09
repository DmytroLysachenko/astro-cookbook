// src/pages/api/increment-views.ts

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
    // Check if the recipe exists in the views table
    const existingView = await db
      .select()
      .from(views)
      .where(eq(views.recipeSlug, recipeSlug))
      .execute();

    if (existingView.length > 0) {
      // Increment the view count
      await db
        .update(views)
        .set({ count: existingView[0].count + 1 })
        .where(eq(views.recipeSlug, recipeSlug))
        .execute();
    } else {
      // Insert a new record with count = 1
      await db.insert(views).values({ recipeSlug, count: 1 }).execute();
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
