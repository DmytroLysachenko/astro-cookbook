import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const recipe = defineCollection({
  loader: glob({ base: "./src/content/recipes", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    previewImage: z.string(),
    cookingTime: z.number(),
    portions: z.number(),
    cuisine: z.string(),
    categories: z.array(z.string()),
    language: z.string(),
    created: z.string().date(),
    ingredients: z.array(
      z.object({ name: z.string(), quantity: z.string(), grams: z.number() }),
    ),
  }),
});

export const collections = { recipe };
