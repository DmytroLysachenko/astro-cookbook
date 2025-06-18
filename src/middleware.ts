import { defineMiddleware, sequence } from "astro:middleware";
import { getSession } from "auth-astro/server";
import { getUser } from "./services/auth";
import { PRIVATE_API_ROUTES, PRIVATE_ROUTES } from "./constants";

export const authMiddleware = defineMiddleware(async (context, next) => {
  const { url, request } = context;

  const isPrivateRoute = PRIVATE_ROUTES.includes(url.pathname);
  const isPrivateApiRoute = PRIVATE_API_ROUTES.includes(url.pathname);

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
