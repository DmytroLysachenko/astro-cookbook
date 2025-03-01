import { db } from "@/db";
import { ingredients } from "@/db/schema/ingredients";
import { inArray } from "drizzle-orm";

export const getIngredientsData = async (ingredientsList: number[]) => {
  const allIngredients = await db
    .select()
    .from(ingredients)
    .where(inArray(ingredients.id, ingredientsList))
    .then((res) => [
      ...res.map((res) => ({
        ...res,
        calories: Number(res.calories),
        totalFat: Number(res.totalFat),
        saturatedFat: Number(res.saturatedFat),
        transFat: Number(res.transFat),
        polyunsaturatedFat: Number(res.polyunsaturatedFat),
        monounsaturatedFat: Number(res.monounsaturatedFat),
        cholesterol: Number(res.cholesterol),
        sodium: Number(res.sodium),
        totalCarbs: Number(res.totalCarbs),
        dietaryFiber: Number(res.dietaryFiber),
        sugars: Number(res.sugars),
        protein: Number(res.protein),
      })),
    ]);

  return allIngredients;
};
