import { pgTable, serial, text, numeric } from "drizzle-orm/pg-core";

export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  calories: numeric("calories", { precision: 6, scale: 2 }).notNull(),
  totalFat: numeric("total_fat", { precision: 6, scale: 2 }).notNull(),
  saturatedFat: numeric("saturated_fat", { precision: 6, scale: 2 }).notNull(),
  transFat: numeric("trans_fat", { precision: 6, scale: 2 }).notNull(),
  polyunsaturatedFat: numeric("polyunsaturated_fat", {
    precision: 6,
    scale: 2,
  }).notNull(),
  monounsaturatedFat: numeric("monounsaturated_fat", {
    precision: 6,
    scale: 2,
  }).notNull(),
  cholesterol: numeric("cholesterol", { precision: 6, scale: 2 }).notNull(),
  sodium: numeric("sodium", { precision: 6, scale: 2 }).notNull(),
  totalCarbs: numeric("total_carbs", { precision: 6, scale: 2 }).notNull(),
  dietaryFiber: numeric("dietary_fiber", { precision: 6, scale: 2 }).notNull(),
  sugars: numeric("sugars", { precision: 6, scale: 2 }).notNull(),
  protein: numeric("protein", { precision: 6, scale: 2 }).notNull(),
});
