import { z } from "zod";
import { packageValidator } from "./validators";

export const WebSecuritySchema = z.object({
  securityType: z.literal("web").default("web"),
  domains: z
    .array(z.string().url("Enter a valid domain URL"))
    .min(1, "Atleast one domain required")
    .default([]),
});

export const MobileSecuritySchema = z.object({
  securityType: z.literal("mobile").default("mobile"),
  packages: z
    .array(packageValidator)
    .min(1, "Atleast one package required")
    .default([]),
  apiKey: z.string().min(1, "API Key is required"),
});

export const SecuritySchema = z.discriminatedUnion("securityType", [
  WebSecuritySchema,
  MobileSecuritySchema,
]);

export type IWebSecurity = z.infer<typeof WebSecuritySchema>;
export type IMobileSecurity = z.infer<typeof MobileSecuritySchema>;
export type ISecurity = z.infer<typeof SecuritySchema>;
