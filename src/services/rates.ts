import { db } from "@/db";
import { rates } from "@/db/schema/rates";
import { views } from "@/db/schema/views";
import {
  eq,
  inArray,
  avg,
  count,
  type InferInsertModel,
  and,
} from "drizzle-orm";

export type TRecipe = InferInsertModel<typeof rates>;

export const getRatingDataBySlugArray = async (recipesSlugs: string[]) => {
  const result = await db
    .select({
      slug: rates.recipeSlug,
      rating: avg(rates.rate),
      ratingCount: count(rates.rate),
      views: views.count,
    })
    .from(views)
    .leftJoin(rates, eq(rates.recipeSlug, views.recipeSlug))
    .where(inArray(views.recipeSlug, recipesSlugs))
    .groupBy(views.recipeSlug, rates.recipeSlug)
    .then((rows) =>
      rows.map((row) => ({ ...row, rating: Number(row.rating) })),
    );

  return result;
};

export const getRatingDataBySlug = async (recipeSlug: string) => {
  const result = await db
    .select({
      slug: rates.recipeSlug,
      rating: avg(rates.rate),
      ratingCount: count(rates.rate),
      views: views.count,
    })
    .from(views)
    .leftJoin(rates, eq(rates.recipeSlug, views.recipeSlug))
    .where(eq(views.recipeSlug, recipeSlug))
    .groupBy(views.recipeSlug, rates.recipeSlug)
    .then((rows) => rows[0] ?? null);

  return result;
};

export const getUserRateBySlug = async (slug: string, userId: string) => {
  const result = await db
    .select()
    .from(rates)
    .where(and(eq(rates.recipeSlug, slug), eq(rates.userId, userId)))
    .then((res) => (res.length > 0 ? res[0].rate : null));

  return result;
};
