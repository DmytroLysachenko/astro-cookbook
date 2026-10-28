import type { APIRoute } from "astro";

import { updateUser } from "@/services/auth";
import { avatarSchema, jsonResponse, parseJson } from "@/lib/api-input";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals: { user } }) => {
  try {
    if (!user) return jsonResponse({ error: "Unauthorized" }, 401);
    const parsed = await parseJson(request, avatarSchema);
    if (!parsed.success)
      return jsonResponse({ error: "Invalid avatar URL" }, 400);
    const newUser = await updateUser(
      user.id,
      { avatar: parsed.data.avatar },
      "id",
    );
    return jsonResponse(newUser);
  } catch (error) {
    console.error("Error updating avatar:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
};
