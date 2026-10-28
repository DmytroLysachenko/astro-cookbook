import type { APIRoute } from "astro";

import { updateUser } from "@/services/auth";
import { jsonResponse, parseJson, profileSchema } from "@/lib/api-input";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals: { user } }) => {
  try {
    if (!user) return jsonResponse({ error: "Unauthorized" }, 401);
    const parsed = await parseJson(request, profileSchema);
    if (!parsed.success) return jsonResponse({ error: "Invalid bio" }, 400);
    const newUser = await updateUser(user.id, { bio: parsed.data.bio }, "id");
    return jsonResponse(newUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
};
