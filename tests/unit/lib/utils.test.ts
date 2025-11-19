import { describe, expect, it, vi } from "vitest";

import {
  cn,
  capitalize,
  buildFilterUrl,
  calculateNutritionFacts,
  formatNumber,
  formatString,
  formatTableValue,
  getPageNumbers,
} from "@/lib/utils";

describe("getPageNumbers", () => {
  it("returns all pages when total fits within the window", () => {
    expect(getPageNumbers(3, 1)).toEqual([1, 2, 3]);
  });

  it("adds ellipsis around the current page when needed", () => {
    expect(getPageNumbers(10, 5)).toEqual([1, "...", 4, 5, 6, "...", 10]);
  });

  it("keeps early pages visible near the start", () => {
    expect(getPageNumbers(10, 2)).toEqual([1, 2, 3, 4, "...", 10]);
  });

  it("shows trailing pages with ellipsis near the end", () => {
    expect(getPageNumbers(7, 7)).toEqual([1, "...", 4, 5, 6, 7]);
  });
});

describe("buildFilterUrl", () => {
  it("builds a query string while skipping empty values", () => {
    const url = buildFilterUrl("/recipes", {
      q: "cake",
      page: undefined,
      tag: "dessert",
    });

    expect(url).toBe("/recipes?q=cake&tag=dessert");
  });

  it("omits parameters that are falsy", () => {
    const url = buildFilterUrl("/recipes", {
      q: "",
      page: "2",
      tag: undefined,
    });

    expect(url).toBe("/recipes?page=2");
  });
});

describe("formatTableValue", () => {
  it("formats numbers to a single decimal place", () => {
    expect(formatTableValue(12.345)).toBe("12.3");
  });

  it("formats numeric strings and prettifies non-numeric strings", () => {
    expect(formatTableValue("10.55")).toBe("10.6");
    expect(formatTableValue("hello_world")).toBe("Hello world");
  });

  it("returns a fallback for unsupported types", () => {
    expect(formatTableValue({})).toBe("N/A");
  });
});

describe("calculateNutritionFacts", () => {
  const nutritionData = [
    {
      id: 1,
      name: "Tomato",
      calories: 18,
      totalFat: 0.2,
      saturatedFat: 0,
      transFat: 0,
      polyunsaturatedFat: 0.08,
      monounsaturatedFat: 0.03,
      cholesterol: 0,
      sodium: 5,
      totalCarbs: 3.9,
      dietaryFiber: 1.2,
      sugars: 2.6,
      protein: 0.9,
      category: "vegetable",
      description: null,
    },
    {
      id: 2,
      name: "Cheddar",
      calories: 402,
      totalFat: 33,
      saturatedFat: 21,
      transFat: 1.5,
      polyunsaturatedFat: 0.8,
      monounsaturatedFat: 9,
      cholesterol: 105,
      sodium: 621,
      totalCarbs: 1.3,
      dietaryFiber: 0,
      sugars: 0.5,
      protein: 25,
      category: "dairy",
      description: null,
    },
  ] satisfies Parameters<typeof calculateNutritionFacts>[1];

  it("aggregates macros and returns per-100g values", () => {
    const result = calculateNutritionFacts(
      [
        { id: 1, name: "Tomato", quantity: "80g", grams: 80 },
        { id: 2, name: "Cheddar", quantity: "20g", grams: 20 },
      ],
      nutritionData,
    );

    expect(result.calories).toBeCloseTo(94.8);
    expect(result.totalFat).toBeCloseTo(6.76);
    expect(result.saturatedFat).toBeCloseTo(4.2);
    expect(result.transFat).toBeCloseTo(0.3);
    expect(result.polyunsaturatedFat).toBeCloseTo(0.224);
    expect(result.monounsaturatedFat).toBeCloseTo(1.824);
    expect(result.cholesterol).toBeCloseTo(21);
    expect(result.sodium).toBeCloseTo(128.2);
    expect(result.totalCarbs).toBeCloseTo(3.38);
    expect(result.dietaryFiber).toBeCloseTo(0.96);
    expect(result.sugars).toBeCloseTo(2.18);
    expect(result.protein).toBeCloseTo(5.72);
  });

  it("returns zeros when given no data", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const result = calculateNutritionFacts([], []);

    expect(Object.values(result).every((value) => value === 0)).toBe(true);
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it("skips ingredients without nutrition data or invalid weights", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const result = calculateNutritionFacts(
      [
        { id: 3, name: "Unknown", quantity: "50g", grams: 50 },
        { id: 1, name: "Tomato", quantity: "100g", grams: 0 },
      ],
      nutritionData,
    );

    expect(result).toEqual(
      expect.objectContaining({
        calories: 0,
        totalFat: 0,
        protein: 0,
      }),
    );
    expect(warnSpy).toHaveBeenCalledTimes(2);

    warnSpy.mockRestore();
  });
});

describe("string and class formatters", () => {
  it("merges tailwind classes with cn", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("capitalizes and prettifies strings", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("")).toBe("");
    expect(formatString("  hello_world ")).toBe("Hello world");
  });

  it("formats numbers consistently", () => {
    expect(formatNumber(10)).toBe("10.0");
    expect(formatNumber("3.456", 2)).toBe("3.46");
  });
});
