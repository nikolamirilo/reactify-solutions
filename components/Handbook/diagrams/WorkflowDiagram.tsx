import { LuArrowRight, LuArrowDown } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

export default function WorkflowDiagram() {
  return (
    <DiagramFrame label="How a workflow runs">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-darkBorder bg-darkElevated px-4 py-4 text-center">
          <div className="font-display text-[13.5px] font-semibold text-white">Your script</div>
          <div className="text-[11.5px] leading-snug text-textFaint">.claude/workflows/*.js</div>
        </div>

        <div className="flex flex-col items-center gap-1 py-1 sm:py-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-textFaint">spawns</span>
          <LuArrowDown className="h-4 w-4 text-primaryColor sm:hidden" />
          <LuArrowRight className="hidden h-4 w-4 text-primaryColor sm:block" />
        </div>

        <div className="flex flex-1 flex-col items-center gap-2">
          {["Agent 1", "Agent 2", "Agent 3"].map((label, i) => (
            <div
              key={i}
              className="w-full rounded-lg border border-primaryColor/25 bg-primaryColor/[0.06] px-3 py-2 text-center"
            >
              <div className="font-display text-[13px] font-semibold text-white">{label}</div>
              <div className="text-[11px] leading-snug text-textFaint">isolated context</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1 py-1 sm:py-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-textFaint">returns</span>
          <LuArrowDown className="h-4 w-4 text-accentGreen sm:hidden" />
          <LuArrowRight className="hidden h-4 w-4 text-accentGreen sm:block" />
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-accentGreen/25 bg-accentGreen/5 px-4 py-4 text-center">
          <div className="font-display text-[13.5px] font-semibold text-white">Combined result</div>
          <div className="text-[11.5px] leading-snug text-textFaint">merged by your script</div>
        </div>
      </div>
    </DiagramFrame>
  );
}
