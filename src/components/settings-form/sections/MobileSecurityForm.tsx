import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import type { IVRTSchema } from "@/schemas";

export const MobileSecurityForm = () => {
  const { control } = useFormContext<IVRTSchema>();

  const {
    fields: packageFields,
    append: appendPackage,
    remove: removePackage,
  } = useFieldArray({
    control,
    //@ts-expect-error: Name not valid
    name: "securitySchema.packages",
  });

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="securitySchema.apiKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>API Key</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="password"
                placeholder="Enter your API key"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        {packageFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <FormField
              control={control}
              name={`securitySchema.packages.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Package {index + 1}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter package name (e.g., com.example.app) or store URL"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {packageFields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removePackage(index)}
                className="h-10 w-10 mt-8"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => appendPackage("")}
          className="mt-2"
        >
          Add Package
        </Button>
      </div>
    </div>
  );
};
