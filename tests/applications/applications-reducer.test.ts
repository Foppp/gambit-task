import { describe, expect, it } from "vitest";
import { applicationsReducer, initialApplicationsState } from "@/features/applications/applications-reducer";

describe("applicationsReducer", () => {
  it("adds a new application on CREATE_APPLICATION without mutating the previous state", () => {
    const previousState = initialApplicationsState;

    const nextState = applicationsReducer(previousState, {
      type: "CREATE_APPLICATION",
      payload: { id: "app-1", name: "Payments API", description: "Core payment stack", resourceIds: ["r-001", "r-002"] },
    });

    expect(nextState).not.toBe(previousState);
    expect(nextState.applications).not.toBe(previousState.applications);
    expect(previousState.applications).toHaveLength(0);
    expect(nextState.applications).toHaveLength(1);

    const created = nextState.applications[0];
    expect(created?.id).toBe("app-1");
    expect(created?.name).toBe("Payments API");
    expect(created?.description).toBe("Core payment stack");
    expect(created?.resourceIds).toEqual(["r-001", "r-002"]);
  });
});
