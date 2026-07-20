import Link from "next/link";

export default function ApplicationNotFound() {
  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-slate-200 bg-white p-10 dark:border-slate-800 dark:bg-slate-950">
      <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Application not found</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        This application doesn&apos;t exist in the current session. Applications are held in memory and are cleared
        on page reload.
      </p>
      <Link href="/applications" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
        Back to Applications
      </Link>
    </div>
  );
}
