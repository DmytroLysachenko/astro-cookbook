import { db } from "@/db";
import { rates } from "@/db/schema/rates";
import { views } from "@/db/schema/views";
import { eq, inArray, avg, count, type InferInsertModel } from "drizzle-orm";

export type TRecipe = InferInsertModel<typeof rates>;

export const getRatingDataBySlugArray = async (recipesSlugs: string[]) => {
  const result = await db
    .select({
      slug: rates.recipeSlug,
      rating: avg(rates.rate),
      ratingCount: rates.rate,
      views: views.count,
    })
    .from(views)
    .leftJoin(rates, eq(rates.recipeSlug, views.recipeSlug))
    .where(inArray(views.recipeSlug, recipesSlugs))
    .groupBy(views.recipeSlug, rates.recipeSlug)
    .execute();

  return result;
};

export const getRatingDataBySlug = async (recipesSlug: string) => {
  const result = await db
    .select({
      slug: rates.recipeSlug,
      rating: avg(rates.rate),
      ratingCount: count(rates.rate),
      views: views.count,
    })
    .from(views)
    .leftJoin(rates, eq(rates.recipeSlug, views.recipeSlug))
    .where(eq(views.recipeSlug, recipesSlug))
    .groupBy(views.recipeSlug, rates.recipeSlug)
    .execute()
    .then((rows) => rows[0] ?? null);

  return result;
};
