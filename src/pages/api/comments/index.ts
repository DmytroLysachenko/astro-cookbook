import type { APIRoute } from "astro";
import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { comments } from "@/db/schema/comments";
import { users } from "@/db/schema/users";
import { COMMENTS_PER_PAGE } from "@/constants";
import { jsonResponse, recipeSlugSchema } from "@/lib/api-input";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const parsedSlug = recipeSlugSchema.safeParse(
    url.searchParams.get("recipeSlug"),
  );
  const requestedPage = Number(url.searchParams.get("page"));
  const requestedLimit = Number(url.searchParams.get("limit"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, 1000)
      : 1;
  const limit =
    Number.isSafeInteger(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, COMMENTS_PER_PAGE)
      : COMMENTS_PER_PAGE;

  if (!parsedSlug.success) {
    return jsonResponse({ error: "Recipe slug is required" }, 400);
  }
  const recipeSlug = parsedSlug.data;

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

    return jsonResponse(fetchedComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
};
