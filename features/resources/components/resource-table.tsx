"use client";

import { memo } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { ArrowDown, ArrowUp, ArrowUpDown, Check } from "lucide-react";
import type {
  Criticality,
  Resource,
  SortableField,
  SortState,
} from "@/features/resources/schema";

interface ResourceTableProps {
  resources: Resource[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  sort: SortState | null;
  onSort: (field: SortableField) => void;
}

interface SortableHeaderProps {
  field: SortableField;
  label: string;
  align?: "left" | "right";
  sort: SortState | null;
  onSort: (field: SortableField) => void;
}

function SortableHeader({
  field,
  label,
  align = "left",
  sort,
  onSort,
}: SortableHeaderProps) {
  const isActive = sort?.field === field;
  const ariaSort = isActive
    ? sort.order === "asc"
      ? "ascending"
      : "descending"
    : "none";
  const Icon = isActive
    ? sort.order === "asc"
      ? ArrowUp
      : ArrowDown
    : ArrowUpDown;

  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className={`inline-flex items-center gap-1 rounded hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 dark:hover:text-slate-200 ${
          align === "right" ? "flex-row-reverse" : ""
        }`}
      >
        {label}
        <Icon
          className={`h-3.5 w-3.5 ${isActive ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-600"}`}
          aria-hidden="true"
        />
      </button>
    </th>
  );
}

const CRITICALITY_STYLES: Record<Criticality, string> = {
  critical: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
  high: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  medium: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  low: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

function CriticalityBadge({ criticality }: { criticality: Criticality }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${CRITICALITY_STYLES[criticality]}`}
    >
      {criticality}
    </span>
  );
}

interface ResourceRowProps {
  resource: Resource;
  checked: boolean;
  onToggle: (id: string) => void;
}

const ResourceRow = memo(function ResourceRow({
  resource,
  checked,
  onToggle,
}: ResourceRowProps) {
  const checkboxId = `resource-checkbox-${resource.id}`;

  return (
    <tr className="border-b border-slate-200 last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/60">
      <td className="w-10 px-4 py-3">
        <Checkbox.Root
          id={checkboxId}
          checked={checked}
          onCheckedChange={() => onToggle(resource.id)}
          className="flex h-4 w-4 items-center justify-center rounded border border-slate-400 bg-white data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 dark:border-slate-600 dark:bg-slate-900"
        >
          <Checkbox.Indicator>
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label htmlFor={checkboxId} className="sr-only">
          Select {resource.name}
        </label>
      </td>
      <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100">
        {resource.name}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
        {resource.type}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
        {resource.provider}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
        {resource.environment}
      </td>
      <td className="px-4 py-3">
        <CriticalityBadge criticality={resource.criticality} />
      </td>
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
        {resource.owner}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex flex-wrap gap-1">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">
        {resource.openIssues}
      </td>
    </tr>
  );
});

export function ResourceTable({
  resources,
  selectedIds,
  onToggle,
  sort,
  onSort,
}: ResourceTableProps) {
  if (resources.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        No resources match the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table
        className="w-full min-w-240 border-collapse"
        aria-label="Cloud resources"
      >
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
            <th scope="col" className="w-10 px-4 py-2.5">
              <span className="sr-only">Select</span>
            </th>
            <SortableHeader
              field="name"
              label="Name"
              sort={sort}
              onSort={onSort}
            />
            <SortableHeader
              field="type"
              label="Type"
              sort={sort}
              onSort={onSort}
            />
            <SortableHeader
              field="provider"
              label="Provider"
              sort={sort}
              onSort={onSort}
            />
            <SortableHeader
              field="environment"
              label="Environment"
              sort={sort}
              onSort={onSort}
            />
            <SortableHeader
              field="criticality"
              label="Criticality"
              sort={sort}
              onSort={onSort}
            />
            <SortableHeader
              field="owner"
              label="Owner"
              sort={sort}
              onSort={onSort}
            />
            <th
              scope="col"
              className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Tags
            </th>
            <SortableHeader
              field="openIssues"
              label="Open issues"
              align="right"
              sort={sort}
              onSort={onSort}
            />
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <ResourceRow
              key={resource.id}
              resource={resource}
              checked={selectedIds.has(resource.id)}
              onToggle={onToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
