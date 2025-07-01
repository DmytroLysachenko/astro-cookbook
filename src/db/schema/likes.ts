import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";

import { users } from "./users";

export const likes = pgTable("likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  recipeSlug: text("recipe_slug").notNull(), // Reference to the recipe slug in MDX
  likedAt: timestamp("liked_at").defaultNow(),
});
