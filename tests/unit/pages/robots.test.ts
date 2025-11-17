import { describe, expect, it } from "vitest";

import { GET as getRobotsTxt } from "@/pages/robots.txt";

describe("robots.txt GET route", () => {
  it("returns robots.txt content with sitemap URL", async () => {
    const response = await getRobotsTxt({
      site: new URL("https://example.com/"),
    } as any);

    const text = await response.text();
    expect(text).toContain("User-agent: *");
    expect(text).toContain("Allow: /");
    expect(text).toContain("Sitemap: https://example.com/sitemap-index.xml");
  });
});
