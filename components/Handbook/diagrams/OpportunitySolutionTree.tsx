import DiagramFrame from "./DiagramFrame";

type Node = { label: string; children?: Node[] };

const OPPORTUNITIES: Node[] = [
  {
    label: "I cannot tell if a track is worth my time",
    children: [
      { label: "Previews are too short to judge" },
      { label: "I do not trust the recommendations" },
    ],
  },
  {
    label: "I lose the thing I wanted to come back to",
    children: [{ label: "Saving takes too many taps" }],
  },
  { label: "Listening with other people is awkward" },
];

const SOLUTIONS = ["Longer preview", "Skip-to-chorus", "One-tap save"];

function Rail({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-2 border-l border-darkBorder pl-4 sm:ml-3 sm:pl-5">{children}</div>
  );
}

export default function OpportunitySolutionTree() {
  return (
    <DiagramFrame label="One outcome, an opportunity space, then solutions">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 rounded-lg border border-primaryColor/40 bg-primaryColor/10 px-3.5 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-primaryColor/70">
            Outcome
          </span>
          <span className="text-[13px] font-semibold text-primaryColor">
            Increase weekly listening sessions per user
          </span>
        </div>

        <Rail>
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-textFaint">
            Opportunities · what customers said, in their words
          </span>
          <div className="flex flex-col gap-2.5">
            {OPPORTUNITIES.map((opp) => (
              <div key={opp.label} className="flex flex-col gap-1.5">
                <div className="w-fit rounded-md border border-darkBorder bg-darkElevated px-3 py-1.5 text-[12.5px] text-textSecondary">
                  {opp.label}
                </div>
                {opp.children && (
                  <div className="ml-2 flex flex-col gap-1.5 border-l border-darkBorder/70 pl-4 sm:ml-3 sm:pl-5">
                    {opp.children.map((child) => (
                      <div
                        key={child.label}
                        className="w-fit rounded-md border border-darkBorder/70 bg-darkSurface px-2.5 py-1 text-[11.5px] text-textFaint"
                      >
                        {child.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-textFaint">
              Solutions · only under the one opportunity you picked
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SOLUTIONS.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-accentGreen/25 bg-accentGreen/[0.07] px-2.5 py-1 text-[11.5px] text-accentGreen"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-3">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-textFaint">
                Assumption tests · under each solution
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["Will anyone use it?", "Can we build it?", "Does it change behavior?"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-md border border-darkBorder/70 bg-darkSurface px-2.5 py-1 font-mono text-[10.5px] text-textFaint"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </Rail>
      </div>
    </DiagramFrame>
  );
}
