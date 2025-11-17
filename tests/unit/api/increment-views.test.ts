import { describe, expect, it, vi } from "vitest";

import { POST as incrementViews } from "@/pages/api/increment-views";

const mocks = vi.hoisted(() => {
  const mockSelect = vi.fn().mockReturnThis();
  const mockFrom = vi.fn().mockReturnThis();
  const mockWhere = vi.fn().mockReturnThis();
  const mockUpdate = vi.fn().mockReturnThis();
  const mockSet = vi.fn().mockReturnThis();
  const mockInsert = vi.fn().mockReturnThis();
  const mockValues = vi.fn().mockReturnThis();

  return {
    mockSelect,
    mockFrom,
    mockWhere,
    mockUpdate,
    mockSet,
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

vi.mock("@/db/schema/views", () => ({
  views: {
    recipeSlug: "recipeSlug",
  },
}));

vi.mock("drizzle-orm", () => ({
  eq: vi.fn((a, b) => [a, b]),
}));

describe("increment views POST route", () => {
  it("returns 400 when recipeSlug is missing", async () => {
    const { mockSelect } = getMocks();
    const response = await incrementViews({
      request: new Request("http://localhost/api/increment-views", {
        method: "POST",
        body: JSON.stringify({}),
      }),
    } as any);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Recipe slug is required",
    });
    expect(mockSelect).not.toHaveBeenCalled();
  });

  it("updates existing view count", async () => {
    const { mockSelect, mockFrom, mockWhere, mockUpdate, mockSet } = getMocks();
    mockSelect.mockReturnValueOnce({
      from: mockFrom,
      where: mockWhere,
    });
    mockFrom.mockReturnValueOnce({
      where: mockWhere,
    });
    mockWhere.mockResolvedValueOnce([{ recipeSlug: "abc", count: 2 }]);

    mockUpdate.mockReturnValueOnce({
      set: mockSet,
      where: mockWhere,
    });

    const response = await incrementViews({
      request: new Request("http://localhost/api/increment-views", {
        method: "POST",
        body: JSON.stringify({ recipeSlug: "abc" }),
      }),
    } as any);

    expect(mockUpdate).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith({ count: 3 });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("inserts new view row when none exists", async () => {
    const { mockSelect, mockFrom, mockWhere, mockInsert, mockValues } =
      getMocks();
    mockSelect.mockReturnValueOnce({
      from: mockFrom,
      where: mockWhere,
    });
    mockFrom.mockReturnValueOnce({
      where: mockWhere,
    });
    mockWhere.mockResolvedValueOnce([]);

    mockInsert.mockReturnValueOnce({
      values: mockValues,
    });

    const response = await incrementViews({
      request: new Request("http://localhost/api/increment-views", {
        method: "POST",
        body: JSON.stringify({ recipeSlug: "abc" }),
      }),
    } as any);

    expect(mockInsert).toHaveBeenCalled();
    expect(mockValues).toHaveBeenCalledWith({ recipeSlug: "abc", count: 1 });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("returns 500 on errors", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { mockSelect } = getMocks();
    mockSelect.mockImplementationOnce(() => {
      throw new Error("db fail");
    });

    const response = await incrementViews({
      request: new Request("http://localhost/api/increment-views", {
        method: "POST",
        body: JSON.stringify({ recipeSlug: "abc" }),
      }),
    } as any);

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Internal Server Error",
    });

    errorSpy.mockRestore();
  });
});
