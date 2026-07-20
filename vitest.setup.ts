import "@testing-library/jest-dom/vitest";
import { useSyncExternalStore } from "react";
import { beforeEach, vi } from "vitest";

let queryString = "";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    replace: (url: string) => {
      const queryIndex = url.indexOf("?");
      queryString = queryIndex >= 0 ? url.slice(queryIndex + 1) : "";
      notify();
    },
  }),
  useSearchParams: () =>
    new URLSearchParams(
      useSyncExternalStore(
        (listener) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        () => queryString
      )
    ),
}));

beforeEach(() => {
  queryString = "";
});
