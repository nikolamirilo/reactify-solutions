import DocsSearch from "@/components/Docs/DocsSearch";

// Wraps the whole /docs section. The index page (no sidebar) and each
// topic's shell (app/docs/[topic]/layout.tsx, sidebar + TOC) render their
// own headers, so this only mounts the one shared search modal — every
// header's search button and the ⌘K shortcut all open the same instance.
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <DocsSearch />
    </>
  );
}
