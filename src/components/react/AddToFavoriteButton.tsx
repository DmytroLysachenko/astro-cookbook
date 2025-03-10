import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";

const AddToFavoriteButton = ({
  slug,
  initiallyIsLiked,
}: {
  slug: string;
  initiallyIsLiked: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(initiallyIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/recipe/like", {
        method: "POST",
        body: JSON.stringify({ recipeSlug: slug }),
      });
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={cn(
        "rounded-full hover:scale-110 transition-all duration-300 cursor-pointer",
        isLiked
          ? " text-red-500 hover:text-red-300 "
          : "bg-transparent text-gray-400 hover:text-red-400 ",
      )}
      type="button"
      onClick={handleClick}
      disabled={isLoading}
    >
      <Heart className="w-8 h-8" fill={isLiked ? "currentColor" : "none"} />
      <span className="sr-only">Add to favorites</span>
    </button>
  );
};

export default AddToFavoriteButton;
