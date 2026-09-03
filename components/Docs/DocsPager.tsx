import Link from "next/link";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import type { DocRef } from "@/lib/docs";

export default function DocsPager({
  topic,
  prev,
  next,
}: {
  topic: string;
  prev: DocRef | null;
  next: DocRef | null;
}) {
  if (!prev && !next) return null;

  return (
    <div className="mt-14 grid max-w-[42rem] grid-cols-1 gap-3 border-t border-darkBorder pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/docs/${topic}/${prev.slug}`}
          className="group flex flex-col gap-1.5 rounded-xl border border-darkBorder bg-darkSurface/40 px-4 py-3.5 transition-colors hover:border-primaryColor/30"
        >
          <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-textFaint">
            <LuArrowLeft className="h-3 w-3" />
            Previous
          </span>
          <span className="text-[14.5px] font-medium text-textSecondary group-hover:text-white">
            {prev.label}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/docs/${topic}/${next.slug}`}
          className="group flex flex-col items-end gap-1.5 rounded-xl border border-darkBorder bg-darkSurface/40 px-4 py-3.5 text-right transition-colors hover:border-primaryColor/30"
        >
          <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-textFaint">
            Next
            <LuArrowRight className="h-3 w-3" />
          </span>
          <span className="text-[14.5px] font-medium text-textSecondary group-hover:text-white">
            {next.label}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
