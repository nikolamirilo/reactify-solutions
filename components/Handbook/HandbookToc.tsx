"use client";

import { useEffect, useState } from "react";
import type { HandbookHeading } from "@/lib/handbooks";

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function HandbookToc({ headings }: { headings: HandbookHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="flex flex-col gap-3">
      <div className="font-mono text-[10.5px] font-medium uppercase tracking-[0.13em] text-textFaint">
        On this page
      </div>
      <div className="flex flex-col gap-0.5 border-l border-darkBorder">
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={cx(
                "relative py-[6px] text-[13px] leading-snug transition-colors",
                h.depth === 3 ? "pl-6" : "pl-[14px]",
                isActive ? "font-medium text-primaryColor" : "text-textColor hover:text-textSecondary",
              )}
            >
              {isActive && (
                <span className="absolute -left-px top-0 bottom-0 w-px bg-primaryColor" />
              )}
              {h.text}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
