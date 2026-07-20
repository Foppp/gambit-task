"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-6 dark:border-rose-900 dark:bg-rose-950">
      <h2 className="text-lg font-semibold text-rose-900 dark:text-rose-200">Something went wrong</h2>
      <p className="text-sm text-rose-700 dark:text-rose-300">{error.message || "Failed to load resources."}</p>
      <button
        type="button"
        onClick={reset}
        className="h-9 rounded-md bg-rose-600 px-4 text-sm font-medium text-white hover:bg-rose-700"
      >
        Try again
      </button>
    </div>
  );
}
