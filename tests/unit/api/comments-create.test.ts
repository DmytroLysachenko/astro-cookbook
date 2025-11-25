import { describe, expect, it, vi } from "vitest";

import { POST as createComment } from "@/pages/api/comments/create";

const mocks = vi.hoisted(() => {
  const mockInsert = vi.fn().mockReturnThis();
  const mockValues = vi.fn().mockReturnThis();
  const mockReturning = vi.fn();

  return { mockInsert, mockValues, mockReturning };
});
function getMocks() {
  return mocks;
}

vi.mock("@/db", () => ({
  db: {
    insert: getMocks().mockInsert,
  },
}));

vi.mock("@/db/schema/comments", () => ({
  comments: "comments-table",
}));

describe("comments POST route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inserts a comment and returns the created row", async () => {
    const { mockInsert, mockValues, mockReturning } = getMocks();
    const created = [{ id: 1, recipeSlug: "abc", commentText: "Great!" }];
    mockReturning.mockResolvedValueOnce(created);

    mockInsert.mockReturnValueOnce({
      values: mockValues,
      returning: mockReturning,
    });
    mockValues.mockReturnValueOnce({
      returning: mockReturning,
    });

    const response = await createComment({
      request: new Request("http://localhost/api/comments", {
        method: "POST",
        body: JSON.stringify({ recipeSlug: "abc", commentText: "Great!" }),
      }),
      locals: { user: { id: 42 } },
    } as any);

    expect(mockInsert).toHaveBeenCalledWith("comments-table");
    expect(mockValues).toHaveBeenCalledWith({
      recipeSlug: "abc",
      userId: 42,
      commentText: "Great!",
    });
    expect(mockReturning).toHaveBeenCalled();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(created[0]);
  });

  it("handles errors and returns 500", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { mockInsert } = getMocks();
    mockInsert.mockImplementationOnce(() => {
      throw new Error("db error");
    });

    const response = await createComment({
      request: new Request("http://localhost/api/comments", {
        method: "POST",
        body: JSON.stringify({ recipeSlug: "abc", commentText: "Oops" }),
      }),
      locals: { user: { id: 1 } },
    } as any);

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Internal Server Error",
    });

    errorSpy.mockRestore();
  });

  it("returns 500 when user is missing and stops before inserting values", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { mockInsert, mockValues } = getMocks();

    const response = await createComment({
      request: new Request("http://localhost/api/comments", {
        method: "POST",
        body: JSON.stringify({ recipeSlug: "abc", commentText: "Hi" }),
      }),
      locals: { user: undefined },
    } as any);

    expect(response.status).toBe(500);
    expect(mockInsert).toHaveBeenCalledTimes(1);
    expect(mockValues).not.toHaveBeenCalled();
    await expect(response.json()).resolves.toEqual({
      error: "Internal Server Error",
    });

    errorSpy.mockRestore();
  });
});
