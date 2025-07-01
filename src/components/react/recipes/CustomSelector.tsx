import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

interface SelectorProps {
  id: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Selector({
  id,
  options,
  defaultValue,
  onValueChange,
  className,
}: SelectorProps) {
  useEffect(() => {
    const loader = document.getElementById(`${id}-selector-loader`);
    if (loader) loader.style.display = "none";
  }, []);

  const handleValueChange = (value: string) => {
    if (onValueChange) {
      onValueChange(value);
    } else {
      const url = new URL(window.location.href);
      url.searchParams.set(id, value);
      window.location.replace(url.href);
    }
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
