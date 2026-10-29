# Cooking Spot

Cooking Spot is an Astro cookbook with 50 MDX recipes. Recipe pages are prerendered; the searchable listing, ingredient table, account page, and interaction endpoints run on demand. React islands handle sign-in, ratings, favorites, comments, and account editing.

## Stack

Astro 5, React 18, Tailwind CSS 4, Auth.js, Neon PostgreSQL with Drizzle, ImageKit, Vitest, Playwright, and Vercel. The [codebase and web quality audit](docs/audit-2026-10-18.md) records current findings and verification limits.

## Setup

Use Node.js 22 or newer and pnpm 11.11.0. Install with `corepack pnpm install` or `pnpm install`. Copy the variables below into `.env` and provide values for the services you use:

```dotenv
DATABASE_URL=
AUTH_TRUST_HOST=true
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
IMAGEKIT_URL_ENDPOINT=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
BASE_URL=http://localhost:4321
API_BASE_URL=http://localhost:4321/api
```

`BASE_URL` must be the public production origin in deployment so canonical URLs, social images, and the sitemap use the right host. OAuth callbacks and ImageKit require working credentials. Keep secrets in your deployment environment; never commit `.env`.

```sh
pnpm dev
pnpm check
pnpm lint:eslint
pnpm test
pnpm build
pnpm test:e2e --project=chromium
pnpm audit:deployment https://your-production-domain.example
```

The contact page links directly to the maintainer's email. The former contact and newsletter endpoints return HTTP 501 because no delivery or subscription provider is configured. This avoids reporting that messages were sent or subscriptions saved when they were not.

## Content and behavior

Recipes live in `src/content/recipes`. `src/content.config.ts` validates their frontmatter. The recipe query module in `src/lib/recipe-query.ts` handles filtering, sorting, and pagination. `src/lib/recipe-images.ts` resolves preview images with a fallback. API input schemas in `src/lib/api-input.ts` validate mutations before database writes.

Static recipe cards do not depend on the database. Ratings, comments, favorites, views, user profiles, and ingredients do. A production build no longer writes to the database.

## Deployment checks

Before publishing, run the commands above and check the deployed home, listing, and recipe pages with Lighthouse and Search Console. Verify real-user LCP, INP, and CLS at the 75th percentile; local builds cannot establish field performance. `vercel.json` adds browser caching for fingerprinted `/_astro/` assets and basic security headers; verify those headers, HTTPS, and compression on the actual deployment.
