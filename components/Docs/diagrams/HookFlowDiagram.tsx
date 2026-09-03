import { LuArrowRight, LuArrowDown, LuCircleCheck, LuOctagonX } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

function Node({
  title,
  subtitle,
  tone = "default",
}: {
  title: string;
  subtitle?: string;
  tone?: "default" | "good" | "bad";
}) {
  const toneClasses =
    tone === "good"
      ? "border-accentGreen/30 bg-accentGreen/5"
      : tone === "bad"
        ? "border-error/30 bg-error/5"
        : "border-darkBorder bg-darkElevated";
  return (
    <div className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl border px-4 py-3.5 text-center ${toneClasses}`}>
      <div className="flex items-center gap-1.5 font-display text-[13.5px] font-semibold text-white">
        {tone === "good" && <LuCircleCheck className="h-3.5 w-3.5 flex-shrink-0 text-accentGreen" />}
        {tone === "bad" && <LuOctagonX className="h-3.5 w-3.5 flex-shrink-0 text-error" />}
        <span>{title}</span>
      </div>
      {subtitle && <div className="text-[11.5px] leading-snug text-textFaint">{subtitle}</div>}
    </div>
  );
}

export default function HookFlowDiagram() {
  return (
    <DiagramFrame label="A PreToolUse hook, start to finish">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-2.5">
        <Node title="Tool call requested" subtitle="e.g. Claude wants to run Bash" />
        <LuArrowDown className="h-4 w-4 flex-shrink-0 text-textFaint sm:hidden" />
        <LuArrowRight className="hidden h-4 w-4 flex-shrink-0 text-textFaint sm:block" />
        <Node title="Your hook script runs" subtitle="reads the event, decides" />
        <LuArrowDown className="h-4 w-4 flex-shrink-0 text-textFaint sm:hidden" />
        <LuArrowRight className="hidden h-4 w-4 flex-shrink-0 text-textFaint sm:block" />
        <div className="flex w-full flex-1 flex-col gap-2 sm:w-auto">
          <Node title="Exit 2" subtitle="tool call blocked" tone="bad" />
          <Node title="Exit 0 or other" subtitle="tool call proceeds" tone="good" />
        </div>
      </div>
    </DiagramFrame>
  );
}
