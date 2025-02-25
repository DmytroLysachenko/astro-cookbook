import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email").unique().notNull(),
  bio: text("bio"), // Optional user bio
  lastActive: timestamp("last_active").defaultNow(), // Last active timestamp
  createdAt: timestamp("created_at").defaultNow(),
});
