import DiagramFrame from "./DiagramFrame";

// The whole point of the tree is that each layer hangs off the one above it,
// so the nesting here is load-bearing rather than decorative: solutions sit
// inside the target opportunity, and each solution carries its own tests.
const OPPORTUNITIES = [
  {
    label: "I cannot tell if a track is worth my time",
    children: [
      {
        label: "Previews are too short to judge",
        target: true,
        solutions: [
          { label: "Longer preview", test: "Do people finish a 60s preview?" },
          { label: "Skip to the chorus", test: "Does it change what they save?" },
          { label: "Show why it was picked", test: "Can we explain a pick honestly?" },
        ],
      },
      { label: "I do not trust the recommendations" },
    ],
  },
  {
    label: "I lose the thing I wanted to come back to",
    children: [{ label: "Saving takes too many taps" }],
  },
  { label: "Listening with other people is awkward" },
];

const RAIL = "border-l border-darkBorder pl-4 sm:pl-5";

export default function OpportunitySolutionTreeDiagram() {
  return (
    <DiagramFrame label="One outcome, an opportunity space, solutions under the one you picked">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 rounded-lg border border-primaryColor/40 bg-primaryColor/10 px-3.5 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-primaryColor/80">
            Outcome
          </span>
          <span className="text-[13px] font-semibold text-primaryColor">
            Increase weekly listening sessions per user
          </span>
        </div>

        <div className={`ml-2 sm:ml-3 ${RAIL}`}>
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
                  <div className={`ml-2 flex flex-col gap-1.5 sm:ml-3 ${RAIL}`}>
                    {opp.children.map((child) => (
                      <div key={child.label} className="flex flex-col gap-1.5">
                        <div
                          className={`flex w-fit items-center gap-2 rounded-md border px-2.5 py-1 text-[11.5px] ${
                            child.target
                              ? "border-primaryColor/45 bg-primaryColor/[0.09] text-primaryColor"
                              : "border-darkBorder/70 bg-darkSurface text-textFaint"
                          }`}
                        >
                          {child.label}
                          {child.target && (
                            <span className="rounded border border-primaryColor/40 px-1 font-mono text-[9px] uppercase tracking-[0.08em]">
                              target
                            </span>
                          )}
                        </div>

                        {child.solutions && (
                          <div className={`ml-2 sm:ml-3 ${RAIL}`}>
                            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-textFaint">
                              Solutions · all three answer this one opportunity
                            </span>
                            <div className="flex flex-col gap-1.5">
                              {child.solutions.map((s) => (
                                <div key={s.label} className="flex flex-col gap-1">
                                  <span className="w-fit rounded-md border border-accentGreen/25 bg-accentGreen/[0.07] px-2.5 py-1 text-[11.5px] text-accentGreen">
                                    {s.label}
                                  </span>
                                  <span className="ml-3 w-fit rounded border border-darkBorder/70 bg-darkSurface px-2 py-0.5 font-mono text-[10px] text-textFaint sm:ml-4">
                                    test: {s.test}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}
