import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GET as getComments } from "@/pages/api/comments/index";
import { runApiRoute } from "./test-utils";

const mocks = vi.hoisted(() => {
  const mockOffset = vi.fn();
  const mockLimit = vi.fn().mockReturnThis();
  const mockOrderBy = vi.fn().mockReturnThis();
  const mockWhere = vi.fn().mockReturnThis();
  const mockLeftJoin = vi.fn().mockReturnThis();
  const mockFrom = vi.fn().mockReturnThis();
  const mockSelect = vi.fn().mockReturnValue({
    from: mockFrom,
    leftJoin: mockLeftJoin,
    where: mockWhere,
    orderBy: mockOrderBy,
    limit: mockLimit,
    offset: mockOffset,
  });

  return {
    mockOffset,
    mockLimit,
    mockOrderBy,
    mockWhere,
    mockLeftJoin,
    mockFrom,
    mockSelect,
  };
});

const { mockOffset, mockLimit, mockSelect } = mocks;

vi.mock("@/db", () => ({
  db: {
    select: mocks.mockSelect,
  },
}));

vi.mock("drizzle-orm", () => ({
  desc: vi.fn((value) => value),
  eq: vi.fn((a, b) => [a, b]),
}));

vi.mock("@/db/schema/comments", () => ({
  comments: {
    id: "id",
    commentText: "commentText",
    createdAt: "createdAt",
    userId: "userId",
    recipeSlug: "recipeSlug",
  },
}));

vi.mock("@/db/schema/users", () => ({
  users: {
    id: "id",
    name: "name",
    avatar: "avatar",
  },
}));

describe("comments GET route", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("returns 400 when recipeSlug is missing", async () => {
    const response = await runApiRoute(getComments, {
      request: new Request("http://localhost/api/comments"),
      url: new URL("http://localhost/api/comments"),
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Recipe slug is required",
    });
    expect(mockSelect).not.toHaveBeenCalled();
  });

  it("returns fetched comments with pagination applied", async () => {
    const mockComments = [
      {
        id: 1,
        commentText: "Nice recipe",
        createdAt: "2025-02-01T00:00:00.000Z",
        user: { id: 2, name: "Sam", avatar: "avatar.png" },
      },
    ];

    mockOffset.mockResolvedValueOnce(mockComments);

    const response = await runApiRoute(getComments, {
      request: new Request(
        "http://localhost/api/comments?recipeSlug=abc&page=2&limit=5",
      ),
      url: new URL(
        "http://localhost/api/comments?recipeSlug=abc&page=2&limit=5",
      ),
    });

    expect(mockSelect).toHaveBeenCalledWith({
      id: "id",
      commentText: "commentText",
      createdAt: "createdAt",
      user: { id: "id", name: "name", avatar: "avatar" },
    });
    expect(mockLimit).toHaveBeenCalledWith(5);
    expect(mockOffset).toHaveBeenCalledWith(5);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(mockComments);
  });

  it("returns 500 when database query fails", async () => {
    const dbError = new Error("DB exploded");
    mockOffset.mockRejectedValueOnce(dbError);

    const response = await runApiRoute(getComments, {
      request: new Request("http://localhost/api/comments?recipeSlug=abc"),
      url: new URL("http://localhost/api/comments?recipeSlug=abc"),
    });

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Internal Server Error",
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching comments:",
      dbError,
    );
  });
});
