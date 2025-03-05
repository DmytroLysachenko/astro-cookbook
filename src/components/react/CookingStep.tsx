// components/StepImage.tsx
import { STEPS_IMAGES } from "@/constants";
import React from "react";

// Define the cooking action type as a union of string literals
type TPresetCookingAction = keyof typeof STEPS_IMAGES;

interface StepStepProps {
  action?: TPresetCookingAction; // Use the type here
  href?: string; // Optional href for linking to another page
  className?: string; // Optional className for custom styling
}

const CookingStep: React.FC<StepStepProps> = ({
  action = "default",
  href,
  className,
}) => {
  // Construct the image name based on the action and variant
  const imagePath = href ? href : STEPS_IMAGES[action];

  return (
    <div className={`step-image ${className || ""}`}>
      <img src={imagePath} alt={`${action} step`} />
    </div>
  );
};

export default CookingStep;
