import { db } from "@/db";
import { likes } from "@/db/schema/likes";
import { and, eq } from "drizzle-orm";

export const likeRecipe = async (userId: string, recipeSlug: string) => {
  const newLike = await db
    .insert(likes)
    .values({ userId, recipeSlug })
    .returning();
  return newLike;
};

export const unLikeRecipe = async (userId: string, recipeSlug: string) => {
  const newLike = await db
    .delete(likes)
    .where(and(eq(likes.userId, userId), eq(likes.recipeSlug, recipeSlug)));
  return newLike;
};
