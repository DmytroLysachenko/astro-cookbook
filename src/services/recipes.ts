import { db } from "@/db";
import { recipes } from "@/db/schema/recipes";
import {
  eq,
  inArray,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm";

export type TRecipeData = InferSelectModel<typeof recipes>;
type TCreateRecipeData = InferInsertModel<typeof recipes>;
type TUpdateRecipeData = Partial<TCreateRecipeData>;

export const getRecipe = async (id: string) => {
  const recipe = await db.select().from(recipes).where(eq(recipes.id, id));

  return recipe[0] ?? null;
};

export const getRecipesRatingDataByIdArray = async (idsArray: string[]) => {
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
};

export const getAllRecipes = async () => {
  const allRecipes = await db.select().from(recipes);

  return allRecipes ?? null;
};

export const createRecipe = async (recipeData: TCreateRecipeData) => {
  const user = await db.insert(recipes).values(recipeData);

  return user;
};

export const updateRecipe = async (
  id: string,
  recipeData: TUpdateRecipeData,
) => {
  const updatedUser = await db
    .update(recipes)
    .set(recipeData)
    .where(eq(recipes.id, id));

  return updatedUser;
};
