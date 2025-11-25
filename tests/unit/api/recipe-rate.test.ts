import { beforeEach, describe, expect, it, vi } from "vitest";
import { and, eq } from "drizzle-orm";

import { POST as rateRecipe } from "@/pages/api/recipe/rate";

const mocks = vi.hoisted(() => {
  const mockSelect = vi.fn();
  const mockFrom = vi.fn();
  const mockWhere = vi.fn();
  const mockUpdate = vi.fn();
  const mockSet = vi.fn();
  const mockUpdateWhere = vi.fn();
  const mockInsert = vi.fn();
  const mockValues = vi.fn();

  return {
    mockSelect,
    mockFrom,
    mockWhere,
    mockUpdate,
    mockSet,
    mockUpdateWhere,
    mockInsert,
    mockValues,
  };
});

function getMocks() {
  return mocks;
}

vi.mock("@/db", () => ({
  db: {
    select: getMocks().mockSelect,
    update: getMocks().mockUpdate,
    insert: getMocks().mockInsert,
  },
}));

vi.mock("@/db/schema/rates", () => ({
  rates: {
    userId: "userId",
    recipeSlug: "recipeSlug",
    rate: "rate",
  },
}));

vi.mock("drizzle-orm", () => ({
  and: vi.fn((...args) => args),
  eq: vi.fn((...args) => args),
}));

describe("recipe rate POST route", () => {
  const request = (body: unknown) =>
    new Request("http://localhost/api/recipe/rate", {
      method: "POST",
      body: JSON.stringify(body),
    });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 404 when user is missing", async () => {
    const response = await rateRecipe({
      request: request({ recipeSlug: "abc", rating: 5 }),
      locals: {},
    } as any);

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: "User not found" });
  });

  it("updates an existing rating", async () => {
    const { mockSelect, mockFrom, mockWhere, mockUpdate, mockSet } = getMocks();

    mockSelect.mockReturnValueOnce({ from: mockFrom });
    mockFrom.mockReturnValueOnce({ where: mockWhere });
    mockWhere.mockReturnValueOnce({
      then: (cb: any) => Promise.resolve(cb([{ rate: 3 }])),
    });

    mockUpdate.mockReturnValueOnce({ set: mockSet });
    mockSet.mockReturnValueOnce({ where: getMocks().mockUpdateWhere });

    const response = await rateRecipe({
      request: request({ recipeSlug: "abc", rating: 4 }),
      locals: { user: { id: "u1" } },
    } as any);

    expect(mockUpdate).toHaveBeenCalled();
    expect(getMocks().mockUpdateWhere).toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  it("builds the rating lookup query with user and recipe slug", async () => {
    const {
      mockSelect,
      mockFrom,
      mockWhere,
      mockUpdate,
      mockSet,
      mockUpdateWhere,
    } = getMocks();

    mockSelect.mockReturnValueOnce({ from: mockFrom });
    mockFrom.mockReturnValueOnce({ where: mockWhere });
    mockWhere.mockReturnValueOnce({
      then: (cb: any) => Promise.resolve(cb([{ rate: 2 }])),
    });

    mockUpdate.mockReturnValueOnce({ set: mockSet });
    mockSet.mockReturnValueOnce({ where: mockUpdateWhere });

    const response = await rateRecipe({
      request: request({ recipeSlug: "slug-1", rating: 5 }),
      locals: { user: { id: "user-10" } },
    } as any);

    expect(mockFrom).toHaveBeenCalledWith({
      userId: "userId",
      recipeSlug: "recipeSlug",
      rate: "rate",
    });
    expect(eq).toHaveBeenCalledWith("userId", "user-10");
    expect(eq).toHaveBeenCalledWith("recipeSlug", "slug-1");
    expect(and).toHaveBeenCalledTimes(2);
    expect(mockWhere).toHaveBeenCalledWith([
      ["userId", "user-10"],
      ["recipeSlug", "slug-1"],
    ]);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("inserts a new rating when user has not rated before", async () => {
    const { mockSelect, mockFrom, mockWhere, mockInsert, mockValues } =
      getMocks();

    mockSelect.mockReturnValueOnce({ from: mockFrom });
    mockFrom.mockReturnValueOnce({ where: mockWhere });
    mockWhere.mockReturnValueOnce({
      then: (cb: any) => Promise.resolve(cb([])),
    });

    mockInsert.mockReturnValueOnce({ values: mockValues });
    mockValues.mockReturnValueOnce({});

    const response = await rateRecipe({
      request: request({ recipeSlug: "abc", rating: 5 }),
      locals: { user: { id: "u1" } },
    } as any);

    expect(mockInsert).toHaveBeenCalled();
    expect(mockValues).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "u1",
        recipeSlug: "abc",
        rate: 5,
      }),
    );
    expect(response.status).toBe(200);
  });

  it("handles unexpected errors", async () => {
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { mockSelect } = getMocks();
    mockSelect.mockImplementationOnce(() => {
      throw new Error("db down");
    });

    const response = await rateRecipe({
      request: request({ recipeSlug: "abc", rating: 1 }),
      locals: { user: { id: "u1" } },
    } as any);

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Internal Server Error",
    });
    errSpy.mockRestore();
  });

  it("returns 500 when request JSON is invalid", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await rateRecipe({
      request: new Request("http://localhost/api/recipe/rate", {
        method: "POST",
        body: "not-json",
      }),
      locals: { user: { id: "user-99" } },
    } as any);

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Internal Server Error",
    });

    errorSpy.mockRestore();
  });
});
