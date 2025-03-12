import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type TSize = "default" | "sm" | "lg" | "icon";
type TVariant = "default" | "destructive" | "outline" | "secondary" | "ghost";

interface ButtonProps {
  title: string;
  handleClick?: () => void;
  icon?: React.ReactNode;
  isIconLeft?: boolean;
  className?: string;
  variant?: TVariant;
  size?: TSize;
  isLink?: boolean;
  href?: string;
}

const CustomButton = ({
  title,
  handleClick = () => {},
  icon,
  isIconLeft,
  variant = "default",
  size = "default",
  isLink,
  href,
  ...props
}: ButtonProps) => {
  return (
    <Button
      onClick={handleClick}
      className={cn(props.className)}
      variant={variant}
      size={size}
      asChild={isLink}
      {...props}
    >
      {isLink ? (
        <a href={href}>
          {isIconLeft && icon}
          {title}
          {!isIconLeft && icon}
        </a>
      ) : (
        <>
          {isIconLeft && icon}
          {title}
          {!isIconLeft && icon}
        </>
      )}
    </Button>
  );
};

export default CustomButton;
