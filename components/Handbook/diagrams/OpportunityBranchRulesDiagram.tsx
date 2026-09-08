import { LuCircleCheck, LuOctagonX } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

const NODE = "w-fit rounded-md border px-2.5 py-1 text-[10.5px] leading-snug";
const NEUTRAL = `${NODE} border-darkBorder bg-darkSurface text-textSecondary`;
const BAD = `${NODE} border-error/30 bg-error/[0.07] text-error`;
const RAIL = "ml-2 flex flex-col gap-1.5 border-l border-darkBorder pl-3";

const PATTERNS = [
  {
    title: "Overlapping siblings",
    ok: false,
    body: (
      <div className="flex flex-col gap-1.5">
        <span className={BAD}>I could not find it</span>
        <span className={BAD}>It took me ages to track down</span>
      </div>
    ),
    note: "Same need, said twice. Merge it.",
  },
  {
    title: "Vertical stack",
    ok: false,
    body: (
      <div className="flex flex-col">
        <span className={BAD}>Onboarding is confusing</span>
        <div className={RAIL}>
          <span className={BAD}>Setup is confusing</span>
          <div className={RAIL}>
            <span className={BAD}>Step 2 is confusing</span>
          </div>
        </div>
      </div>
    ),
    note: "One need, restated at three levels of detail.",
  },
  {
    title: "Healthy branch",
    ok: true,
    body: (
      <div className="flex flex-col gap-1.5">
        <span className="w-fit rounded-md border border-accentGreen/30 bg-accentGreen/[0.07] px-2.5 py-1 text-[10.5px] leading-snug text-accentGreen">
          I cannot find last week&apos;s file
        </span>
        <span className="w-fit rounded-md border border-accentGreen/30 bg-accentGreen/[0.07] px-2.5 py-1 text-[10.5px] leading-snug text-accentGreen">
          I lose track of who has the latest version
        </span>
        <span className="w-fit rounded-md border border-accentGreen/30 bg-accentGreen/[0.07] px-2.5 py-1 text-[10.5px] leading-snug text-accentGreen">
          I am not sure I am looking at the final draft
        </span>
      </div>
    ),
    note: "Distinct needs, one parent each, genuinely comparable.",
  },
];

export default function OpportunityBranchRulesDiagram() {
  return (
    <DiagramFrame label="What a branch looks like when it breaks the rules — and when it does not" wide>
      <div className="grid gap-3 sm:grid-cols-3">
        {PATTERNS.map((p) => (
          <div
            key={p.title}
            className={`flex flex-col gap-3 rounded-xl border px-3.5 py-3.5 ${
              p.ok ? "border-accentGreen/25 bg-accentGreen/[0.04]" : "border-darkBorder bg-darkElevated"
            }`}
          >
            <div className="flex items-center gap-1.5">
              {p.ok ? (
                <LuCircleCheck className="h-3.5 w-3.5 flex-shrink-0 text-accentGreen" />
              ) : (
                <LuOctagonX className="h-3.5 w-3.5 flex-shrink-0 text-error" />
              )}
              <span
                className={`font-display text-[12.5px] font-semibold ${p.ok ? "text-accentGreen" : "text-error"}`}
              >
                {p.title}
              </span>
            </div>
            {p.body}
            <div className="mt-auto text-[11px] leading-snug text-textFaint">{p.note}</div>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
