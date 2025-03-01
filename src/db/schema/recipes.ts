import {
  pgTable,
  text,
  integer,
  timestamp,
  numeric,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { sql, type InferSelectModel } from "drizzle-orm";

export const recipes = pgTable("recipes", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`), // Recipe ID as UUID
  slug: text("slug").unique().notNull(), // Unique slug for URL
  createdBy: uuid("created_by").references(() => users.id, {
    onDelete: "cascade",
  }), // User who created the recipe (foreign key with cascade)
  createdAt: timestamp("created_at").defaultNow(), // Creation timestamp
  updatedAt: timestamp("updated_at").defaultNow(), // Last update timestamp
  rating: numeric("rating", { precision: 3, scale: 2 }),
  views: integer("views").default(0),
});

export type TRecipe = InferSelectModel<typeof recipes>;
