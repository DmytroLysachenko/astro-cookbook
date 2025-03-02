import type { CollectionEntry } from "astro:content";

export type TRecipeCollectionEntry = CollectionEntry<"recipe">;

export type TRecipeCollectionData = TRecipeCollectionEntry["data"];

export type SuccessResult<T> = {
  success: true;
  data: T;
};

export type ErrorResult = {
  success: false;
  error: string;
};

export type Result<T> = SuccessResult<T> | ErrorResult;
