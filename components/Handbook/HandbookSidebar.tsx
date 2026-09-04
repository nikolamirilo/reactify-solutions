"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { HandbookTopicNav, HandbookNavPage, HandbookNavSection } from "@/content/handbooks/nav";

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={cx("flex-shrink-0 transition-transform duration-200", open ? "rotate-90" : "")}
    >
      <path d="M4 2.5L7.5 6L4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PageLink({ page, href, isActive }: { page: HandbookNavPage; href: string; isActive: boolean }) {
  return (
    <Link
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
}

function CollapsiblePage({
  page,
  topicHref,
  pathname,
}: {
  page: HandbookNavPage;
  topicHref: string;
  pathname: string;
}) {
  const href = `${topicHref}/${page.slug}`;
  const isActive = pathname === href;
  const childSlugs = page.children?.map((c) => `${topicHref}/${c.slug}`) ?? [];
  const hasActiveChild = childSlugs.includes(pathname);
  const [open, setOpen] = useState(isActive || hasActiveChild);

  useEffect(() => {
    if (isActive || hasActiveChild) setOpen(true);
  }, [isActive, hasActiveChild]);

  if (!page.children?.length) {
    return <PageLink page={page} href={href} isActive={isActive} />;
  }

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cx(
          "flex w-full items-center justify-between rounded-md px-3 py-[7px] text-left text-[13.5px] transition-colors",
          isActive || hasActiveChild ? "font-medium text-white" : "text-textSecondary hover:text-white",
        )}
      >
        <span>{page.label}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="mt-0.5 flex flex-col gap-0.5 border-l border-darkBorder ml-3 pl-2">
          {page.children.map((child) => {
            const childHref = `${topicHref}/${child.slug}`;
            return (
              <PageLink key={child.slug} page={child} href={childHref} isActive={pathname === childHref} />
            );
          })}
        </div>
      )}
    </div>
  );
}

function sectionContainsPath(section: HandbookNavSection, topicHref: string, pathname: string): boolean {
  return section.pages.some(
    (p) =>
      pathname === `${topicHref}/${p.slug}` ||
      p.children?.some((c) => pathname === `${topicHref}/${c.slug}`),
  );
}

function CollapsibleSection({
  section,
  topicHref,
  pathname,
}: {
  section: HandbookNavSection;
  topicHref: string;
  pathname: string;
}) {
  const isActive = sectionContainsPath(section, topicHref, pathname);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

  return (
    <div className="flex flex-col gap-0.5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between px-3 pb-2 text-left"
      >
        <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.13em] text-textFaint">
          {section.title}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open &&
        section.pages.map((page) => (
          <CollapsiblePage key={page.slug} page={page} topicHref={topicHref} pathname={pathname} />
        ))}
    </div>
  );
}

export default function HandbookSidebar({ nav }: { nav: HandbookTopicNav }) {
  const pathname = usePathname();
  const topicHref = `/handbooks/${nav.topic}`;

  return (
    <nav aria-label="Handbooks navigation" className="flex flex-col gap-5">
      <Link
        href="/handbooks"
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
        <CollapsibleSection
          key={section.title}
          section={section}
          topicHref={topicHref}
          pathname={pathname}
        />
      ))}
    </nav>
  );
}
