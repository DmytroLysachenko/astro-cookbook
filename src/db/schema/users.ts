import { relations, sql, type InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { likes } from "./likes";
import { rates } from "./rates";

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`), // Automatically generate UUID
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  bio: text("bio"),
  lastActive: timestamp("last_active").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  likes: many(likes),
  ratedRecipes: many(rates),
}));

export type TUser = InferSelectModel<typeof users>;
