import { LuArrowRight, LuArrowDown } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

function Row({
  tone,
  model,
  output,
  note,
}: {
  tone: "muted" | "accent";
  model: string;
  output: React.ReactNode;
  note: string;
}) {
  const outputClass =
    tone === "accent"
      ? "border-accentGreen/25 bg-accentGreen/5"
      : "border-darkBorder bg-darkElevated";
  const modelClass =
    tone === "accent"
      ? "border-primaryColor/25 bg-primaryColor/[0.06]"
      : "border-darkBorder bg-darkElevated";
  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
      <div className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-darkBorder bg-darkElevated px-3 py-3 text-center">
        <div className="font-display text-[13px] font-semibold text-white">Support ticket</div>
        <div className="font-mono text-[11px] leading-snug text-textFaint">&ldquo;Charged twice, fix ASAP&rdquo;</div>
      </div>
      <LuArrowDown className="mx-auto h-4 w-4 flex-shrink-0 text-textFaint sm:hidden" />
      <LuArrowRight className="hidden h-4 w-4 flex-shrink-0 text-textFaint sm:block" />
      <div className={`flex flex-1 flex-col items-center gap-1 rounded-xl border px-3 py-3 text-center ${modelClass}`}>
        <div className="font-display text-[13px] font-semibold text-white">{model}</div>
        <div className="text-[11px] leading-snug text-textFaint">{note}</div>
      </div>
      <LuArrowDown className="mx-auto h-4 w-4 flex-shrink-0 text-textFaint sm:hidden" />
      <LuArrowRight className="hidden h-4 w-4 flex-shrink-0 text-textFaint sm:block" />
      <div className={`flex flex-[1.4] flex-col gap-1 rounded-xl border px-3 py-3 font-mono text-[11px] leading-snug ${outputClass}`}>
        {output}
      </div>
    </div>
  );
}

export default function JevVsLlmDiagram() {
  return (
    <DiagramFrame label="Same input, two kinds of model" wide>
      <div className="flex flex-col gap-5">
        <Row
          tone="muted"
          model="Chat LLM"
          note="generates text, 3 to 300+ s"
          output={
            <span className="text-textSecondary">
              &ldquo;This looks like a billing issue, and it seems fairly urgent...&rdquo;
              <span className="mt-1 block text-textFaint">you still have to parse it</span>
            </span>
          }
        />
        <Row
          tone="accent"
          model="Jev"
          note="picks from your options, 70 to 500 ms"
          output={
            <>
              <span className="text-accentGreen">team: &quot;billing&quot;, p 0.94</span>
              <span className="text-accentGreen">urgent: 0.97</span>
              <span className="text-textFaint">ready for an if statement</span>
            </>
          }
        />
      </div>
    </DiagramFrame>
  );
}
