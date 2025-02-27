import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Recipe Collection
const recipe = defineCollection({
  loader: glob({ base: "./src/content/recipes", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    slug: z.string(), // Unique slug for the recipe (linked to DB)
    title: z.string(), // Recipe title
    description: z.string(), // Short description of the dish
    mainImage: z.string(), // URL/path to the main recipe image
    cookingTime: z.number(), // Cooking time in minutes
    portions: z.number(), // Number of servings
    cuisine: z.string(), // Cuisine type (e.g., Italian, French)
    categories: z.array(z.string()), // Array of tags/categories
    language: z.string(), // Language code (e.g., "en", "ua")
    ingredients: z.record(z.string()), // Object mapping ingredient names to their human-readable values
    ingredientsData: z.record(z.number()), // Object mapping ingredient names to their weight in grams
  }),
});

export const collections = { recipe };
