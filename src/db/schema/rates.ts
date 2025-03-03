import {
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { recipes } from "./recipes";
import type { InferInsertModel } from "drizzle-orm";

//TODO: DB relations to fix

export const rates = pgTable(
  "rates",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    rate: integer(),
    ratedAt: timestamp("rated_at").defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.recipeId] })],
);

export type TRecipe = InferInsertModel<typeof rates>;
