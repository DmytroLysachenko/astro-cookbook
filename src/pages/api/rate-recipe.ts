// Your Drizzle database client
import { and, eq } from "drizzle-orm";
import type { APIRoute } from "astro";
import { rates } from "@/db/schema/rates"; // Updated schema with recipeSlug
import { db } from "@/db";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals: { user } }) => {
  try {
    const { recipeSlug, rating: rate } = await request.json();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if the user has already rated this recipe
    const previousRate = await db
      .select()
      .from(rates)
      .where(and(eq(rates.userId, user.id), eq(rates.recipeSlug, recipeSlug)))
      .then((rate) => rate[0]);

    if (previousRate) {
      // Update the existing rating
      await db
        .update(rates)
        .set({ rate })
        .where(and(eq(rates.userId, user.id), eq(rates.recipeSlug, recipeSlug)))
        .execute();
    } else {
      // Insert a new rating
      await db
        .insert(rates)
        .values({
          userId: user.id,
          recipeSlug,
          rate,
          ratedAt: new Date(),
        })
        .execute();
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
