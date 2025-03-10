import { sql } from "drizzle-orm";

import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const comments = pgTable("comments", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  recipeSlug: text("recipe_slug").notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  commentText: text("comment_text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
