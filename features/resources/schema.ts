import { z } from "zod";

export const ProviderSchema = z.enum(["AWS", "GCP", "Azure"]);
export const EnvironmentSchema = z.enum(["production", "staging", "development"]);
export const CriticalitySchema = z.enum(["low", "medium", "high", "critical"]);

export const SortableFieldSchema = z.enum([
  "name",
  "type",
  "provider",
  "environment",
  "criticality",
  "owner",
  "openIssues",
]);
export const SortOrderSchema = z.enum(["asc", "desc"]);

export const ResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  provider: ProviderSchema,
  region: z.string(),
  environment: EnvironmentSchema,
  criticality: CriticalitySchema,
  owner: z.string(),
  tags: z.array(z.string()),
  openIssues: z.number(),
});

export const ResourceFiltersSchema = z.object({
  search: z.string().optional(),
  provider: ProviderSchema.optional(),
  environment: EnvironmentSchema.optional(),
  criticality: CriticalitySchema.optional(),
  sortBy: SortableFieldSchema.optional(),
  sortOrder: SortOrderSchema.optional(),
});

export const ResourcesResponseSchema = z.object({
  data: ResourceSchema.array(),
  total: z.number(),
});

export type Provider = z.infer<typeof ProviderSchema>;
export type Environment = z.infer<typeof EnvironmentSchema>;
export type Criticality = z.infer<typeof CriticalitySchema>;
export type SortableField = z.infer<typeof SortableFieldSchema>;
export type SortOrder = z.infer<typeof SortOrderSchema>;
export type Resource = z.infer<typeof ResourceSchema>;
export type ResourceFilters = z.infer<typeof ResourceFiltersSchema>;

export interface SortState {
  field: SortableField;
  order: SortOrder;
}
