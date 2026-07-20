function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-slate-200 dark:bg-slate-800 ${className}`} />;
}

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <SkeletonBlock className="h-8 w-40" />
        <SkeletonBlock className="h-4 w-72" />
      </div>

      <ul className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between gap-4">
              <SkeletonBlock className="h-4 w-40" />
              <SkeletonBlock className="h-3 w-20" />
            </div>
            <SkeletonBlock className="mt-2 h-3 w-64" />
          </li>
        ))}
      </ul>
    </div>
  );
}
