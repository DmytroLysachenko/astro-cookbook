import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST as incrementViews } from "@/pages/api/increment-views";
import { runApiRoute } from "./test-utils";

const mocks = vi.hoisted(() => ({
  insert: vi.fn(),
  values: vi.fn(),
  upsert: vi.fn(),
}));

vi.mock("@/db", () => ({ db: { insert: mocks.insert } }));
vi.mock("astro:content", () => ({
  getEntry: vi.fn(async (_collection: string, slug: string) =>
    slug === "missing" ? undefined : { id: slug },
  ),
}));
vi.mock("@/db/schema/views", () => ({
  views: { recipeSlug: "recipeSlug", count: "count" },
}));
vi.mock("drizzle-orm", () => ({
  sql: (parts: TemplateStringsArray, ...values: unknown[]) => ({
    parts,
    values,
  }),
}));

const request = (body: unknown) =>
  new Request("http://localhost/api/increment-views", {
    method: "POST",
    body: JSON.stringify(body),
  });

describe("increment views POST route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.insert.mockReturnValue({ values: mocks.values });
    mocks.values.mockReturnValue({ onConflictDoUpdate: mocks.upsert });
  });

  it("rejects a missing or blank slug before a database write", async () => {
    for (const body of [{}, { recipeSlug: " " }]) {
      const response = await runApiRoute(incrementViews, {
        request: request(body),
      });
      expect(response.status).toBe(400);
    }
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("uses one atomic upsert for a valid slug", async () => {
    const response = await runApiRoute(incrementViews, {
      request: request({ recipeSlug: "pierogi" }),
    });
    expect(response.status).toBe(200);
    expect(mocks.values).toHaveBeenCalledWith({
      recipeSlug: "pierogi",
      count: 1,
    });
    expect(mocks.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ target: "recipeSlug" }),
    );
  });

  it("does not create view rows for unknown recipes", async () => {
    const response = await runApiRoute(incrementViews, {
      request: request({ recipeSlug: "missing" }),
    });
    expect(response.status).toBe(404);
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("returns a server error if persistence fails", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    mocks.insert.mockImplementationOnce(() => {
      throw new Error("db down");
    });
    const response = await runApiRoute(incrementViews, {
      request: request({ recipeSlug: "pierogi" }),
    });
    expect(response.status).toBe(500);
    spy.mockRestore();
  });
});
