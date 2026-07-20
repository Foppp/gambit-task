import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ResourcesExplorer } from "@/features/resources/components/resources-explorer";
import { ApplicationsProvider, useApplications } from "@/features/applications/provider";
import { mockResources } from "@/features/resources/mock-data";

function ApplicationsProbe() {
  const { applications } = useApplications();
  return (
    <ul data-testid="applications-probe">
      {applications.map((application) => (
        <li key={application.id}>{JSON.stringify(application)}</li>
      ))}
    </ul>
  );
}

function renderApp() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ApplicationsProvider>
        <Suspense fallback="loading">
          <ResourcesExplorer />
        </Suspense>
        <ApplicationsProbe />
      </ApplicationsProvider>
    </QueryClientProvider>
  );
}

describe("create application flow", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, json: async () => ({ data: mockResources, total: mockResources.length }) }) as Response)
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("creates an application from two selected resources", async () => {
    renderApp();

    await screen.findByText("payments-api-prod");

    fireEvent.click(screen.getByLabelText("Select payments-api-prod"));
    fireEvent.click(screen.getByLabelText("Select payments-db-prod"));

    fireEvent.click(screen.getByRole("button", { name: /create application/i }));
    fireEvent.change(await screen.findByLabelText("Name"), { target: { value: "Payments API" } });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => {
      expect(screen.getByTestId("applications-probe").children).toHaveLength(1);
    });

    const created = JSON.parse(screen.getByTestId("applications-probe").children[0]?.textContent ?? "{}");
    expect(created.resourceIds).toEqual(["r-001", "r-002"]);
  });
});
