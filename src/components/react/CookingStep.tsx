// components/StepImage.tsx
import React from "react";

// Define the cooking action type as a union of string literals
type CookingAction =
  | "blending"
  | "boiling"
  | "cutting"
  | "deep-frying"
  | "frying"
  | "grating"
  | "grilling"
  | "grounding"
  | "microwave"
  | "mixing"
  | "multicooker"
  | "oven"
  | "seasoning"
  | "steaming"
  | "stewing"
  | "stirring"
  | "tendering"
  | "wait"
  | "wok";

interface StepStepProps {
  action: CookingAction; // Use the type here
  variant?: number; // Optional variant number for the image (e.g., 2, 3, etc.)
  className?: string; // Optional className for custom styling
}

const CookingStep: React.FC<StepStepProps> = ({
  action,
  variant,
  className,
}) => {
  // Construct the image name based on the action and variant
  const imageName = variant ? `${action}-${variant}.jpg` : `${action}.jpg`;
  const imagePath = `/assets/steps/${imageName}`;

  // Fallback image in case the requested image doesn't exist
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = "/steps/default.jpg"; // Fallback image
  };

  return (
    <div className={`step-image ${className || ""}`}>
      <img src={imagePath} alt={`${action} step`} />
    </div>
  );
};

export default CookingStep;
