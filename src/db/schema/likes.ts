import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { recipes } from "./recipes";

export const likes = pgTable(
  "likes",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    likedAt: timestamp("liked_at").defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.recipeId] })],
);
