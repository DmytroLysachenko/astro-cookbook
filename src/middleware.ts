import { defineMiddleware, sequence } from "astro:middleware";
import { getSession } from "auth-astro/server";
import type { TUser } from "./services/auth";
import { getUser } from "./services/auth";
import { PRIVATE_API_ROUTES, PRIVATE_ROUTES } from "./constants";
import { PLAYWRIGHT_TEST_USER_DEFAULTS } from "./constants/test-user";

const buildPlaywrightUser = (email: string): TUser => ({
  id: import.meta.env.PLAYWRIGHT_TEST_USER_ID ?? PLAYWRIGHT_TEST_USER_DEFAULTS.id,
  name:
    import.meta.env.PLAYWRIGHT_TEST_USER_NAME ?? PLAYWRIGHT_TEST_USER_DEFAULTS.name,
  email,
  avatar:
    import.meta.env.PLAYWRIGHT_TEST_USER_AVATAR ?? PLAYWRIGHT_TEST_USER_DEFAULTS.avatar,
  bio: import.meta.env.PLAYWRIGHT_TEST_USER_BIO ?? PLAYWRIGHT_TEST_USER_DEFAULTS.bio,
  lastActive: new Date(),
  createdAt: new Date(),
});

export const authMiddleware = defineMiddleware(async (context, next) => {
  const { url, request } = context;

  const isPrivateRoute = PRIVATE_ROUTES.includes(url.pathname);
  const isPrivateApiRoute = PRIVATE_API_ROUTES.includes(url.pathname);
  const testUserHeader = request.headers.get("x-playwright-user-email");

  if (import.meta.env.DEV && testUserHeader) {
    context.locals.user = buildPlaywrightUser(testUserHeader);

    if (isPrivateRoute || isPrivateApiRoute) {
      return next();
    }
  }

  if (isPrivateRoute || isPrivateApiRoute) {
    const session = await getSession(request);

    if (!session || !session.user || !session.user.email) {
      if (isPrivateApiRoute) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return Response.redirect(new URL("/", url.origin), 302);
      }
    }

    if (Date.parse(session.expires) < Date.now()) {
      if (isPrivateApiRoute) {
        return new Response(JSON.stringify({ error: "Session expired" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return Response.redirect(new URL("/", url.origin), 302);
      }
    }

    const user = await getUser(session.user.email, "email");

    if (!user) {
      if (isPrivateApiRoute) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return Response.redirect(new URL("/", url.origin), 302);
      }
    }

    context.locals.user = user;
  }

  return next();
});

export const notFoundMiddleware = defineMiddleware(async (context, next) => {
  const response = await next();

  if (response.status === 404 && !context.url.pathname.startsWith("/api")) {
    return Response.redirect(new URL("/", context.url.origin), 302);
  }

  return response;
});

export const onRequest = sequence(authMiddleware, notFoundMiddleware);
