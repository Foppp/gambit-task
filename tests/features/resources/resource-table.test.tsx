import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ResourcesExplorer } from "@/features/resources/components/resources-explorer";
import { ApplicationsProvider } from "@/features/applications/provider";
import { mockResources } from "@/features/resources/mock-data";

const subset = mockResources.filter((resource) => ["r-001", "r-003", "r-010"].includes(resource.id));

function renderResourcesExplorer() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ApplicationsProvider>
        <Suspense fallback="loading">
          <ResourcesExplorer />
        </Suspense>
      </ApplicationsProvider>
    </QueryClientProvider>
  );
}

describe("resource search", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string) => {
        const search = new URL(input, "http://localhost").searchParams.get("search")?.toLowerCase() ?? "";
        const data = subset.filter((resource) => resource.name.toLowerCase().includes(search));
        return { ok: true, json: async () => ({ data, total: data.length }) } as Response;
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("only shows rows matching the search query", async () => {
    renderResourcesExplorer();

    await screen.findByText("payments-api-prod");
    expect(screen.getByText("identity-vault")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Search"), { target: { value: "payments" } });

    await waitFor(() => {
      expect(screen.queryByText("identity-vault")).not.toBeInTheDocument();
    });
    expect(screen.getByText("payments-api-prod")).toBeInTheDocument();
  });
});
