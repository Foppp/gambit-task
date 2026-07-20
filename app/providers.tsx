"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ApplicationsProvider } from "@/features/applications/provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationsProvider>{children}</ApplicationsProvider>
    </QueryClientProvider>
  );
}
