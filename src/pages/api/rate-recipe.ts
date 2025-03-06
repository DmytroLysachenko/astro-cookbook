import { db } from "../../db"; // Your Drizzle database client

import { and, eq } from "drizzle-orm";
import type { APIRoute } from "astro";
import { users } from "@/db/schema/users";
import { recipes } from "@/db/schema/recipes";
import { rates } from "@/db/schema/rates";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { userId, recipeId, rating: rate } = await request.json();

    const [user, recipe, previousRate] = await Promise.all([
      db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .then((user) => user[0]),
      db
        .select()
        .from(recipes)
        .where(eq(recipes.id, recipeId))
        .then((recipe) => recipe[0]),
      db
        .select()
        .from(rates)
        .where(and(eq(rates.userId, userId), eq(rates.recipeId, recipeId)))
        .then((rate) => rate[0]),
    ]);

    if (!user || !recipe) {
      return new Response(
        JSON.stringify({ error: "User or recipe not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (previousRate) {
      await db
        .update(rates)
        .set({ rate })
        .where(and(eq(rates.userId, userId), eq(rates.recipeId, recipeId)));
    } else {
      await db.insert(rates).values({
        userId,
        recipeId,
        rate,
        ratedAt: new Date(),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
