// src/pages/api/increment-views.ts

import { db } from "@/db";
import { views } from "@/db/schema/views";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { recipeSlug } = await request.json();

  if (!recipeSlug) {
    return Response.json({ error: "Recipe slug is required" }, { status: 400 });
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

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
