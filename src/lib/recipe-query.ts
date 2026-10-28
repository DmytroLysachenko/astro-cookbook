import type { TRecipeCollectionEntry } from "@/types";

const PAGE_SIZE = 12;
const sorts = ["newest", "title", "cookTime", "portions"] as const;
type Sort = (typeof sorts)[number];

export function queryRecipes(
  recipes: TRecipeCollectionEntry[],
  params: URLSearchParams,
) {
  const categories = [
    ...new Set(recipes.flatMap((recipe) => recipe.data.categories)),
  ].sort();
  const cuisines = [
    ...new Set(recipes.map((recipe) => recipe.data.cuisine)),
  ].sort();
  const requestedCategory = params.get("category")?.toLowerCase() ?? "";
  const requestedCuisine = params.get("cuisine")?.toLowerCase() ?? "";
  const category =
    categories.find((value) => value.toLowerCase() === requestedCategory) ?? "";
  const cuisine =
    cuisines.find((value) => value.toLowerCase() === requestedCuisine) ?? "";
  const requestedSort = params.get("sort");
  const sort: Sort = sorts.includes(requestedSort as Sort)
    ? (requestedSort as Sort)
    : "title";

  const filtered = recipes.filter(
    (recipe) =>
      (!category || recipe.data.categories.includes(category)) &&
      (!cuisine || recipe.data.cuisine === cuisine),
  );

  filtered.sort((a, b) => {
    switch (sort) {
      case "newest":
        return b.data.created.localeCompare(a.data.created);
      case "cookTime":
        return a.data.cookingTime - b.data.cookingTime;
      case "portions":
        return b.data.portions - a.data.portions;
      default:
        return a.data.title.localeCompare(b.data.title);
    }
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const requestedPage = Number(params.get("page"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, totalPages)
      : 1;
  const start = (page - 1) * PAGE_SIZE;

  return {
    recipes: filtered.slice(start, start + PAGE_SIZE),
    categories,
    cuisines,
    category,
    cuisine,
    sort,
    page,
    total,
    totalPages,
    start: total === 0 ? 0 : start + 1,
    end: Math.min(start + PAGE_SIZE, total),
  };
}
