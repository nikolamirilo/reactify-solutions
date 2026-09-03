"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DocTopicNav } from "@/content/docs/nav";

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function DocsSidebar({ nav }: { nav: DocTopicNav }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs navigation" className="flex flex-col gap-5">
      <Link
        href="/docs"
        className="flex h-11 items-center gap-2.5 rounded-[10px] border border-darkBorder bg-darkSurface px-3 transition-colors hover:border-primaryColor/30"
      >
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-primaryColor/20 bg-primaryColor/10">
          <span className="h-2 w-2 rounded-sm bg-primaryColor" />
        </div>
        <div className="flex min-w-0 flex-grow flex-col gap-px">
          <span className="truncate font-display text-[13.5px] font-semibold leading-tight text-white">
            {nav.label}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-textFaint">
            {nav.sublabel}
          </span>
        </div>
      </Link>

      {nav.pages.map((section) => (
        <div key={section.title} className="flex flex-col gap-0.5">
          <div className="px-3 pb-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.13em] text-textFaint">
            {section.title}
          </div>
          {section.pages.map((page) => {
            const href = `/docs/${nav.topic}/${page.slug}`;
            const isActive = pathname === href;
            return (
              <Link
                key={page.slug}
                href={href}
                className={cx(
                  "relative rounded-md px-3 py-[7px] text-[13.5px] transition-colors",
                  isActive
                    ? "bg-primaryColor/[0.07] font-medium text-primaryColor"
                    : "text-textSecondary hover:text-white",
                )}
              >
                {isActive && (
                  <span className="absolute inset-y-[5px] left-0 w-[2px] rounded-full bg-primaryColor shadow-[0_0_10px_rgba(0,212,200,0.6)]" />
                )}
                {page.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
