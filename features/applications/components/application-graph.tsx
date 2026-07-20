"use client";

import { notFound } from "next/navigation";
import { useApplications } from "@/features/applications/provider";
import { useResources } from "@/features/resources/api/use-resources";
import type { Criticality, Resource } from "@/features/resources/schema";

interface ApplicationGraphProps {
  applicationId: string;
}

const NODE_COLORS: Record<Criticality, string> = {
  critical: "text-rose-600 dark:text-rose-400",
  high: "text-amber-600 dark:text-amber-400",
  medium: "text-blue-600 dark:text-blue-400",
  low: "text-slate-500 dark:text-slate-400",
};

const BADGE_COLORS: Record<Criticality, string> = {
  critical: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
  high: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  medium: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  low: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const VIEWBOX_SIZE = 420;
const CENTER = VIEWBOX_SIZE / 2;
const SPOKE_RADIUS = 150;
const HUB_NODE_RADIUS = 26;
const SPOKE_NODE_RADIUS = 10;

function spokePosition(index: number, count: number) {
  const angle = (2 * Math.PI * index) / count - Math.PI / 2;
  return {
    x: CENTER + SPOKE_RADIUS * Math.cos(angle),
    y: CENTER + SPOKE_RADIUS * Math.sin(angle),
  };
}

function spokeLabelLayout(position: { x: number; y: number }) {
  const textAnchor: "end" | "start" | "middle" =
    position.x < CENTER - 10 ? "end" : position.x > CENTER + 10 ? "start" : "middle";
  const above = position.y < CENTER;
  return {
    textAnchor,
    nameY: position.y + (above ? -22 : 18),
    criticalityY: position.y + (above ? -11 : 30),
  };
}

function HubGraph({ name, resources }: { name: string; resources: Resource[] }) {
  if (resources.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-10 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        This application has no member resources.
      </div>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      role="img"
      aria-label={`Hub and spoke graph for ${name}, connected to ${resources.length} resources`}
      className="mx-auto w-full max-w-md"
    >
      {resources.map((resource, index) => {
        const position = spokePosition(index, resources.length);
        return (
          <line
            key={`edge-${resource.id}`}
            x1={CENTER}
            y1={CENTER}
            x2={position.x}
            y2={position.y}
            className="stroke-slate-300 dark:stroke-slate-700"
            strokeWidth={1.5}
          />
        );
      })}

      <circle cx={CENTER} cy={CENTER} r={HUB_NODE_RADIUS} className="fill-blue-600" />
      <text
        x={CENTER}
        y={CENTER + HUB_NODE_RADIUS + 17}
        textAnchor="middle"
        className="fill-slate-900 text-[12px] font-semibold dark:fill-slate-100"
      >
        {name.length > 28 ? `${name.slice(0, 27)}…` : name}
      </text>

      {resources.map((resource, index) => {
        const position = spokePosition(index, resources.length);
        const layout = spokeLabelLayout(position);
        return (
          <g key={resource.id}>
            <circle
              cx={position.x}
              cy={position.y}
              r={SPOKE_NODE_RADIUS}
              className={`fill-current ${NODE_COLORS[resource.criticality]}`}
            />
            <text
              x={position.x}
              y={layout.nameY}
              textAnchor={layout.textAnchor}
              className="fill-slate-700 text-[10px] font-medium dark:fill-slate-300"
            >
              {resource.name}
            </text>
            <text
              x={position.x}
              y={layout.criticalityY}
              textAnchor={layout.textAnchor}
              className="fill-slate-500 text-[9px] dark:fill-slate-500"
            >
              {resource.criticality}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ApplicationGraph({ applicationId }: ApplicationGraphProps) {
  const { applications } = useApplications();
  const application = applications.find((item) => item.id === applicationId);

  if (!application) {
    notFound();
  }

  const { data } = useResources({});
  const memberResources = data.data.filter((resource) => application.resourceIds.includes(resource.id));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{application.name}</h1>
        {application.description ? (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{application.description}</p>
        ) : null}
      </div>

      <HubGraph name={application.name} resources={memberResources} />

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Member resources
        </h2>
        <ul className="flex flex-col gap-2">
          {memberResources.map((resource) => (
            <li
              key={resource.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{resource.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {resource.type} · {resource.provider} · {resource.region} · {resource.owner}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${BADGE_COLORS[resource.criticality]}`}
                >
                  {resource.criticality}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {resource.openIssues} open issue{resource.openIssues === 1 ? "" : "s"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
