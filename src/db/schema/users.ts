import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(), // Automatically generate UUID
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  lastActive: timestamp("last_active").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});
