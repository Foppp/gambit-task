import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications",
  description: "Applications grouped from cloud resources.",
  openGraph: {
    title: "Applications · Gambit",
    description: "Applications grouped from cloud resources.",
  },
};

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Logical groupings of resources created from the Resources view.
        </p>
      </div>
    </div>
  );
}
