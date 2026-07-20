import { Loader2 } from "lucide-react";

export function ResourcesLoading() {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 py-24 text-slate-400 dark:text-slate-600"
    >
      <Loader2 className="h-8 w-8 animate-spin" aria-hidden="true" />
      <p className="text-sm">Loading resources…</p>
    </div>
  );
}
