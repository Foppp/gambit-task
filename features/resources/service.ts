import { mockResources } from "./mock-data";
import { applyResourceFilters } from "./filtering";
import type { Resource, ResourceFilters } from "./schema";

const MOCK_LATENCY_MS = 300;

export async function getResources(filters: ResourceFilters): Promise<Resource[]> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));
  return applyResourceFilters(mockResources, filters);
}
