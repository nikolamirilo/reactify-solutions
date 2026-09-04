"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LuSearch, LuFileText } from "react-icons/lu";
import type { HandbookSearchEntry } from "@/lib/handbooks";

type MiniSearchInstance = {
  search: (
    query: string,
    options?: Record<string, unknown>,
  ) => Array<HandbookSearchEntry & { id: string; score: number }>;
};

// Any header on any /handbooks page can open this without prop drilling across
// two different layouts (the plain index header and the topic sidebar
// shell) — call this instead of reaching for local state.
export function openHandbookSearch() {
  window.dispatchEvent(new CustomEvent("handbook-search:open"));
}

// Mounted once, in app/handbooks/layout.tsx, so ⌘K and every search trigger on
// every /handbooks page share one instance and one lazily-loaded index.
export default function HandbookSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<HandbookSearchEntry[]>([]);
  const [active, setActive] = useState(0);
  const indexRef = useRef<MiniSearchInstance | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const openHandler = () => setOpen(true);
    window.addEventListener("keydown", handler);
    window.addEventListener("handbook-search:open", openHandler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("handbook-search:open", openHandler);
    };
  }, []);

  useEffect(() => {
    if (!open || indexRef.current) return;
    let cancelled = false;
    (async () => {
      const [{ default: MiniSearch }, res] = await Promise.all([
        import("minisearch"),
        fetch("/handbooks/search-index.json"),
      ]);
      const entries: HandbookSearchEntry[] = await res.json();
      if (cancelled) return;
      const mini = new MiniSearch({
        fields: ["heading", "pageLabel", "snippet"],
        storeFields: ["topic", "slug", "pageLabel", "heading", "snippet", "url"],
        searchOptions: { boost: { heading: 3, pageLabel: 2 }, prefix: true, fuzzy: 0.2 },
      });
      mini.addAll(entries.map((d) => ({ ...d, id: d.id })));
      indexRef.current = mini as unknown as MiniSearchInstance;
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!indexRef.current || query.trim().length === 0) {
      setResults([]);
      return;
    }
    const hits = indexRef.current.search(query, { combineWith: "AND" });
    setResults(hits.slice(0, 8));
    setActive(0);
  }, [query]);

  const go = useCallback(
    (url: string) => {
      onClose();
      router.push(url);
    },
    [onClose, router],
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[92px]">
      <div
        className="absolute inset-0 bg-dark/72 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-[620px] overflow-hidden rounded-2xl border border-darkBorderStrong bg-darkSurface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]">
        <div className="flex items-center gap-3 border-b border-darkBorder px-[18px] py-4">
          <LuSearch className="h-[17px] w-[17px] flex-shrink-0 text-primaryColor" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && results[active]) {
                go(results[active].url);
              }
            }}
            placeholder="Search the handbooks"
            className="flex-grow bg-transparent text-[16px] text-textPrimary placeholder:text-textFaint focus:outline-none"
          />
          <kbd className="rounded border border-darkBorderStrong bg-darkElevated px-[7px] py-[3px] font-mono text-[10px] leading-none text-textColor">
            esc
          </kbd>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-2">
          {query.trim().length === 0 && (
            <div className="px-3 py-8 text-center text-[13.5px] text-textFaint">
              Type to search titles and section headings.
            </div>
          )}
          {query.trim().length > 0 && results.length === 0 && (
            <div className="px-3 py-8 text-center text-[13.5px] text-textFaint">
              No matches for &ldquo;{query}&rdquo;.
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => go(r.url)}
              onMouseEnter={() => setActive(i)}
              className={`flex w-full items-start gap-3 rounded-lg px-[13px] py-[11px] text-left ${
                i === active ? "border border-primaryColor/22 bg-primaryColor/[0.08]" : "border border-transparent"
              }`}
            >
              <LuFileText
                className={`mt-[2px] h-[15px] w-[15px] flex-shrink-0 ${
                  i === active ? "text-primaryColor" : "text-textFaint"
                }`}
              />
              <div className="min-w-0 flex-grow">
                <div className="mb-[3px] truncate text-[14.5px] font-medium text-textPrimary">
                  {r.pageLabel}
                  {r.heading && (
                    <span className="font-normal text-textFaint"> → {r.heading}</span>
                  )}
                </div>
                <div className="truncate text-[13px] leading-normal text-textColor">
                  {r.snippet}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-darkBorder bg-handbookCodeBg px-4 py-[9px]">
          <span className="flex items-center gap-1.5 text-[11.5px] text-textFaint">
            <kbd className="rounded border border-darkBorderStrong bg-darkElevated px-[6px] py-[2px] font-mono text-[10px] leading-none text-textColor">
              ↑↓
            </kbd>
            navigate
          </span>
          <span className="flex items-center gap-1.5 text-[11.5px] text-textFaint">
            <kbd className="rounded border border-darkBorderStrong bg-darkElevated px-[6px] py-[2px] font-mono text-[10px] leading-none text-textColor">
              ↵
            </kbd>
            open
          </span>
        </div>
      </div>
    </div>
  );
}
