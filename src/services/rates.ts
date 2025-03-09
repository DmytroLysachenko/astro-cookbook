import { db } from "@/db";
import { rates } from "@/db/schema/rates";
import { views } from "@/db/schema/views";
import { eq, inArray, sql, type InferInsertModel } from "drizzle-orm";

export type TRecipe = InferInsertModel<typeof rates>;

export const getRatingDataBySlugArray = async (recipesSlugs: string[]) => {
  const result = await db
    .select({
      slug: sql<string>`COALESCE(${rates.recipeSlug}, ${views.recipeSlug})`.as(
        "slug",
      ),
      rating: sql<number>`COALESCE(AVG(${rates.rate}), 0)`.as("rating"),
      ratingCount: sql<number>`COUNT(${rates.rate})`.as("ratingCount"),
      views: sql<number>`COALESCE(${views.count}, 0)`.as("view"),
    })
    .from(views)
    .leftJoin(rates, eq(rates.recipeSlug, views.recipeSlug))
    .where(inArray(views.recipeSlug, recipesSlugs))
    .groupBy(views.recipeSlug, rates.recipeSlug)
    .execute();

  return result;
};
