import { LuArrowRight, LuArrowDown } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

export default function SubagentDiagram() {
  return (
    <DiagramFrame label="What stays in your conversation">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-darkBorder bg-darkElevated px-4 py-4 text-center">
          <div className="font-display text-[13.5px] font-semibold text-white">Main conversation</div>
          <div className="text-[11.5px] leading-snug text-textFaint">your context window</div>
        </div>

        <div className="flex flex-col items-center gap-1 py-1 sm:py-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-textFaint">spawns</span>
          <LuArrowDown className="h-4 w-4 text-primaryColor sm:hidden" />
          <LuArrowRight className="hidden h-4 w-4 text-primaryColor sm:block" />
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-primaryColor/25 bg-primaryColor/[0.06] px-4 py-4 text-center">
          <div className="font-display text-[13.5px] font-semibold text-white">Subagent</div>
          <div className="text-[11.5px] leading-snug text-textFaint">its own, isolated context</div>
        </div>

        <div className="flex flex-col items-center gap-1 py-1 sm:py-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-textFaint">returns</span>
          <LuArrowDown className="h-4 w-4 text-accentGreen sm:hidden" />
          <LuArrowRight className="hidden h-4 w-4 text-accentGreen sm:block" />
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-accentGreen/25 bg-accentGreen/5 px-4 py-4 text-center">
          <div className="font-display text-[13.5px] font-semibold text-white">Final summary</div>
          <div className="text-[11.5px] leading-snug text-textFaint">the only part you see</div>
        </div>
      </div>
    </DiagramFrame>
  );
}
