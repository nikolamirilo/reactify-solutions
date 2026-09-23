import { LuArrowRight, LuArrowDown } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

function Box({
  title,
  subtitle,
  lines,
  tone = "muted",
}: {
  title: string;
  subtitle: string;
  lines: string[];
  tone?: "muted" | "primary" | "green";
}) {
  const toneClass = {
    muted: "border-darkBorder bg-darkElevated",
    primary: "border-primaryColor/25 bg-primaryColor/[0.06]",
    green: "border-accentGreen/25 bg-accentGreen/5",
  }[tone];
  return (
    <div className={`flex min-w-0 flex-1 flex-col gap-2 rounded-xl border px-3.5 py-3.5 ${toneClass}`}>
      <div>
        <div className="font-display text-[13.5px] font-semibold text-white">{title}</div>
        <div className="text-[11.5px] leading-snug text-textFaint">{subtitle}</div>
      </div>
      <div className="flex flex-col gap-1">
        {lines.map((line) => (
          <code
            key={line}
            className="rounded-md border border-darkBorder bg-darkSurface/60 px-2 py-1 font-mono text-[11px] text-textSecondary [overflow-wrap:anywhere]"
          >
            {line}
          </code>
        ))}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex flex-shrink-0 justify-center">
      <LuArrowDown className="h-4 w-4 text-textFaint sm:hidden" />
      <LuArrowRight className="hidden h-4 w-4 text-textFaint sm:block" />
    </div>
  );
}

export default function JevRequestDiagram() {
  return (
    <DiagramFrame label="One request: state and questions in, typed answers out" wide>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex min-w-0 flex-[2] flex-col gap-2">
          <Box
            title="State"
            subtitle="the evidence: text, JSON, or an array"
            lines={[`"I was charged twice. Please help ASAP."`]}
          />
          <Box
            title="Questions"
            subtitle="what you want decided, each with a type"
            lines={["team: choice", "severity: score", "urgent: noul"]}
          />
        </div>
        <Arrow />
        <Box
          title="Jev"
          subtitle="answers every question in parallel"
          lines={["POST /v1/systemone"]}
          tone="primary"
        />
        <Arrow />
        <Box
          title="Answers"
          subtitle="keyed by your question names"
          lines={[`team.choice = "billing"`, "severity.score = 1.43", "urgent.noul = 0.97"]}
          tone="green"
        />
      </div>
    </DiagramFrame>
  );
}
