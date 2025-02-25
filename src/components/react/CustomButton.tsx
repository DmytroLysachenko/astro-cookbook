import React from "react";
import { Button } from "../ui/button";

interface ButtonProps {
  title: string;
  handleClick: () => void;
  icon?: React.ReactNode;
  isIconLeft?: boolean;
  className?: string;
}

const CustomButton = ({
  title,
  handleClick,
  icon,
  isIconLeft,
  ...props
}: ButtonProps) => {
  return (
    <>
      <Button onClick={handleClick} {...props}>
        {isIconLeft && icon}
        {title}
        {!isIconLeft && icon}
      </Button>
    </>
  );
};

export default CustomButton;
