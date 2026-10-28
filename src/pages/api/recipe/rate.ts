import { and, eq } from "drizzle-orm";
import type { APIRoute } from "astro";

import { rates } from "@/db/schema/rates";
import { db } from "@/db";
import { jsonResponse, parseJson, recipeExists, recipeRatingSchema } from "@/lib/api-input";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals: { user } }) => {
  try {
    if (!user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    const parsed = await parseJson(request, recipeRatingSchema);
    if (!parsed.success)
      return jsonResponse({ error: "Invalid recipe or rating" }, 400);
    const { recipeSlug, rating: rate } = parsed.data;
    if (!(await recipeExists(recipeSlug))) return jsonResponse({ error: "Recipe not found" }, 404);

    const previousRate = await db
      .select()
      .from(rates)
      .where(and(eq(rates.userId, user.id), eq(rates.recipeSlug, recipeSlug)))
      .then((rate) => rate[0]);

    if (previousRate) {
      await db
        .update(rates)
        .set({ rate })
        .where(
          and(eq(rates.userId, user.id), eq(rates.recipeSlug, recipeSlug)),
        );
    } else {
      await db.insert(rates).values({
        userId: user.id,
        recipeSlug,
        rate,
        ratedAt: new Date(),
      });
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Error rating recipe:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
};
