import { db } from "@/db";
import { ingredients } from "@/db/schema/ingredients";

export const getIngredientsData = async (ingredientsList: string[]) => {
  const allIngredients = await db.select().from(ingredients);

  console.log(
    allIngredients.map((i) => i.name),
    ingredientsList,
  );

  const filteredIngredients = allIngredients.filter((ingredient) => {
    return ingredientsList
      .map((ingredient) => ingredient.toLowerCase())
      .includes(ingredient.name.toLowerCase());
  });

  return filteredIngredients;
};
