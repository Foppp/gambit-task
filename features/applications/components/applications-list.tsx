"use client";

import Link from "next/link";
import { useApplications } from "@/features/applications/provider";

export function ApplicationsList() {
  const { applications } = useApplications();

  if (applications.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm text-slate-600 dark:text-slate-400">No applications yet.</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
          Head to{" "}
          <Link href="/" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            Resources
          </Link>{" "}
          to select resources and create your first application.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {applications.map((application) => (
        <li key={application.id}>
          <Link
            href={`/applications/${application.id}`}
            className="block rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-500"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{application.name}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {application.resourceIds.length} resource{application.resourceIds.length === 1 ? "" : "s"}
              </span>
            </div>
            {application.description ? (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{application.description}</p>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
