import type { APIRoute } from "astro";
import { getUser, updateUser } from "@/services/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { userId, avatar } = await request.json();
    console.log(userId, avatar);
    if (!avatar || !userId) {
      return new Response(JSON.stringify({ error: "Bad request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await getUser(userId, "id");

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newUser = await updateUser(userId, { avatar }, "id");

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
