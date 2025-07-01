import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const views = pgTable("views", {
  recipeSlug: text("recipe_slug").primaryKey().unique(),
  count: integer("count").default(0).notNull(),
});
