import type { ImageMetadata } from "astro";

const previews = import.meta.glob<{ default: ImageMetadata }>(
  "/src/images/previews/*.{png,jpg,jpeg,webp}",
  { eager: true },
);
const steps = import.meta.glob<{ default: ImageMetadata }>(
  "/src/images/steps/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

/** Resolve a trusted content image with a stable fallback. */
export function getRecipePreview(filename: string): ImageMetadata {
  return (
    previews[`/src/images/previews/${filename}`]?.default ??
    previews["/src/images/previews/default.webp"].default
  );
}

export function getCookingStep(action: string): ImageMetadata {
  return steps[`/src/images/steps/${action}.webp`]?.default ?? steps["/src/images/steps/default.webp"].default;
}
