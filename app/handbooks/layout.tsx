import HandbookSearch from "@/components/Handbook/HandbookSearch";

// Wraps the whole /handbooks section. The index page (no sidebar) and each
// topic's shell (app/handbooks/[topic]/layout.tsx, sidebar + TOC) render their
// own headers, so this only mounts the one shared search modal — every
// header's search button and the ⌘K shortcut all open the same instance.
export default function HandbooksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <HandbookSearch />
    </>
  );
}
