import type { APIRoute } from "astro";

import { imagekit } from "@/lib/image-kit";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const response = imagekit.getAuthenticationParameters();

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Unable to authorize upload" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      },
    );
  }
};
