import type { APIRoute } from "astro";

import { imagekit } from "@/lib/image-kit";

export const GET: APIRoute = async () => {
  try {
    const response = imagekit.getAuthenticationParameters();

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
