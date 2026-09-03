import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import type { DocTopicNav } from "@/content/docs/nav";

export default function DocsBreadcrumb({
  nav,
  currentLabel,
}: {
  nav: DocTopicNav;
  currentLabel: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2 text-[12.5px] text-textFaint">
      <Link href="/docs" className="hover:text-textSecondary">
        Docs
      </Link>
      <LuChevronRight className="h-3 w-3" />
      <Link href={`/docs/${nav.topic}`} className="hover:text-textSecondary">
        {nav.label}
      </Link>
      <LuChevronRight className="h-3 w-3" />
      <span className="text-textSecondary">{currentLabel}</span>
    </div>
  );
}
