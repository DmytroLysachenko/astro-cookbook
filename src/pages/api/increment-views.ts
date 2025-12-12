import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { views } from "@/db/schema/views";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const sendJson = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  let recipeSlug: unknown;
  try {
    ({ recipeSlug } = await request.json());
  } catch (error) {
    console.error("Error parsing increment views body:", error);
    return sendJson({ error: "Internal Server Error" }, 500);
  }

  if (typeof recipeSlug !== "string" || recipeSlug.trim() === "") {
    return sendJson({ error: "Recipe slug is required" }, 400);
  }

  const slugFilter = eq(views.recipeSlug, recipeSlug);

  try {
    const existingView = await db
      .select()
      .from(views)
      .where(slugFilter);

    if (existingView.length > 0) {
      await db
        .update(views)
        .set({ count: existingView[0].count + 1 })
        .where(slugFilter);
    } else {
      await db.insert(views).values({ recipeSlug, count: 1 });
    }

    return sendJson({ success: true }, 200);
  } catch (error) {
    console.error("Error incrementing recipe views:", error);
    return sendJson({ error: "Internal Server Error" }, 500);
  }
};
