"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { FilterBar } from "./filter-bar";
import { ResourceTable } from "./resource-table";
import { CreateApplicationDialog } from "./create-application-dialog";
import { buildResourcesQueryString, useResources } from "@/features/resources/api/use-resources";
import { applyResourceFilters } from "@/features/resources/filtering";
import {
  CriticalitySchema,
  EnvironmentSchema,
  ProviderSchema,
  SortableFieldSchema,
  SortOrderSchema,
} from "@/features/resources/schema";
import type {
  Criticality,
  Environment,
  Provider,
  ResourceFilters,
  SortableField,
  SortOrder,
  SortState,
} from "@/features/resources/schema";

function readFiltersFromSearch(search: string): ResourceFilters {
  const params = new URLSearchParams(search);
  return {
    search: params.get("search") ?? undefined,
    provider: ProviderSchema.safeParse(params.get("provider")).data,
    environment: EnvironmentSchema.safeParse(params.get("environment")).data,
    criticality: CriticalitySchema.safeParse(params.get("criticality")).data,
    sortBy: SortableFieldSchema.safeParse(params.get("sortBy")).data,
    sortOrder: SortOrderSchema.safeParse(params.get("sortOrder")).data,
  };
}

export function ResourcesExplorer() {
  const pathname = usePathname();
  const router = useRouter();
  const initialSearchParams = useSearchParams();

  const [filters, setFilters] = useState<ResourceFilters>(() =>
    readFiltersFromSearch(initialSearchParams.toString())
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    function syncFromUrl() {
      setFilters(readFiltersFromSearch(window.location.search));
    }
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const deferredFilters = useDeferredValue(filters);
  const isStale = deferredFilters !== filters;

  useEffect(() => {
    const queryString = buildResourcesQueryString(deferredFilters);
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false });
  }, [deferredFilters, pathname, router]);

  const applyFilters = useCallback((updates: Partial<ResourceFilters>) => {
    setFilters((current) => ({ ...current, ...updates }));
  }, []);

  const handleSearchChange = useCallback(
    (value: string) => applyFilters({ search: value || undefined }),
    [applyFilters]
  );

  const handleProviderChange = useCallback(
    (value: Provider | "") => applyFilters({ provider: value || undefined }),
    [applyFilters]
  );

  const handleEnvironmentChange = useCallback(
    (value: Environment | "") => applyFilters({ environment: value || undefined }),
    [applyFilters]
  );

  const handleCriticalityChange = useCallback(
    (value: Criticality | "") => applyFilters({ criticality: value || undefined }),
    [applyFilters]
  );

  const handleClearFilters = useCallback(() => {
    applyFilters({ search: undefined, provider: undefined, environment: undefined, criticality: undefined });
  }, [applyFilters]);

  const handleSort = useCallback((field: SortableField) => {
    setFilters((current) => {
      const nextOrder: SortOrder = current.sortBy === field && current.sortOrder === "asc" ? "desc" : "asc";
      return { ...current, sortBy: field, sortOrder: nextOrder };
    });
  }, []);

  const sort = useMemo<SortState | null>(
    () => (filters.sortBy ? { field: filters.sortBy, order: filters.sortOrder ?? "asc" } : null),
    [filters.sortBy, filters.sortOrder]
  );

  const { data } = useResources(deferredFilters);

  const optimisticResources = useMemo(
    () => applyResourceFilters(data.data, filters),
    [data.data, filters]
  );

  const handleToggle = useCallback((id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleCreated = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const hasActiveFilters = Boolean(filters.search || filters.provider || filters.environment || filters.criticality);

  const selectedResourceIds = useMemo(() => Array.from(selectedIds), [selectedIds]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <FilterBar
          search={filters.search ?? ""}
          onSearchChange={handleSearchChange}
          provider={filters.provider ?? ""}
          onProviderChange={handleProviderChange}
          environment={filters.environment ?? ""}
          onEnvironmentChange={handleEnvironmentChange}
          criticality={filters.criticality ?? ""}
          onCriticalityChange={handleCriticalityChange}
          onClear={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />
        <CreateApplicationDialog selectedResourceIds={selectedResourceIds} onCreated={handleCreated} />
      </div>

      <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
        <span>
          {optimisticResources.length} resource{optimisticResources.length === 1 ? "" : "s"} · {selectedIds.size}{" "}
          selected
        </span>
        {isStale ? (
          <span className="inline-flex items-center gap-1 text-slate-400 dark:text-slate-500">
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            Syncing…
          </span>
        ) : null}
      </p>

      <ResourceTable
        resources={optimisticResources}
        selectedIds={selectedIds}
        onToggle={handleToggle}
        sort={sort}
        onSort={handleSort}
      />
    </div>
  );
}
