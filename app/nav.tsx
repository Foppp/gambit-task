"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Resources" },
  { href: "/applications", label: "Applications" },
];

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV_LINKS.map((link) => {
        const active = isActivePath(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden w-56 shrink-0 flex-col gap-6 border-r border-slate-200 px-4 py-6 dark:border-slate-800 md:flex">
        <span className="px-3 text-base font-semibold tracking-tight">Gambit</span>
        <NavLinks pathname={pathname} />
      </aside>

      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800 md:hidden">
        <span className="text-base font-semibold tracking-tight">Gambit</span>
        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Open navigation"
              className="rounded p-1.5 text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 dark:text-slate-400 dark:hover:bg-slate-900"
            >
              <Menu className="h-5 w-5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-slate-950/40" />
            <Dialog.Content className="fixed inset-y-0 left-0 flex h-full w-64 flex-col gap-6 bg-white p-4 shadow-lg focus:outline-none dark:bg-slate-950">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-base font-semibold tracking-tight">Gambit</Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close navigation"
                    className="rounded p-1.5 text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 dark:hover:bg-slate-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
              <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
}
