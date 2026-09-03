"use client";

import Link from "next/link";
import Image from "@/components/Common/Image";
import { LuMenu, LuX, LuSearch } from "react-icons/lu";
import { openDocsSearch } from "./DocsSearch";

type Props = {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
};

export default function DocsHeader({ onToggleSidebar, sidebarOpen }: Props) {
  return (
    <header className="sticky top-0 z-40 flex h-[72px] flex-shrink-0 items-center gap-8 border-b border-darkBorder/70 bg-dark/85 px-4 backdrop-blur-md sm:px-6 lg:px-10">
      <div className="flex flex-shrink-0 items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            className="-ml-1 flex h-8 w-8 items-center justify-center rounded-md text-textColor hover:text-white lg:hidden"
          >
            {sidebarOpen ? <LuX className="h-5 w-5" /> : <LuMenu className="h-5 w-5" />}
          </button>
        )}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo/logo.png" alt="Reactify Solutions" width={110} height={28} />
        </Link>
        <span className="hidden h-[18px] w-px bg-darkBorderStrong sm:block" />
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-primaryColor sm:block">
          docs
        </span>
      </div>

      <div className="flex flex-grow justify-center">
        <button
          type="button"
          onClick={openDocsSearch}
          className="flex h-9 w-full max-w-[400px] items-center gap-2.5 rounded-lg border border-darkBorder bg-darkSurface px-3 text-left"
        >
          <LuSearch className="h-3.5 w-3.5 flex-shrink-0 text-textFaint" />
          <span className="flex-grow truncate text-[13px] text-textFaint">Search the docs</span>
          <span className="hidden flex-shrink-0 gap-[3px] sm:flex">
            <kbd className="rounded border border-darkBorderStrong bg-darkElevated px-[5px] py-[2px] font-mono text-[10px] leading-none text-textColor">
              ⌘
            </kbd>
            <kbd className="rounded border border-darkBorderStrong bg-darkElevated px-[5px] py-[2px] font-mono text-[10px] leading-none text-textColor">
              K
            </kbd>
          </span>
        </button>
      </div>

      <div className="flex flex-shrink-0 items-center gap-4 sm:gap-6">
        <Link
          href="/products"
          className="hidden text-[13.5px] text-textSecondary hover:text-white md:block"
        >
          Products
        </Link>
        <Link
          href="/articles"
          className="hidden text-[13.5px] text-textSecondary hover:text-white md:block"
        >
          Articles
        </Link>
        <Link
          href="/contact"
          className="hidden h-9 items-center rounded-lg bg-primaryColor px-4 font-semibold text-accentContrast shadow-glowSoft transition-colors hover:bg-primaryDark sm:flex"
        >
          Reach Out
        </Link>
      </div>
    </header>
  );
}
