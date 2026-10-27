import { z } from "zod";
import { getEntry } from "astro:content";

export const recipeSlugSchema = z.string().trim().min(1).max(120);
export async function recipeExists(slug: string) {
  return Boolean(await getEntry("recipe", slug));
}
export const recipeMutationSchema = z.object({ recipeSlug: recipeSlugSchema });
export const recipeRatingSchema = recipeMutationSchema.extend({
  rating: z.number().int().min(1).max(5),
});
export const commentSchema = recipeMutationSchema.extend({
  commentText: z.string().trim().min(1).max(2000),
});
export const profileSchema = z.object({
  bio: z.string().trim().max(500),
});
export const avatarSchema = z.object({
  avatar: z
    .string()
    .max(2048)
    .regex(/^\/cooking-spot\/user-avatars\/[a-zA-Z0-9_./-]+$/)
    .refine((path) => !path.includes("..")),
});

export async function parseJson<T extends z.ZodTypeAny>(
  request: Request,
  schema: T,
) {
  try {
    return schema.safeParse(await request.json());
  } catch {
    return schema.safeParse(undefined);
  }
}

export function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
