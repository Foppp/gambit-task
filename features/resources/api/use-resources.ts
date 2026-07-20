import { useSuspenseQuery } from "@tanstack/react-query";
import { ResourcesResponseSchema } from "@/features/resources/schema";
import type { ResourceFilters } from "@/features/resources/schema";

export function buildResourcesQueryString(filters: ResourceFilters): string {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.provider) params.set("provider", filters.provider);
  if (filters.environment) params.set("environment", filters.environment);
  if (filters.criticality) params.set("criticality", filters.criticality);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
  return params.toString();
}

async function fetchResources(filters: ResourceFilters) {
  const queryString = buildResourcesQueryString(filters);
  const response = await fetch(`/api/resources${queryString ? `?${queryString}` : ""}`);
  if (!response.ok) {
    throw new Error("Failed to fetch resources");
  }
  const json = await response.json();
  return ResourcesResponseSchema.parse(json);
}

export function useResources(filters: ResourceFilters) {
  return useSuspenseQuery({
    queryKey: ["resources", filters],
    queryFn: () => fetchResources(filters),
  });
}
