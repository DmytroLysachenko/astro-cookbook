import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async () => {
  return new Response(
    JSON.stringify({ error: "Newsletter subscriptions are unavailable." }),
    {
      status: 501,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
