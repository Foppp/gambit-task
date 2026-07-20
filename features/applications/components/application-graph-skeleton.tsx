function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-slate-200 dark:bg-slate-800 ${className}`} />;
}

export function ApplicationGraphSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <SkeletonBlock className="h-8 w-56" />
        <SkeletonBlock className="h-4 w-72" />
      </div>

      <div className="mx-auto flex h-64 w-full max-w-md items-center justify-center">
        <SkeletonBlock className="h-12 w-12 rounded-full" />
      </div>

      <div className="flex flex-col gap-3">
        <SkeletonBlock className="h-3 w-32" />
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-14 w-full" />
        ))}
      </div>
    </div>
  );
}
