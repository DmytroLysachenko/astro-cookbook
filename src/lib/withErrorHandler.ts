import { type Result } from "@/types";

export const withErrorHandler = async <T>(
  fn: () => Promise<T>,
): Promise<Result<T>> => {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    console.error("Error in service:", error); // Log the error for debugging
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
