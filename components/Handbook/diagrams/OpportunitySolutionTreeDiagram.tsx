"use client";

import { useEffect, useRef } from "react";
import DiagramFrame from "./DiagramFrame";

// Same four layers and colour language as the book (outcome, opportunity,
// solution, experiment), redrawn as an actual branching tree with connector
// lines instead of a nested rail, so it reads the way the source material
// does: pick a shape once, recognise it everywhere.
type Solution = { label: string; experiments?: string[] };
type Opportunity = { label: string; target?: boolean; solutions: Solution[] };

const OUTCOME = "Increase weekly listening sessions per user";

const OPPORTUNITIES: Opportunity[] = [
  {
    label: "Previews are too short to judge",
    target: true,
    solutions: [
      { label: "Longer preview", experiments: ["60s finish rate", "15s vs. 60s A/B"] },
      { label: "Skip to the chorus", experiments: ["Change in saves?"] },
      { label: "Show why it was picked" },
    ],
  },
  {
    label: "I do not trust the recommendations",
    solutions: [{ label: "Explain the pick in one line" }, { label: "Add “more like this”" }],
  },
  {
    label: "Listening with other people is awkward",
    solutions: [
      { label: "Shared queue for a session", experiments: ["5-user concept test"] },
      { label: "One-tap co-listen invite" },
    ],
  },
];

const NODE_TONES = {
  outcome:
    "border-primaryColor/50 bg-primaryColor/[0.14] text-primaryColor shadow-[0_0_0_1px_rgba(0,212,200,0.06)]",
  opportunity: "border-accentGreen/45 bg-accentGreen/[0.12] text-accentGreen",
  opportunityTarget: "border-accentGreen/70 bg-accentGreen/[0.18] text-accentGreen",
  solution: "border-white/20 bg-white/[0.05] text-textSecondary",
  experiment: "border-starYellow/45 bg-starYellow/[0.12] text-starYellow",
};

const LEGEND: { label: string; swatch: string }[] = [
  { label: "Outcome", swatch: "border-primaryColor/60 bg-primaryColor" },
  { label: "Opportunity", swatch: "border-accentGreen/60 bg-accentGreen" },
  { label: "Solution", swatch: "border-white/40 bg-white/40" },
  { label: "Experiment", swatch: "border-starYellow/60 bg-starYellow" },
];

const LINE = "bg-darkBorderStrong";

function Node({
  tone,
  className = "",
  children,
}: {
  tone: keyof typeof NODE_TONES;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-full border px-3.5 py-2 text-center text-[11.5px] font-medium leading-snug ${NODE_TONES[tone]} ${className}`}
    >
      {children}
    </div>
  );
}

// A row of siblings hanging off one shared vertical stem, connected by a
// horizontal bar the way an org-chart / family-tree connects children — the
// bar is trimmed to a half-width segment on the first and last item so it
// starts and ends at their centers instead of overhanging the row.
function Branches({ children }: { children: React.ReactNode[] }) {
  const items = children;
  return (
    <div className="flex justify-center">
      <div className="flex items-start">
        {items.map((child, i) => (
          <div key={i} className="relative flex flex-col items-center px-2.5 sm:px-3.5">
            {items.length > 1 && (
              <span
                className={`absolute top-0 h-px ${LINE} ${
                  i === 0
                    ? "left-1/2 right-0"
                    : i === items.length - 1
                      ? "left-0 right-1/2"
                      : "left-0 right-0"
                }`}
              />
            )}
            <span className={`h-5 w-px ${LINE}`} />
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stem() {
  return <span className={`mx-auto block h-5 w-px ${LINE}`} />;
}

function ExperimentStack({ items }: { items: string[] }) {
  return (
    <div className="mt-1.5 flex flex-col items-start gap-1.5">
      {items.map((label) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className={`h-px w-3 flex-shrink-0 ${LINE}`} />
          <Node tone="experiment" className="w-[104px] whitespace-normal !py-1 !text-[10px]">
            {label}
          </Node>
        </div>
      ))}
    </div>
  );
}

export default function OpportunitySolutionTreeDiagram() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // The outcome node sits horizontally centered over the whole tree, so at
  // scrollLeft 0 a reader lands on the edge of one branch instead of the
  // thing the tree is organised around. Center the scroll position on the
  // root once, on mount, rather than leaving that to chance.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  return (
    <DiagramFrame
      label="One outcome, an opportunity space, solutions under the one you picked, tests under those"
      wide
    >
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full border ${item.swatch}`} />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-textFaint">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* The full tree is wider than the article column on every viewport
          (three parallel branches, same as the book's spread), so this
          scrolls by design — same pattern as a wide table. The edge fade
          and hint below make that a choice the reader notices instead of
          content that looks cut off. */}
      <div className="relative">
        <div ref={scrollerRef} className="overflow-x-auto pb-1">
          {/* w-max (not a fixed min-width) so this box's own width always
              equals its content's true max-content width — otherwise a
              row wider than a fixed min-width overflows symmetrically
              around center, and the left half of that overflow is not
              reachable by scrolling in a plain LTR container. */}
          <div className="flex w-max min-w-[560px] flex-col items-center">
            <Node tone="outcome" className="w-fit whitespace-nowrap px-5 py-2.5 text-[13px] font-semibold">
              {OUTCOME}
            </Node>

            <Stem />

            <Branches>
              {OPPORTUNITIES.map((opp) => (
                <div key={opp.label} className="flex flex-col items-center">
                  <Node
                    tone={opp.target ? "opportunityTarget" : "opportunity"}
                    className="w-[176px] whitespace-normal"
                  >
                    {opp.label}
                    {opp.target && (
                      <span className="mt-1 block font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-accentGreen/80">
                        target
                      </span>
                    )}
                  </Node>

                  <Stem />

                  <Branches>
                    {opp.solutions.map((s) => (
                      <div key={s.label} className="flex flex-col items-center">
                        <Node tone="solution" className="w-[126px] whitespace-normal !text-[11px]">
                          {s.label}
                        </Node>
                        {s.experiments && <ExperimentStack items={s.experiments} />}
                      </div>
                    ))}
                  </Branches>
                </div>
              ))}
            </Branches>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-darkSurface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-darkSurface to-transparent" />
      </div>

      <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-textFaint">
        ← Scroll to see the rest of the tree →
      </div>
    </DiagramFrame>
  );
}
