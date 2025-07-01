import { pgTable, timestamp, uuid, text, integer } from "drizzle-orm/pg-core";

import { users } from "./users";

export const rates = pgTable("rates", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  recipeSlug: text("recipe_slug").notNull(), // Reference to the recipe slug in MDX
  rate: integer().notNull(),
  ratedAt: timestamp("rated_at").defaultNow(),
});
