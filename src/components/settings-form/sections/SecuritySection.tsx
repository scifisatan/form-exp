import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { WebSecurityForm } from "@/components/settings-form/sections/WebSecurityForm";
import { MobileSecurityForm } from "@/components/settings-form/sections/MobileSecurityForm";
import type { ISecurity } from "@/schemas/security/security.schema";

const SecuritySection = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<{ securitySchema: ISecurity }>();

  const securityType = watch("securitySchema.securityType", "web") as
    | "web"
    | "mobile";

  const handleTabChange = (value: string) => {
    const newType = value as "web" | "mobile";
    setValue("securitySchema.securityType", newType, { shouldValidate: true });
    if (newType === "web") {
      setValue("securitySchema.packages", [], { shouldValidate: true });
      setValue("securitySchema.apiKey", "", { shouldValidate: true });
    } else {
      setValue("securitySchema.domains", [], { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Security Settings</h3>
      {errors.root && (
        <p className="text-sm font-medium text-destructive">
          {errors.root.message}
        </p>
      )}

      {/* Hidden security type field */}
      <FormField
        control={control}
        name="securitySchema.securityType"
        render={({ field }) => <Input type="hidden" {...field} />}
      />

      <Tabs
        value={securityType}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="web">Website</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
        </TabsList>

        <TabsContent value="web">
          <WebSecurityForm />
        </TabsContent>

        <TabsContent value="mobile">
          <MobileSecurityForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecuritySection;
