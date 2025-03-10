import type { APIRoute } from "astro";
import { db } from "@/db";
import { comments } from "@/db/schema/comments";
import { users } from "@/db/schema/users";
import { desc, eq } from "drizzle-orm";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const recipeSlug = url.searchParams.get("recipeSlug");
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 10;

  if (!recipeSlug) {
    return new Response(JSON.stringify({ error: "Recipe slug is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  try {
    const fetchedComments = await db
      .select({
        id: comments.id,
        commentText: comments.commentText,
        createdAt: comments.createdAt,
        user: {
          id: users.id,
          name: users.name,
          avatar: users.avatar,
        },
      })
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.recipeSlug, recipeSlug))
      .orderBy(desc(comments.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    return new Response(JSON.stringify(fetchedComments), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
