import { z } from "zod";
import { SecuritySchema } from "./security";
import { VisibilitySchema } from "./visibility";

export const VRTSchema = z.object({
  securitySchema: SecuritySchema,
  visibilitySchema: VisibilitySchema,
});

export type IVRTSchema = z.infer<typeof VRTSchema>;
