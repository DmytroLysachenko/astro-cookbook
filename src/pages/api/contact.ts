import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { firstName, lastNamem, email, subject, message } =
    await request.json();

  console.log(firstName, lastNamem, email, subject, message);

  // Here can be added user subscription logic

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
