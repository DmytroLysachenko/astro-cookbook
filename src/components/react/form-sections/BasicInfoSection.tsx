import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { capitalize } from "@/lib/utils";

interface BasicInfoProps {
  cuisines: Array<{ id: string; name: string }>;
  categories: Array<{ id: string; name: string }>;
  languages: Array<{ code: string; name: string }>;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  cuisines,
  categories,
  languages,
}) => {
  const { control, setValue, watch } = useFormContext();
  const selectedCategories = watch("categories") || [];

  // const handleImageUpload = (imageUrl: string) => {
  //   setValue("mainImage", imageUrl);
  // };
  const handleCategoryChange = (checked: boolean, categoryId: string) => {
    if (checked) {
      // Add the category if it's not already selected
      if (!selectedCategories.includes(categoryId)) {
        // Limit to 3 categories
        if (selectedCategories.length < 3) {
          setValue("categories", [...selectedCategories, categoryId]);
        }
      }
    } else {
      // Remove the category
      setValue(
        "categories",
        selectedCategories.filter((id: string) => id !== categoryId),
      );
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recipe Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter recipe title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="mainImage"
        render={() => (
          <FormItem>
            <FormLabel>Main Image URL</FormLabel>
            <FormControl>
              {/* <ImageKitUploader
                onUpload={handleImageUpload}
                value={field.value as string}
              /> */}
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter a short description of your recipe"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-4">
        <FormField
          control={control}
          name="cookingTime"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Cooking Time (minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseInt(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="portions"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Portions</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseInt(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="cuisine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cuisine</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a cuisine" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cuisines.map((cuisine) => (
                  <SelectItem key={cuisine.id} value={cuisine.id}>
                    {cuisine.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormItem>
        <FormLabel>Categories (select up to 3)</FormLabel>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(checked as boolean, category.id)
                }
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {capitalize(category.name)}
              </label>
            </div>
          ))}
        </div>
        <FormMessage>
          {selectedCategories.length > 3 ? "Maximum 3 categories allowed" : ""}
        </FormMessage>
      </FormItem>

      <FormField
        control={control}
        name="language"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Language</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfo;
