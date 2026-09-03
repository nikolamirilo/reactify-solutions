"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { DocTopicNav } from "@/content/docs/nav";
import DocsHeader from "./DocsHeader";
import DocsSidebar from "./DocsSidebar";

export default function DocsShell({
  nav,
  children,
}: {
  nav: DocTopicNav;
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // The mobile drawer should close itself the moment a navigation happens,
  // the same way the marketing header's mobile menu does.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-dark">
      <DocsHeader
        onToggleSidebar={() => setDrawerOpen((v) => !v)}
        sidebarOpen={drawerOpen}
      />

      {drawerOpen && (
        <div className="fixed inset-0 top-[72px] z-30 overflow-y-auto bg-dark px-5 py-6 lg:hidden">
          <DocsSidebar nav={nav} />
        </div>
      )}

      <div className="mx-auto grid w-full max-w-[1440px] flex-grow grid-cols-1 gap-x-12 px-5 sm:px-8 lg:grid-cols-[260px_1fr] lg:px-10 xl:grid-cols-[272px_1fr_240px] 2xl:grid-cols-[288px_1fr_240px]">
        <aside className="hidden lg:sticky lg:top-[72px] lg:block lg:h-[calc(100dvh-72px)] lg:overflow-y-auto lg:border-r lg:border-darkBorder/70 lg:py-7 lg:pr-6">
          <DocsSidebar nav={nav} />
        </aside>

        {children}
      </div>
    </div>
  );
}
