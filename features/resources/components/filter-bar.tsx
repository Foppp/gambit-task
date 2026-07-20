"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import {
  CriticalitySchema,
  EnvironmentSchema,
  ProviderSchema,
} from "@/features/resources/schema";
import type {
  Criticality,
  Environment,
  Provider,
} from "@/features/resources/schema";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  provider: Provider | "";
  onProviderChange: (value: Provider | "") => void;
  environment: Environment | "";
  onEnvironmentChange: (value: Environment | "") => void;
  criticality: Criticality | "";
  onCriticalityChange: (value: Criticality | "") => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const PROVIDERS = ProviderSchema.options;
const ENVIRONMENTS = EnvironmentSchema.options;
const CRITICALITIES = [...CriticalitySchema.options].reverse();

const ALL_VALUE = "__all__";

const triggerClassName =
  "flex h-9 w-full min-w-44 items-center justify-between gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30 data-[placeholder]:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";

const contentClassName =
  "overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900";

const itemClassName =
  "relative flex h-9 cursor-pointer select-none items-center rounded px-3 pl-7 text-sm text-slate-900 outline-none data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-700 dark:text-slate-100 dark:data-[highlighted]:bg-blue-950 dark:data-[highlighted]:text-blue-300";

interface FilterSelectProps<T extends string> {
  id: string;
  label: string;
  value: T | "";
  onChange: (value: T | "") => void;
  allLabel: string;
  options: readonly T[];
}

function FilterSelect<T extends string>({
  id,
  label,
  value,
  onChange,
  allLabel,
  options,
}: FilterSelectProps<T>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      <Select.Root
        value={value || ALL_VALUE}
        onValueChange={(next) =>
          onChange(next === ALL_VALUE ? "" : (next as T))
        }
      >
        <Select.Trigger id={id} className={triggerClassName}>
          <Select.Value />
          <Select.Icon>
            <ChevronDown
              className="h-4 w-4 text-slate-400"
              aria-hidden="true"
            />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            side="bottom"
            sideOffset={4}
            className={contentClassName}
          >
            <Select.Viewport className="p-1">
              <Select.Item value={ALL_VALUE} className={itemClassName}>
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </Select.ItemIndicator>
                <Select.ItemText>{allLabel}</Select.ItemText>
              </Select.Item>
              {options.map((option) => (
                <Select.Item
                  key={option}
                  value={option}
                  className={itemClassName}
                >
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </Select.ItemIndicator>
                  <Select.ItemText>{option}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

export function FilterBar({
  search,
  onSearchChange,
  provider,
  onProviderChange,
  environment,
  onEnvironmentChange,
  criticality,
  onCriticalityChange,
  onClear,
  hasActiveFilters,
}: FilterBarProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-end sm:w-auto">
      <div className="col-span-2 flex flex-col gap-1.5 sm:col-span-1">
        <label
          htmlFor="resource-search"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Search
        </label>
        <input
          id="resource-search"
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Name, type, owner, tag..."
          className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 sm:w-64"
        />
      </div>

      <FilterSelect
        id="resource-provider"
        label="Provider"
        value={provider}
        onChange={onProviderChange}
        allLabel="All providers"
        options={PROVIDERS}
      />

      <FilterSelect
        id="resource-environment"
        label="Environment"
        value={environment}
        onChange={onEnvironmentChange}
        allLabel="All environments"
        options={ENVIRONMENTS}
      />

      <FilterSelect
        id="resource-criticality"
        label="Criticality"
        value={criticality}
        onChange={onCriticalityChange}
        allLabel="All criticalities"
        options={CRITICALITIES}
      />

      <button
        type="button"
        onClick={onClear}
        disabled={!hasActiveFilters}
        className="h-9 self-end text-sm font-medium text-blue-600 hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline dark:text-blue-400 dark:disabled:text-slate-600"
      >
        Clear filters
      </button>
    </div>
  );
}
