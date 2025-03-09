import { pgTable, integer, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const recipes = pgTable("recipes", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`), // Recipe ID as UUID
  createdAt: timestamp("created_at").defaultNow(), // Creation timestamp
  updatedAt: timestamp("updated_at").defaultNow(), // Last update timestamp
  views: integer("views").default(0).notNull(),
});
