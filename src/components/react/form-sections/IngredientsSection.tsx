"use client";

import type React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";
import { Combobox } from "../../ui/combobox";

interface IngredientsSectionProps {
  ingredients: Array<{ id: string; name: string }>;
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({
  ingredients,
}) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Ingredients</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-end space-x-4">
          <FormField
            control={control}
            name={`ingredients.${index}.id`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Ingredient</FormLabel>
                <FormControl>
                  <Combobox
                    options={ingredients}
                    value={field.value}
                    onSelect={(value) => field.onChange(value)}
                    placeholder="Select an ingredient"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`ingredients.${index}.quantity`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., 2 cups" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`ingredients.${index}.grams`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Grams</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseFloat(e.target.value))
                    }
                    placeholder="e.g., 250"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ id: "", quantity: "", grams: 0, name: "" })}
      >
        Add Ingredient
      </Button>
    </div>
  );
};

export default IngredientsSection;
