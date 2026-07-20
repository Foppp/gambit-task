import type { Metadata } from "next";
import { ResourcesExplorer } from "@/features/resources/components/resources-explorer-loader";

export const metadata: Metadata = {
  title: "Resources",
  description: "Browse, search, and filter cloud resources across AWS, GCP, and Azure.",
  openGraph: {
    title: "Resources · Gambit",
    description: "Browse, search, and filter cloud resources across AWS, GCP, and Azure.",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Resources</h1>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Select resources below and group them into a new application.
      </p>
      <ResourcesExplorer />
    </div>
  );
}
