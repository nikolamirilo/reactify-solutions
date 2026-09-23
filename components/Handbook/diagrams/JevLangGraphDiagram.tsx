import { LuArrowDown, LuArrowRight } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

function Node({
  title,
  subtitle,
  tone = "muted",
}: {
  title: string;
  subtitle: string;
  tone?: "muted" | "primary" | "green" | "warn";
}) {
  const toneClass = {
    muted: "border-darkBorder bg-darkElevated",
    primary: "border-primaryColor/30 bg-primaryColor/[0.07]",
    green: "border-accentGreen/25 bg-accentGreen/5",
    warn: "border-starYellow/30 bg-starYellow/[0.06]",
  }[tone];
  return (
    <div className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl border px-3 py-2.5 text-center ${toneClass}`}>
      <div className="font-display text-[13px] font-semibold text-white">{title}</div>
      <div className="font-mono text-[10.5px] leading-snug text-textFaint [overflow-wrap:anywhere]">{subtitle}</div>
    </div>
  );
}

export default function JevLangGraphDiagram() {
  return (
    <DiagramFrame label="A LangGraph graph with Jev as the router node" wide>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
        <Node title="START" subtitle="new ticket" />
        <div className="flex justify-center">
          <LuArrowDown className="h-4 w-4 text-textFaint sm:hidden" />
          <LuArrowRight className="hidden h-4 w-4 text-textFaint sm:block" />
        </div>
        <Node title="triage" subtitle="Jev: team + urgent" tone="primary" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-accentGreen">route()</span>
          <LuArrowDown className="h-4 w-4 text-textFaint sm:hidden" />
          <LuArrowRight className="hidden h-4 w-4 text-textFaint sm:block" />
        </div>
        <div className="flex min-w-0 flex-[1.6] flex-col gap-2">
          <Node title="billing" subtitle="LLM agent" tone="green" />
          <Node title="technical" subtitle="LLM agent" tone="green" />
          <Node title="human_review" subtitle="confidence < 0.5" tone="warn" />
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-dashed border-darkBorder px-3.5 py-2.5 text-[12px] leading-relaxed text-textFaint">
        Jev makes the decision in one fast call. Plain Python in <code className="text-accentGreen">route()</code> turns
        it into an edge. The LLM only runs in the node that actually has to write something.
      </div>
    </DiagramFrame>
  );
}
