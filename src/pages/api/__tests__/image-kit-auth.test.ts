import { describe, expect, it, vi } from "vitest";

import { GET as getImagekitAuth } from "../image-kit/auth";

const { mockGetAuthParams } = vi.hoisted(() => ({
  mockGetAuthParams: vi.fn(),
}));

vi.mock("@/lib/image-kit", () => ({
  imagekit: {
    getAuthenticationParameters: mockGetAuthParams,
  },
}));

describe("image-kit auth GET route", () => {
  it("returns auth parameters when successful", async () => {
    const params = { token: "token", signature: "sig" };
    mockGetAuthParams.mockReturnValueOnce(params);

    const response = await getImagekitAuth({} as any);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(params);
    expect(mockGetAuthParams).toHaveBeenCalled();
  });

  it("returns 500 on errors", async () => {
    mockGetAuthParams.mockImplementationOnce(() => {
      throw { message: "auth failed" };
    });

    const response = await getImagekitAuth({} as any);

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: { message: "auth failed" },
    });
  });
});
