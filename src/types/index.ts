import type { CollectionEntry } from "astro:content";

export type TRecipeCollectionEntry = CollectionEntry<"recipe">;

export type TRecipeCollectionData = TRecipeCollectionEntry["data"];
