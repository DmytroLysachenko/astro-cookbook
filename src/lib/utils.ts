import type { TFullIngredientsData } from "@/components/astro/recipe-page/NutritionFacts.astro";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPageNumbers = (totalPages: number, currentPage: number) => {
  const pageNumbers = [];
  const maxPagesToShow = 5;

  if (totalPages <= maxPagesToShow) {
    // If we have fewer pages than our max, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Always include first page
    pageNumbers.push(1);

    // Calculate start and end of page range
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if we're at the start or end
    if (currentPage <= 2) {
      endPage = 4;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - 3;
    }

    // Add ellipsis if needed
    if (startPage > 2) {
      pageNumbers.push("...");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Always include last page
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};

export const capitalize = (str: string) => {
  if (typeof str !== "string" || str.length === 0) {
    return str; // Return the input if it's not a string or is empty
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const calculateNutritionFacts = (
  ingredients: { name: string; quantity: string; grams: number; id: number }[],
  nutritionData: TFullIngredientsData,
) => {
  let totalWeight = 0;
  const totals = {
    calories: 0,
    totalFat: 0,
    saturatedFat: 0,
    transFat: 0,
    polyunsaturatedFat: 0,
    monounsaturatedFat: 0,
    cholesterol: 0,
    sodium: 0,
    totalCarbs: 0,
    dietaryFiber: 0,
    sugars: 0,
    protein: 0,
  };

  if (
    !ingredients ||
    !nutritionData ||
    ingredients.length === 0 ||
    nutritionData.length === 0
  ) {
    console.warn("Empty ingredients or nutrition data provided.");
    return totals;
  }

  for (const ingredient of ingredients) {
    const data = nutritionData.find(
      (i) => Number(i.id) === Number(ingredient.id),
    );

    if (!data) {
      console.warn(
        `Nutrition data not found for ingredient with ID: ${ingredient.id}`,
      );
      continue;
    }

    if (!ingredient.grams || ingredient.grams <= 0) {
      console.warn(
        `Invalid grams value for ingredient with ID: ${ingredient.id}`,
      );
      continue;
    }

    totalWeight += ingredient.grams;

    const weight = ingredient.grams;
    totals.calories += (data.calories * weight) / 100;
    totals.totalFat += (data.totalFat * weight) / 100;
    totals.saturatedFat += (data.saturatedFat * weight) / 100;
    totals.transFat += (data.transFat * weight) / 100;
    totals.polyunsaturatedFat += (data.polyunsaturatedFat * weight) / 100;
    totals.monounsaturatedFat += (data.monounsaturatedFat * weight) / 100;
    totals.cholesterol += (data.cholesterol * weight) / 100;
    totals.sodium += (data.sodium * weight) / 100;
    totals.totalCarbs += (data.totalCarbs * weight) / 100;
    totals.dietaryFiber += (data.dietaryFiber * weight) / 100;
    totals.sugars += (data.sugars * weight) / 100;
    totals.protein += (data.protein * weight) / 100;
  }

  const per100g =
    totalWeight > 0
      ? {
          calories: (totals.calories / totalWeight) * 100,
          totalFat: (totals.totalFat / totalWeight) * 100,
          saturatedFat: (totals.saturatedFat / totalWeight) * 100,
          transFat: (totals.transFat / totalWeight) * 100,
          polyunsaturatedFat: (totals.polyunsaturatedFat / totalWeight) * 100,
          monounsaturatedFat: (totals.monounsaturatedFat / totalWeight) * 100,
          cholesterol: (totals.cholesterol / totalWeight) * 100,
          sodium: (totals.sodium / totalWeight) * 100,
          totalCarbs: (totals.totalCarbs / totalWeight) * 100,
          dietaryFiber: (totals.dietaryFiber / totalWeight) * 100,
          sugars: (totals.sugars / totalWeight) * 100,
          protein: (totals.protein / totalWeight) * 100,
        }
      : totals;

  return per100g;
};

export const buildFilterUrl = (
  path: string,
  params: { [key: string]: string | undefined },
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `${path}?${queryString}` : path;
};

export const formatNumber = (value: number | string, decimals = 1) => {
  return Number(value).toFixed(decimals);
};
