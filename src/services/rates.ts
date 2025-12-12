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
type RawRatingRow = {
  slug: string | null;
  rating: number | string | null;
  ratingCount: number;
  views: number | null;
};

export type RatingData = NonNullable<ReturnType<typeof normalizeRatingRow>>;

const normalizeRatingRow = (row?: RawRatingRow | null) => {
  if (!row || !row.slug) {
    return null;
  }

  return {
    ...row,
    slug: row.slug,
    rating: Number(row.rating ?? 0),
    ratingCount: Number(row.ratingCount),
    views: Number(row.views ?? 0),
  };
};

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
      rows
        .map((row) => normalizeRatingRow(row))
        .filter(Boolean) as RatingData[],
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
    .then((rows) => normalizeRatingRow(rows[0]));

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
