import { Heart } from "lucide-react";

const AddToFavoriteButton = ({ id }: { id: string }) => {
  return (
    <button
      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
      onClick={() => {}}
    >
      <Heart className="w-5 h-5" />
      <span className="sr-only">Add to favorites</span>
    </button>
  );
};

export default AddToFavoriteButton;
