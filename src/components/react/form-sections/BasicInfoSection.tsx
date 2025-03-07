"use client";

import type React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
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
  const { control, setValue } = useFormContext();

  // const handleImageUpload = (imageUrl: string) => {
  //   setValue("mainImage", imageUrl);
  // };

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
            <FormDescription>
              Choose a descriptive title for your recipe.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="mainImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Main Image URL</FormLabel>
            <FormControl>
              {/* <ImageKitUploader
                onUpload={handleImageUpload}
                value={field.value as string}
              /> */}
            </FormControl>
            <FormDescription>
              Upload or provide a URL for the main image of your recipe.
            </FormDescription>
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
            <FormDescription>
              Write a brief description for SEO purposes.
            </FormDescription>
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

      <FormField
        control={control}
        name="categories"
        render={() => (
          <FormItem>
            <FormLabel>Categories (select up to 3)</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <FormField
                  key={category.id}
                  control={control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={category.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(category.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, category.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== category.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {category.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

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
