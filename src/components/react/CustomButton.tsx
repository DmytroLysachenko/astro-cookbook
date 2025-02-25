import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type TSize = "default" | "sm" | "lg" | "icon";
type TVariant = "default" | "destructive" | "outline" | "secondary" | "ghost";
interface ButtonProps {
  title: string;
  handleClick: () => void;
  icon?: React.ReactNode;
  isIconLeft?: boolean;
  className?: string;
  variant?: TVariant;
  size?: TSize;
}

const CustomButton = ({
  title,
  handleClick,
  icon,
  isIconLeft,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) => {
  return (
    <>
      <Button
        onClick={handleClick}
        className={cn("cursor-pointer", props.className)}
        variant={variant}
        size={size}
        {...props}
      >
        {isIconLeft && icon}
        {title}
        {!isIconLeft && icon}
      </Button>
    </>
  );
};

export default CustomButton;
