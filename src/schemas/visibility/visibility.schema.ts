import { z } from "zod";

export const VisibilitySchema = z.object({
  visibilityType: z.enum(["Category", "Enterprise"]).default("Category"),

  domains: z
    .array(z.string().url("Enter a valid domain URL"))
    .min(1, "At least one domain is required")
    .default([]),
});

export type IVisibility = z.infer<typeof VisibilitySchema>;
