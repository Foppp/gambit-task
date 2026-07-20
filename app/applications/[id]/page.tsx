import type { Metadata } from "next";
import { ApplicationGraph } from "@/features/applications/components/application-graph-loader";

export const metadata: Metadata = {
  title: "Application detail",
  description: "Hub-and-spoke view of an application and its member resources.",
  openGraph: {
    title: "Application detail · Gambit",
    description: "Hub-and-spoke view of an application and its member resources.",
  },
};

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const { id } = await params;
  return <ApplicationGraph applicationId={id} />;
}
