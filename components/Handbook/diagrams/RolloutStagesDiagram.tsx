import { LuArrowRight, LuArrowDown } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

const STAGES = [
  { n: "1", when: "This week", who: "Just you", what: "Personal CLAUDE.md and settings.json" },
  { n: "2", when: "This month", who: "Your project", what: "Shared settings, skills, one hook" },
  { n: "3", when: "This quarter", who: "Your organization", what: "Plugins, managed settings, scanning" },
];

export default function RolloutStagesDiagram() {
  return (
    <DiagramFrame label="The rollout, in order">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-2.5">
        {STAGES.map((stage, i) => (
          <div key={stage.n} className="flex flex-col items-center gap-2 sm:flex-1 sm:flex-row sm:gap-2.5">
            <div className="flex w-full flex-col gap-2 rounded-xl border border-darkBorder bg-darkElevated px-4 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-primaryColor/30 bg-primaryColor/10 font-mono text-[11px] font-semibold text-primaryColor">
                  {stage.n}
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-textFaint">
                  {stage.when}
                </span>
              </div>
              <div>
                <div className="font-display text-[14px] font-semibold text-white">{stage.who}</div>
                <div className="mt-0.5 text-[12px] leading-snug text-textFaint">{stage.what}</div>
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <>
                <LuArrowDown className="h-4 w-4 flex-shrink-0 text-textFaint sm:hidden" />
                <LuArrowRight className="hidden h-4 w-4 flex-shrink-0 text-textFaint sm:block" />
              </>
            )}
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
