"use client";

import dynamic from "next/dynamic";
import { ResourcesLoading } from "./resources-loading";

export const ResourcesExplorer = dynamic(
  () => import("./resources-explorer").then((mod) => mod.ResourcesExplorer),
  { ssr: false, loading: ResourcesLoading }
);
