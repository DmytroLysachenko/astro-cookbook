import type React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface CookingStepsProps {
  stepsImages: Record<string, string>;
}

const CookingSteps: React.FC<CookingStepsProps> = ({ stepsImages }) => {
  const { control, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const handleImageUpload = (imageUrl: string, index: number) => {
    setValue(`steps.${index}.image`, imageUrl);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Cooking Steps</h2>

      {/* Introduction */}
      <FormField
        control={control}
        name="steps.0.content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Introduction</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Introduce your recipe" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Steps */}
      {fields.slice(1, -1).map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded-md">
          <FormField
            control={control}
            name={`steps.${index + 1}.content`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Step {index + 1}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={`Describe step ${index + 1}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`steps.${index + 1}.image`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Step Image</FormLabel>
                <FormControl>
                  <div className="flex space-x-4">
                    {/* <ImageKitUploader
                      onUpload={(url) => handleImageUpload(url, index + 1)}
                      value={field.value as string}
                    /> */}
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value as string}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a preset" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(stepsImages).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {index > 0 && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index + 1)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Step
            </Button>
          )}
        </div>
      ))}

      {/* Add Step Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ type: "step", content: "", image: "" })}
      >
        Add Step
      </Button>

      {/* Conclusion */}
      <FormField
        control={control}
        name={`steps.${fields.length - 1}.content`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Conclusion</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Conclude your recipe" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CookingSteps;
