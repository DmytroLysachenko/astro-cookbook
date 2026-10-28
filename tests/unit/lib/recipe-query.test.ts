import { describe, expect, it } from "vitest";
import { queryRecipes } from "@/lib/recipe-query";
import type { TRecipeCollectionEntry } from "@/types";

const recipe = (
  slug: string,
  title: string,
  cookingTime: number,
  cuisine = "Polish",
) =>
  ({
    data: {
      slug,
      title,
      cookingTime,
      portions: 4,
      created: "2025-01-01",
      cuisine,
      categories: ["dinner"],
    },
  }) as TRecipeCollectionEntry;

describe("queryRecipes", () => {
  const recipes = [
    recipe("b", "B", 30),
    recipe("a", "A", 10),
    recipe("c", "C", 20, "Italian"),
  ];

  it("filters and sorts without mutating the source", () => {
    const result = queryRecipes(
      recipes,
      new URLSearchParams("cuisine=polish&sort=cookTime"),
    );
    expect(result.recipes.map((entry) => entry.data.slug)).toEqual(["a", "b"]);
    expect(recipes.map((entry) => entry.data.slug)).toEqual(["b", "a", "c"]);
  });

  it.each(["page=NaN", "page=-2", "page=999999", "page=1.5"])(
    "keeps page in range for %s",
    (query) => {
      expect(queryRecipes(recipes, new URLSearchParams(query)).page).toBe(1);
    },
  );

  it("returns a usable empty state range", () => {
    const result = queryRecipes([], new URLSearchParams());
    expect([result.start, result.end, result.total, result.totalPages]).toEqual(
      [0, 0, 0, 1],
    );
  });
});
