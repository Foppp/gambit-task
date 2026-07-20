import { z } from "zod";

export const ApplicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  resourceIds: z.array(z.string()),
});

export const CreateApplicationInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().optional(),
  resourceIds: z.array(z.string()).min(1, "Select at least one resource"),
});

export type Application = z.infer<typeof ApplicationSchema>;
