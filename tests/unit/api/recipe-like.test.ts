import { beforeEach, describe, expect, it, vi } from "vitest";
import { and, eq } from "drizzle-orm";

import { POST as toggleLike } from "@/pages/api/recipe/like";
import { buildTestUser, runApiRoute } from "./test-utils";

const mocks = vi.hoisted(() => {
  const mockSelect = vi.fn();
  const mockFrom = vi.fn();
  const mockWhere = vi.fn();
  const mockLikeRecipe = vi.fn();
  const mockUnLikeRecipe = vi.fn();

  return {
    mockSelect,
    mockFrom,
    mockWhere,
    mockLikeRecipe,
    mockUnLikeRecipe,
  };
});

function getMocks() {
  return mocks;
}

vi.mock("@/db", () => ({
  db: {
    select: getMocks().mockSelect,
  },
}));

vi.mock("@/db/schema/likes", () => ({
  likes: {
    userId: "userId",
    recipeSlug: "recipeSlug",
  },
}));

vi.mock("@/services/likes", () => ({
  likeRecipe: getMocks().mockLikeRecipe,
  unLikeRecipe: getMocks().mockUnLikeRecipe,
}));

vi.mock("drizzle-orm", () => ({
  and: vi.fn((...args) => args),
  eq: vi.fn((...args) => args),
}));

describe("recipe like POST route", () => {
  const request = (body: unknown) =>
    new Request("http://localhost/api/recipe/like", {
      method: "POST",
      body: JSON.stringify(body),
    });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 404 when user is missing", async () => {
    const response = await runApiRoute(toggleLike, {
      request: request({ recipeSlug: "abc" }),
      locals: {},
    });

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: "User not found" });
  });

  it("calls unlike when a like already exists", async () => {
    const { mockSelect, mockFrom, mockWhere, mockUnLikeRecipe, mockLikeRecipe } =
      getMocks();

    mockSelect.mockReturnValueOnce({ from: mockFrom });
    mockFrom.mockReturnValueOnce({ where: mockWhere });
    mockWhere.mockReturnValueOnce({
      then: (cb: any) => Promise.resolve(cb([{ id: 1 }])),
    });

    const response = await runApiRoute(toggleLike, {
      request: request({ recipeSlug: "abc" }),
      locals: { user: buildTestUser({ id: "user-1" }) },
    });

    expect(mockUnLikeRecipe).toHaveBeenCalledWith("user-1", "abc");
    expect(mockLikeRecipe).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  it("likes a recipe when there was no previous like", async () => {
    const { mockSelect, mockFrom, mockWhere, mockLikeRecipe, mockUnLikeRecipe } =
      getMocks();

    mockSelect.mockReturnValueOnce({ from: mockFrom });
    mockFrom.mockReturnValueOnce({ where: mockWhere });
    mockWhere.mockReturnValueOnce({
      then: (cb: any) => Promise.resolve(cb([])),
    });

    const response = await runApiRoute(toggleLike, {
      request: request({ recipeSlug: "abc" }),
      locals: { user: buildTestUser({ id: "user-1" }) },
    });

    expect(mockLikeRecipe).toHaveBeenCalledWith("user-1", "abc");
    expect(mockUnLikeRecipe).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  it("builds the like lookup query with user and recipe slug", async () => {
    const { mockSelect, mockFrom, mockWhere } = getMocks();

    mockSelect.mockReturnValueOnce({ from: mockFrom });
    mockFrom.mockReturnValueOnce({ where: mockWhere });
    mockWhere.mockReturnValueOnce({
      then: (cb: any) => Promise.resolve(cb([])),
    });

    const response = await runApiRoute(toggleLike, {
      request: request({ recipeSlug: "slug-123" }),
      locals: { user: buildTestUser({ id: "user-2" }) },
    });

    expect(mockFrom).toHaveBeenCalledWith({
      userId: "userId",
      recipeSlug: "recipeSlug",
    });
    expect(eq).toHaveBeenCalledWith("userId", "user-2");
    expect(eq).toHaveBeenCalledWith("recipeSlug", "slug-123");
    expect(and).toHaveBeenCalledTimes(1);
    expect(mockWhere).toHaveBeenCalledWith([
      ["userId", "user-2"],
      ["recipeSlug", "slug-123"],
    ]);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("handles internal errors", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { mockSelect } = getMocks();
    mockSelect.mockImplementationOnce(() => {
      throw new Error("db failure");
    });

    const response = await runApiRoute(toggleLike, {
      request: request({ recipeSlug: "abc" }),
      locals: { user: buildTestUser({ id: "user-1" }) },
    });

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Internal Server Error",
    });
    errorSpy.mockRestore();
  });

  it("returns 500 when request JSON is invalid", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await runApiRoute(toggleLike, {
      request: new Request("http://localhost/api/recipe/like", {
        method: "POST",
        body: "not-json",
      }),
      locals: { user: buildTestUser({ id: "user-3" }) },
    });

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Internal Server Error",
    });
    errorSpy.mockRestore();
  });
});
