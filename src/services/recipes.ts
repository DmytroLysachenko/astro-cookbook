import { db } from "@/db";
import { rates } from "@/db/schema/rates";
import { recipes } from "@/db/schema/recipes";
import { users } from "@/db/schema/users";
import {
  avg,
  count,
  eq,
  inArray,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm";

export type TRecipeData = InferSelectModel<typeof recipes>;
export type TRecipe = InferSelectModel<typeof recipes>;
type TCreateRecipeData = InferInsertModel<typeof recipes>;
type TUpdateRecipeData = Partial<TCreateRecipeData>;

export const getRecipeDataById = async (id: string) => {
  try {
    const recipe = await db
      .select({
        id: recipes.id,
        name: users.name,
        rating: avg(rates.rate).mapWith(Number),
        ratingCount: count(rates.recipeId).mapWith(Number),
        views: recipes.views,
      })
      .from(recipes)
      .where(eq(recipes.id, id))
      .leftJoin(users, eq(recipes.createdBy, users.id))
      .leftJoin(rates, eq(recipes.id, rates.recipeId))
      .groupBy(recipes.id, users.id);

    return recipe[0];
  } catch (error) {
    console.error(error);
  }
};

export const getRecipesRatingDataByIdArray = async (idsArray: string[]) => {
  try {
    const fetchedRecipes = await db
      .select({
        id: recipes.id,
        rating: avg(rates.rate).mapWith(Number),
        ratingCount: count(rates.recipeId).mapWith(Number),
        view: recipes.views,
      })
      .from(recipes)
      .where(inArray(recipes.id, idsArray))
      .leftJoin(rates, eq(recipes.id, rates.recipeId))
      .groupBy(recipes.id);

    return fetchedRecipes ?? null;
  } catch (error) {
    console.error(error);
  }
};

export const getAllRecipes = async () => {
  try {
    const allRecipes = await db.select().from(recipes);

    return allRecipes ?? null;
  } catch (error) {
    console.error(error);
  }
};

export const createRecipe = async (recipeData: TCreateRecipeData) => {
  try {
    const user = await db.insert(recipes).values(recipeData);

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const updateRecipe = async (
  id: string,
  recipeData: TUpdateRecipeData,
) => {
  try {
    const updatedUser = await db
      .update(recipes)
      .set(recipeData)
      .where(eq(recipes.id, id));

    return updatedUser;
  } catch (error) {
    console.error(error);
  }
};

export const viewRecipeById = async (id: string) => {
  try {
    const recipeViews = await db
      .select({
        views: recipes.views,
      })
      .from(recipes)
      .where(eq(recipes.id, id))
      .then((recipe) => recipe[0].views);

    if (recipeViews === null) {
      throw new Error("Recipe not found");
    }

    const updatedRecipe = await db
      .update(recipes)
      .set({ views: recipeViews + 1 })
      .where(eq(recipes.id, id))
      .returning({
        id: recipes.id,
        views: recipes.views,
      })
      .then((recipe) => recipe[0]);

    return updatedRecipe;
  } catch (error) {
    console.error(error);
  }
};
