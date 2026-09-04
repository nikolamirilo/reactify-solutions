import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import type { HandbookTopicNav } from "@/content/handbooks/nav";

export default function HandbookBreadcrumb({
  nav,
  currentLabel,
}: {
  nav: HandbookTopicNav;
  currentLabel: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2 text-[12.5px] text-textFaint">
      <Link href="/handbooks" className="hover:text-textSecondary">
        Handbooks
      </Link>
      <LuChevronRight className="h-3 w-3" />
      <Link href={`/handbooks/${nav.topic}`} className="hover:text-textSecondary">
        {nav.label}
      </Link>
      <LuChevronRight className="h-3 w-3" />
      <span className="text-textSecondary">{currentLabel}</span>
    </div>
  );
}
