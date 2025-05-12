import { useForm } from "react-hook-form";
import SecuritySection from "./sections/SecuritySection";
import { Form } from "../ui/form";
import VisibilitySection from "@/components/settings-form/sections/VisibilitySection";
import { zodResolver } from "@hookform/resolvers/zod";
import { VRTSchema } from "@/schemas";
import type { IVRTSchema } from "@/schemas";
import { Button } from "../ui/button";

const MyForm = () => {
  const form = useForm<IVRTSchema>({
    //@ts-expect-error: khai yar k error ho
    resolver: zodResolver(VRTSchema),
    defaultValues: {
      securitySchema: {
        securityType: "web",
        domains: [""],
      },
      visibilitySchema: {
        domains: [],
        visibilityType: "Category",
      },
    },
  });

  const onSubmit = (data: IVRTSchema) => {
    // The form will only submit if it meets the schema requirements
    // for the selected security type (web or mobile)
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form
        //@ts-expect-error: khai yar k error ho
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-6 space-y-8"
      >
        <SecuritySection />
        <VisibilitySection />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default MyForm;
