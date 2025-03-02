import { db } from "@/db";
import { recipes } from "@/db/schema/recipes";
import {
  eq,
  inArray,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm";

//TODO: Add error handling for using services from here.

export type TRecipeData = InferSelectModel<typeof recipes>;
type TCreateRecipeData = InferInsertModel<typeof recipes>;
type TUpdateRecipeData = Partial<TCreateRecipeData>;

export const getRecipe = async (id: string) => {
  try {
    const recipe = await db.select().from(recipes).where(eq(recipes.id, id));

    return recipe[0] ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getRecipesRatingDataByIdArray = async (idsArray: string[]) => {
  try {
    const fetchedRecipes = await db
      .select({
        id: recipes.id,
        rating: recipes.rating,
        ratingCount: recipes.ratingCount,
        view: recipes.views,
      })
      .from(recipes)
      .where(inArray(recipes.id, idsArray));

    return fetchedRecipes ?? null;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllRecipes = async () => {
  try {
    const allRecipes = await db.select().from(recipes);

    return allRecipes ?? null;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createRecipe = async (recipeData: TCreateRecipeData) => {
  try {
    const user = await db.insert(recipes).values(recipeData);

    return user;
  } catch (error) {
    console.error(error);
    return null;
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
    return null;
  }
};
