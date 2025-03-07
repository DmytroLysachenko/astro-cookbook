import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import type { IIngredient } from "@/types";

// Extended interface to include category information

interface IngredientsSectionProps {
  ingredients: IIngredient[];
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({
  ingredients,
}) => {
  const { control, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  // Group ingredients by category
  const ingredientsByCategory = React.useMemo(() => {
    const grouped: Record<string, IIngredient[]> = {};

    ingredients.forEach((ingredient) => {
      if (!grouped[ingredient.category]) {
        grouped[ingredient.category] = [];
      }
      grouped[ingredient.category].push(ingredient);
    });

    return grouped;
  }, [ingredients]);

  // Get unique categories
  const categories = React.useMemo(() => {
    return Object.keys(ingredientsByCategory);
  }, [ingredientsByCategory]);

  // Track selected categories for each ingredient
  const [selectedCategories, setSelectedCategories] = useState<
    Record<number, string>
  >({});

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Ingredients</h2>
      {fields.map((field, index) => {
        const selectedCategory = selectedCategories[index] || "";

        return (
          <div key={field.id} className="space-y-4 p-4 border rounded-md">
            <div className="flex items-end space-x-4">
              <FormItem className="flex-1">
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => {
                    // Update selected category
                    setSelectedCategories((prev) => ({
                      ...prev,
                      [index]: value,
                    }));
                    // Clear the ingredient selection when category changes
                    setValue(`ingredients.${index}.id`, "");
                  }}
                  value={selectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {selectedCategory && (
              <div className="flex items-end space-x-4">
                <FormField
                  control={control}
                  name={`ingredients.${index}.id`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Ingredient</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          // Set the name field based on the selected ingredient
                          const selectedIngredient = ingredientsByCategory[
                            selectedCategory
                          ].find((ing) => ing.id === value);
                          if (selectedIngredient) {
                            setValue(
                              `ingredients.${index}.name`,
                              selectedIngredient.name,
                            );
                          }
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an ingredient" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ingredientsByCategory[selectedCategory].map(
                            (ingredient) => (
                              <SelectItem
                                key={ingredient.id}
                                value={ingredient.id}
                              >
                                {ingredient.name}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex items-end space-x-4">
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
                    <FormLabel>Grams (approximate)</FormLabel>
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
            </div>
          </div>
        );
      })}

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
