import type { Application } from "@/features/applications/schema";

export interface ApplicationsState {
  applications: Application[];
}

export type ApplicationsAction = {
  type: "CREATE_APPLICATION";
  payload: { id: string; name: string; description?: string; resourceIds: string[] };
};

export const initialApplicationsState: ApplicationsState = { applications: [] };

export function applicationsReducer(
  state: ApplicationsState,
  action: ApplicationsAction
): ApplicationsState {
  switch (action.type) {
    case "CREATE_APPLICATION": {
      const application: Application = {
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        resourceIds: action.payload.resourceIds,
      };
      return { applications: [...state.applications, application] };
    }
    default:
      return state;
  }
}
