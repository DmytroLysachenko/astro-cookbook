import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const views = pgTable("views", {
  recipeSlug: text("recipe_slug").primaryKey(), // Reference to the recipe slug in MDX
  count: integer("count").default(0).notNull(),
});
