import type { APIContext, APIRoute } from "astro";
import type { TUser } from "@/services/auth";

type ContextOverrides = Partial<APIContext> & Pick<APIContext, "request">;

const noopGetActionResult: APIContext["getActionResult"] = () => undefined;
const noopCallAction = (() =>
  Promise.resolve(undefined as never)) as APIContext["callAction"];
const noopCsp: APIContext["csp"] = {
  insertDirective: () => {},
  insertStyleResource: () => {},
  insertStyleHash: () => {},
  insertScriptResource: () => {},
  insertScriptHash: () => {},
};

export const buildTestUser = (overrides?: Partial<TUser>): TUser => ({
  id: "user-id",
  name: "Test User",
  email: "test@example.com",
  avatar: null,
  bio: null,
  lastActive: null,
  createdAt: null,
  ...overrides,
});

const buildContext = (overrides: ContextOverrides): APIContext => {
  const url = overrides.url ?? new URL(overrides.request.url);

  return {
    // Required at call sites
    request: overrides.request,
    url,
    locals: overrides.locals ?? ({} as APIContext["locals"]),
    params: overrides.params ?? {},
    props: overrides.props ?? {},

    // Sensible defaults for unused fields
    site: overrides.site ?? new URL(url.origin),
    generator: overrides.generator ?? "test-suite",
    redirect:
      overrides.redirect ??
      ((path, status) => Response.redirect(path.toString(), status)),
    rewrite:
      overrides.rewrite ??
      (async (payload) =>
        Response.redirect(
          typeof payload === "string" ? payload : payload.toString(),
          307,
        )),
    preferredLocale: overrides.preferredLocale,
    preferredLocaleList: overrides.preferredLocaleList,
    currentLocale: overrides.currentLocale,
    routePattern: overrides.routePattern ?? url.pathname,
    cookies: overrides.cookies ?? ({} as APIContext["cookies"]),
    originPathname: overrides.originPathname ?? url.pathname,
    isPrerendered: overrides.isPrerendered ?? false,
    clientAddress: overrides.clientAddress ?? "127.0.0.1",
    csp: overrides.csp ?? noopCsp,
    session: overrides.session,
    getActionResult: overrides.getActionResult ?? noopGetActionResult,
    callAction: overrides.callAction ?? noopCallAction,
  };
};

export const runApiRoute = (
  route: APIRoute,
  overrides: ContextOverrides,
): ReturnType<APIRoute> => {
  return route(buildContext(overrides));
};
