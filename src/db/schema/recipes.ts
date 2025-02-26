import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(), // Recipe ID (primary key)
  slug: text("slug").unique().notNull(), // Unique slug for URL
  createdBy: integer("created_by").references(() => users.id), // User who created the recipe (foreign key)
  createdAt: timestamp("created_at").defaultNow(), // Creation timestamp
  updatedAt: timestamp("updated_at").defaultNow(), // Last update timestamp
  rating: numeric("rating", { precision: 3, scale: 2 }),
  views: integer("views").default(0),
});
