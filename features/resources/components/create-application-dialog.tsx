"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { useApplicationsDispatch } from "@/features/applications/provider";
import { CreateApplicationInputSchema } from "@/features/applications/schema";

interface CreateApplicationDialogProps {
  selectedResourceIds: string[];
  onCreated: () => void;
}

interface CreatedApplication {
  id: string;
  name: string;
}

export function CreateApplicationDialog({ selectedResourceIds, onCreated }: CreateApplicationDialogProps) {
  const dispatch = useApplicationsDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedApplication | null>(null);

  function resetForm() {
    setName("");
    setDescription("");
    setError(null);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const result = CreateApplicationInputSchema.safeParse({
      name,
      description: description || undefined,
      resourceIds: selectedResourceIds,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    const id = crypto.randomUUID();
    dispatch({ type: "CREATE_APPLICATION", payload: { id, ...result.data } });
    onCreated();
    setCreated({ id, name: result.data.name });
    resetForm();
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          resetForm();
          setCreated(null);
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button
          type="button"
          disabled={selectedResourceIds.length === 0}
          className="h-9 rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
        >
          Create application{selectedResourceIds.length > 0 ? ` (${selectedResourceIds.length})` : ""}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-950/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none dark:bg-slate-900">
          {created ? (
            <div className="flex flex-col items-center gap-4 py-2 text-center">
              <CheckCircle2 className="h-10 w-10 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <div>
                <Dialog.Title className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Application created
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  &ldquo;{created.name}&rdquo; is ready. Want to see it now?
                </Dialog.Description>
              </div>
              <div className="mt-2 flex gap-2">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="h-9 rounded-md px-4 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Done
                  </button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Link
                    href={`/applications/${created.id}`}
                    className="inline-flex h-9 items-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    View application
                  </Link>
                </Dialog.Close>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <Dialog.Title className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Create application
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close"
                    className="rounded p-1 text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 dark:hover:bg-slate-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Group {selectedResourceIds.length} selected resource{selectedResourceIds.length === 1 ? "" : "s"} into
                a new application.
              </Dialog.Description>

              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="application-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name
                  </label>
                  <input
                    id="application-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="application-description"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Description <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="application-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={3}
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>

                {error ? <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p> : null}

                <div className="mt-2 flex justify-end gap-2">
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="h-9 rounded-md px-4 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="h-9 rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
