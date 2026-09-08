import DiagramFrame from "./DiagramFrame";

const OPPORTUNITIES = ["Keeps two calendars", "Does not trust the sync", "Checks manually before every trip"];

// A mockup of the artifact itself, not a table describing its fields — the
// point of the page is that the photo and the quote are what make an
// interview retrievable months later, and that only lands if the reader
// sees a card that looks like the real thing.
export default function InterviewSnapshotDiagram() {
  return (
    <DiagramFrame label="One interview, captured the same day">
      <div className="overflow-hidden rounded-xl border border-darkBorder bg-darkElevated">
        <div className="flex items-center gap-3 border-b border-darkBorder px-4 py-3.5">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-primaryColor/30 bg-primaryColor/10 font-display text-[15px] font-semibold text-primaryColor">
            MK
          </div>
          <div className="min-w-0">
            <div className="font-display text-[14px] font-semibold text-white">Maya K.</div>
            <div className="text-[11.5px] text-textFaint">Ops lead, 40-person team · interviewed this week</div>
          </div>
        </div>

        <div className="border-b border-darkBorder px-4 py-3.5">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-textFaint">The quote</span>
          <p className="mt-1 text-[13.5px] italic leading-snug text-textSecondary">
            &ldquo;I keep two calendars because I do not trust the sync, so I check both before I book
            anything.&rdquo;
          </p>
        </div>

        <div className="border-b border-darkBorder px-4 py-3.5">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-textFaint">The story</span>
          <p className="mt-1 text-[12.5px] leading-snug text-textSecondary">
            Booked a room already taken last Tuesday because the sync had silently failed for three
            days. Now checks the source calendar by hand before every booking.
          </p>
        </div>

        <div className="border-b border-darkBorder px-4 py-3.5">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-textFaint">
            Opportunities heard
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {OPPORTUNITIES.map((o) => (
              <span
                key={o}
                className="rounded-md border border-accentGreen/25 bg-accentGreen/[0.07] px-2 py-1 text-[11px] text-accentGreen"
              >
                {o}
              </span>
            ))}
          </div>
        </div>

        <div className="px-4 py-3.5">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-textFaint">Insight</span>
          <p className="mt-1 text-[12.5px] leading-snug text-textSecondary">
            &ldquo;Trust the sync&rdquo; is not one opportunity, it is a symptom. The real need is a way to
            tell that a sync has failed, not a better sync.
          </p>
        </div>
      </div>
    </DiagramFrame>
  );
}
