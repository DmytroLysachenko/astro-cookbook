import { URL } from "node:url";

const input = process.argv[2];
if (!input) {
  console.error("Usage: pnpm audit:deployment https://your-domain.example");
  process.exit(2);
}

const origin = new URL(input);
if (origin.protocol !== "https:" || origin.username || origin.password) {
  console.error("Pass the HTTPS origin of the deployed site.");
  process.exit(2);
}

const base = origin.origin;
const results = [];

async function get(path) {
  const response = await fetch(new URL(path, base), {
    redirect: "manual",
    signal: AbortSignal.timeout(15_000),
  });
  return { response, body: await response.text() };
}

function check(label, condition, detail) {
  results.push({ label, passed: Boolean(condition), detail });
}

try {
  const home = await get("/");
  check("Home responds", home.response.status === 200, home.response.status);
  check(
    "Canonical uses deployed origin",
    home.body.includes(`<link rel="canonical" href="${base}/"`),
  );
  check(
    "Response has MIME protection",
    home.response.headers.get("x-content-type-options") === "nosniff",
  );
  check(
    "Response has referrer policy",
    home.response.headers.get("referrer-policy") ===
      "strict-origin-when-cross-origin",
  );

  const assetPath = home.body.match(
    /(?:href|src)="(\/_astro\/[^" ]+\.css)"/,
  )?.[1];
  if (assetPath) {
    const asset = await get(assetPath);
    check("Hashed CSS responds", asset.response.status === 200);
    check(
      "Hashed CSS has immutable cache",
      /max-age=31536000.*immutable/.test(
        asset.response.headers.get("cache-control") ?? "",
      ),
      asset.response.headers.get("cache-control"),
    );
  } else {
    check("Hashed CSS found in home HTML", false);
  }

  const recipe = await get("/recipes/pierogi/");
  check(
    "Recipe responds",
    recipe.response.status === 200,
    recipe.response.status,
  );
  check(
    "Recipe has structured data",
    /<script type="application\/ld\+json">[^<]*"@type":"Recipe"/.test(
      recipe.body,
    ),
  );

  const listing = await get("/recipes");
  check(
    "Recipe listing responds",
    listing.response.status === 200,
    listing.response.status,
  );
  const ingredients = await get("/ingredients");
  check(
    "Ingredients respond",
    ingredients.response.status === 200,
    ingredients.response.status,
  );

  const missing = await get("/__audit_missing_page__");
  check(
    "Missing page returns 404",
    missing.response.status === 404,
    missing.response.status,
  );
  const signing = await get("/api/image-kit/auth");
  check(
    "Anonymous upload signing is denied",
    signing.response.status === 401,
    signing.response.status,
  );
  check(
    "Upload authorization is never cached",
    /no-store/.test(signing.response.headers.get("cache-control") ?? ""),
    signing.response.headers.get("cache-control"),
  );

  for (const path of ["/robots.txt", "/sitemap-index.xml"]) {
    const resource = await get(path);
    check(
      `${path} responds`,
      resource.response.status === 200,
      resource.response.status,
    );
  }
} catch (error) {
  check("Deployment request completed", false, String(error));
}

for (const { label, passed, detail } of results) {
  console.log(
    `${passed ? "PASS" : "FAIL"} ${label}${detail === undefined ? "" : `: ${detail}`}`,
  );
}

const failed = results.filter(({ passed }) => !passed).length;
console.log(
  `${results.length - failed}/${results.length} checks passed for ${base}`,
);
if (failed) process.exitCode = 1;
