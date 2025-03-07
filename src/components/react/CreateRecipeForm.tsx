import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import BasicInfo from "./form-sections/BasicInfoSection";
import IngredientsSection from "./form-sections/IngredientsSection";
import CookingSteps from "./form-sections/CookingStepsSection";
import type { IIngredient } from "@/types";
import { STEPS_IMAGES } from "@/constants";

interface CreateRecipeFormProps {
  cuisines: Array<{ id: string; name: string }>;
  categories: Array<{ id: string; name: string }>;
  languages: Array<{ code: string; name: string }>;
  ingredients: IIngredient[];
}

const recipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  mainImage: z.union([z.string().url(), z.instanceof(File)]),
  description: z.string().min(20, "Description must be at least 20 characters"),
  cookingTime: z.number().min(1, "Cooking time must be at least 1 minute"),
  portions: z.number().min(1, "Portions must be at least 1"),
  cuisine: z.string().min(1, "Please select a cuisine"),
  categories: z
    .array(z.string())
    .min(1, "Please select at least one category")
    .max(3, "Maximum 3 categories allowed"),
  language: z.string().min(2, "Please select a language"),
  ingredients: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.string().min(1, "Quantity is required"),
        grams: z.number().min(0, "Grams must be 0 or greater"),
        name: z.string().min(1, "Name is required"),
      }),
    )
    .min(1, "At least one ingredient is required"),
  steps: z
    .array(
      z.object({
        type: z.enum(["introduction", "step", "conclusion"]),
        content: z
          .string()
          .min(20, "Step content must be at least 20 characters"),
        image: z.union([z.string().url(), z.instanceof(File)]),
      }),
    )
    .min(3, "Recipe must have introduction, at least one step, and conclusion"),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;

const CreateRecipeForm: React.FC<CreateRecipeFormProps> = ({
  cuisines,
  categories,
  languages,
  ingredients,
}) => {
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [],
      steps: [
        { type: "introduction", content: "", image: "" },
        { type: "step", content: "", image: "" },
        { type: "conclusion", content: "", image: "" },
      ],
    },
  });

  const onSubmit = async (data: RecipeFormData) => {
    try {
      // Here you would typically handle file uploads and create the MDX content
      console.log(data);

      // Implement the API call and MDX generation here
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInfo
          cuisines={cuisines}
          categories={categories}
          languages={languages}
        />

        <IngredientsSection ingredients={ingredients} />

        <CookingSteps stepsImages={STEPS_IMAGES} />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button>Create Recipe</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateRecipeForm;
