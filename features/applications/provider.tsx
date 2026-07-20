"use client";

import { createContext, useContext, useReducer } from "react";
import {
  applicationsReducer,
  initialApplicationsState,
  type ApplicationsAction,
  type ApplicationsState,
} from "@/features/applications/applications-reducer";

const ApplicationsContext = createContext<ApplicationsState | null>(null);
const ApplicationsDispatchContext = createContext<React.Dispatch<ApplicationsAction> | null>(
  null
);

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(applicationsReducer, initialApplicationsState);

  return (
    <ApplicationsContext.Provider value={state}>
      <ApplicationsDispatchContext.Provider value={dispatch}>
        {children}
      </ApplicationsDispatchContext.Provider>
    </ApplicationsContext.Provider>
  );
}

export function useApplications(): ApplicationsState {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error("useApplications must be used within an ApplicationsProvider");
  }
  return context;
}

export function useApplicationsDispatch(): React.Dispatch<ApplicationsAction> {
  const context = useContext(ApplicationsDispatchContext);
  if (!context) {
    throw new Error("useApplicationsDispatch must be used within an ApplicationsProvider");
  }
  return context;
}
