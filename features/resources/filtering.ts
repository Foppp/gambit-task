import { CriticalitySchema } from "./schema";
import type { Criticality, Resource, ResourceFilters } from "./schema";

const CRITICALITY_RANK: Record<Criticality, number> = Object.fromEntries(
  CriticalitySchema.options.map((value, index) => [value, index])
) as Record<Criticality, number>;

function matchesResourceFilters(resource: Resource, filters: ResourceFilters): boolean {
  if (filters.provider && resource.provider !== filters.provider) return false;
  if (filters.environment && resource.environment !== filters.environment) return false;
  if (filters.criticality && resource.criticality !== filters.criticality) return false;
  if (filters.search) {
    const search = filters.search.toLowerCase();
    const haystack = [resource.name, resource.type, resource.owner, ...resource.tags]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(search)) return false;
  }
  return true;
}

function compareResources(a: Resource, b: Resource, sortBy: NonNullable<ResourceFilters["sortBy"]>): number {
  if (sortBy === "criticality") {
    return CRITICALITY_RANK[a.criticality] - CRITICALITY_RANK[b.criticality];
  }
  if (sortBy === "openIssues") {
    return a.openIssues - b.openIssues;
  }
  return a[sortBy].localeCompare(b[sortBy]);
}

function sortResources(resources: Resource[], filters: ResourceFilters): Resource[] {
  if (!filters.sortBy) return resources;
  const sortBy = filters.sortBy;
  const direction = filters.sortOrder === "desc" ? -1 : 1;
  return [...resources].sort((a, b) => direction * compareResources(a, b, sortBy));
}

export function applyResourceFilters(resources: Resource[], filters: ResourceFilters): Resource[] {
  return sortResources(resources.filter((resource) => matchesResourceFilters(resource, filters)), filters);
}
