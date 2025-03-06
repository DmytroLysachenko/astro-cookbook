import { db } from "../../db"; // Your Drizzle database client

import { and, eq } from "drizzle-orm";
import type { APIRoute } from "astro";
import { recipes } from "@/db/schema/recipes";
import { rates } from "@/db/schema/rates";
import { getSession } from "auth-astro/server";
import { getUser } from "@/services/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const session = await getSession(request);

    if (!session || !session.user || !session.user.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (Date.parse(session.expires) < Date.now()) {
      return new Response(JSON.stringify({ error: "Session expired" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await getUser(session.user.email, "email");

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { recipeId, rating: rate } = await request.json();
    console.log(recipeId);
    const [recipe, previousRate] = await Promise.all([
      db
        .select()
        .from(recipes)
        .where(eq(recipes.id, recipeId))
        .then((recipe) => recipe[0]),
      db
        .select()
        .from(rates)
        .where(and(eq(rates.userId, user.id), eq(rates.recipeId, recipeId)))
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
        .where(and(eq(rates.userId, user.id), eq(rates.recipeId, recipeId)));
    } else {
      await db.insert(rates).values({
        userId: user.id,
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
