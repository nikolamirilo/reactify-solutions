import { LuArrowDown, LuZap } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

const STEPS: { step: string; owner: string; jev?: string }[] = [
  { step: "Request comes in", owner: "your app", jev: "Which model or agent should take this?" },
  { step: "Agent proposes a tool call", owner: "LLM", jev: "Is this call safe to run?" },
  { step: "Check permissions", owner: "code" },
  { step: "Run the tool", owner: "code" },
  { step: "Read the result", owner: "code", jev: "Is the task done, or loop again?" },
  { step: "Write the reply", owner: "LLM" },
];

export default function JevAgentLoopDiagram() {
  return (
    <DiagramFrame label="Where Jev sits in an agent loop">
      <div className="flex flex-col items-stretch gap-1.5">
        {STEPS.map((s, i) => (
          <div key={s.step} className="flex flex-col items-stretch gap-1.5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center justify-between gap-2 rounded-xl border border-darkBorder bg-darkElevated px-3.5 py-2.5">
                <span className="text-[13px] font-semibold text-white">{s.step}</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-textFaint">{s.owner}</span>
              </div>
              {s.jev ? (
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-primaryColor/30 bg-primaryColor/[0.07] px-3.5 py-2.5 text-[12px] text-textSecondary">
                  <LuZap className="h-3.5 w-3.5 flex-shrink-0 text-primaryColor" />
                  {s.jev}
                </div>
              ) : (
                <div className="hidden flex-1 sm:block" />
              )}
            </div>
            {i < STEPS.length - 1 && <LuArrowDown className="ml-6 h-3.5 w-3.5 text-textFaint" />}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-dashed border-darkBorder px-3.5 py-2.5 text-[12px] leading-relaxed text-textFaint">
        Jev answers the questions. Code enforces the rules and runs the tools. The LLM writes the words.
      </div>
    </DiagramFrame>
  );
}
