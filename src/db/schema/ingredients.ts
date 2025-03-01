import type { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, numeric, pgEnum } from "drizzle-orm/pg-core";

export const ingredientCategories = pgEnum("category", [
  "meat",
  "vegetable",
  "fruit",
  "dairy",
  "porridge",
  "seafood",
  "nuts_seeds",
  "legumes",
  "grains",
  "oils_fats",
  "herbs_spices",
  "sweets",
  "beverages",
  "other",
]);

export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  calories: numeric("calories", { precision: 6, scale: 3 }).notNull(),
  totalFat: numeric("total_fat", { precision: 6, scale: 3 }).notNull(),
  saturatedFat: numeric("saturated_fat", { precision: 6, scale: 3 }).notNull(),
  transFat: numeric("trans_fat", { precision: 6, scale: 3 }).notNull(),
  polyunsaturatedFat: numeric("polyunsaturated_fat", {
    precision: 6,
    scale: 3,
  }).notNull(),
  monounsaturatedFat: numeric("monounsaturated_fat", {
    precision: 6,
    scale: 3,
  }).notNull(),
  cholesterol: numeric("cholesterol", { precision: 6, scale: 3 }).notNull(),
  sodium: numeric("sodium", { precision: 6, scale: 3 }).notNull(),
  totalCarbs: numeric("total_carbs", { precision: 6, scale: 3 }).notNull(),
  dietaryFiber: numeric("dietary_fiber", { precision: 6, scale: 3 }).notNull(),
  sugars: numeric("sugars", { precision: 6, scale: 3 }).notNull(),
  protein: numeric("protein", { precision: 6, scale: 3 }).notNull(),
  category: ingredientCategories().notNull(),
  description: text("description"),
});

export type TIngredient = InferSelectModel<typeof ingredients>;
