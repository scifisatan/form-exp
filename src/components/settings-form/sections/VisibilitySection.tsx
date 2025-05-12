import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import type { IVRTSchema } from "@/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VisibilitySection = () => {
  const { control } = useFormContext<IVRTSchema>();

  const {
    fields: domainFields,
    append: appendDomain,
    remove: removeDomain,
  } = useFieldArray({
    control,
    //@ts-expect-error: Name not valid
    name: "visibilitySchema.domains",
  });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Visibility Settings</h3>

      <FormField
        control={control}
        name="visibilitySchema.visibilityType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Visibility Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Category">Category</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        {domainFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <FormField
              control={control}
              name={`visibilitySchema.domains.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Domain {index + 1}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter domain URL" />
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
    </div>
  );
};

export default VisibilitySection;
