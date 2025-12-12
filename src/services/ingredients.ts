import { db } from "@/db";
import { ingredients } from "@/db/schema/ingredients";
import { inArray, type InferSelectModel } from "drizzle-orm";

type RawIngredient = InferSelectModel<typeof ingredients>;

const normalizeIngredient = (ingredient: RawIngredient) => ({
  ...ingredient,
  calories: Number(ingredient.calories),
  totalFat: Number(ingredient.totalFat),
  saturatedFat: Number(ingredient.saturatedFat),
  transFat: Number(ingredient.transFat),
  polyunsaturatedFat: Number(ingredient.polyunsaturatedFat),
  monounsaturatedFat: Number(ingredient.monounsaturatedFat),
  cholesterol: Number(ingredient.cholesterol),
  sodium: Number(ingredient.sodium),
  totalCarbs: Number(ingredient.totalCarbs),
  dietaryFiber: Number(ingredient.dietaryFiber),
  sugars: Number(ingredient.sugars),
  protein: Number(ingredient.protein),
});

export type TIngredient = ReturnType<typeof normalizeIngredient>;
export type TIngredientData = TIngredient;

export const getIngredientsByIdArray = async (
  ingredientsList: number[],
): Promise<TIngredient[]> => {
  if (ingredientsList.length === 0) {
    return [];
  }

  try {
    const allIngredients = await db
      .select()
      .from(ingredients)
      .where(inArray(ingredients.id, ingredientsList));

    return allIngredients.map(normalizeIngredient);
  } catch (error) {
    console.error(error);
    return [];
  }
};
