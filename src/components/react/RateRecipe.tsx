import { useState } from "react";

const StarRating = ({
  recipeId,
  userId,
  initialRating = 0,
}: {
  recipeId: string;
  userId: string;
  initialRating?: number;
}) => {
  const [rating, setRating] = useState(initialRating);

  const rateRecipe = async (newRating: number) => {
    try {
      const response = await fetch(`/api/rate-recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, recipeId, rating: newRating }),
      });

      if (response.ok) {
        setRating(newRating);
      } else {
        console.error("Failed to rate/unrate recipe");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <p>Rate this recipe:</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((starRating) => (
          <button
            key={starRating}
            data-rating={starRating}
            type="button"
            onClick={async () => await rateRecipe(starRating)}
            style={{ cursor: "pointer", border: "none", background: "none" }}
          >
            <svg
              className="size-10"
              fill={rating >= starRating ? "currentColor" : "none"}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "24px", height: "24px" }}
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                stroke={rating >= starRating ? "none" : "gray"}
                strokeWidth="1.5"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
