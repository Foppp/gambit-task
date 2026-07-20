import { ResourcesLoading } from "@/features/resources/components/resources-loading";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Resources</h1>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Select resources below and group them into a new application.
      </p>
      <ResourcesLoading />
    </div>
  );
}
