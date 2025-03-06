import { imagekit } from "@/lib/image-kit";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const response = imagekit.getAuthenticationParameters();
    console.log(response);
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
