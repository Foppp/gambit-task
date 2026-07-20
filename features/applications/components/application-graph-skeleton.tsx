import { Loader2 } from "lucide-react";

export function ApplicationGraphSkeleton() {
  return (
    <Loader2
      className="h-8 w-8 animate-spin mx-auto mt-32"
      aria-hidden="true"
    />
  );
}
