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

export const WebSecurityForm = () => {
  const { control } = useFormContext<IVRTSchema>();

  const {
    fields: domainFields,
    append: appendDomain,
    remove: removeDomain,
  } = useFieldArray({
    control,
    //@ts-expect-error: Name not valid
    name: "securitySchema.domains",
  });

  return (
    <div className="space-y-4">
      {domainFields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <FormField
            control={control}
            name={`securitySchema.domains.${index}`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Domain {index + 1}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter domain URL (e.g., https://example.com)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {domainFields.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeDomain(index)}
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
        onClick={() => appendDomain("")}
        className="mt-2"
      >
        Add Domain
      </Button>
    </div>
  );
};
