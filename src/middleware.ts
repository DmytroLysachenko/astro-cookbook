// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";
import { getUser } from "./services/auth";

export const authMiddleware = defineMiddleware(async (context, next) => {
  if (
    (context.routePattern.startsWith("/api/") &&
      !context.routePattern.includes("auth") &&
      !context.routePattern.includes("increment-views")) ||
    context.routePattern.includes("my-profile")
  ) {
    const session = await getSession(context.request);

    if (!session || !session.user || !session.user.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (Date.parse(session.expires) < Date.now()) {
      return new Response(JSON.stringify({ error: "Session expired" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await getUser(session.user.email, "email");

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    context.locals.user = user;
  }

  return next();
});

export const onRequest = authMiddleware;
