"use client";

import dynamic from "next/dynamic";
import { ApplicationGraphSkeleton } from "./application-graph-skeleton";

export const ApplicationGraph = dynamic(
  () => import("./application-graph").then((mod) => mod.ApplicationGraph),
  { ssr: false, loading: ApplicationGraphSkeleton }
);
