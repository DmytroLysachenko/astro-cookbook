import type { APIRoute } from "astro";
import { updateUser } from "@/services/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals: { user } }) => {
  try {
    const { bio, name, email } = await request.json();

    if (!bio) {
      return new Response(JSON.stringify({ error: "Bad request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newUser = await updateUser(user.id, { bio, name, email }, "id");

    return new Response(JSON.stringify(newUser), {
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
