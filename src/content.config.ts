import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Recipe Collection
const recipe = defineCollection({
  loader: glob({ base: "./src/content/recipes", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(), // Recipe title
    description: z.string(), // Short description of the dish
    previewImage: z.string(), // Name of picture in previews folder
    cookingTime: z.number(), // Cooking time in minutes
    portions: z.number(), // Number of servings
    cuisine: z.string(), // Cuisine type (e.g., Italian, French)
    categories: z.array(z.string()), // Array of tags/categories
    language: z.string(), // Language code (e.g., "en", "ua")
    created: z.string().date(), // Date when the recipe was created
    ingredients: z.array(
      z.object({ name: z.string(), quantity: z.string(), grams: z.number() }),
    ), // Object mapping ingredient names to their human-readable values
  }),
});

export const collections = { recipe };
