import { LuArrowDown, LuRepeat } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

// What /goal does after every turn, per Anthropic's /goal docs: a small fast
// model reads the condition and the transcript and returns one of three
// verdicts. It never runs tools itself, so it can only judge what Claude has
// already shown in the conversation.
const VERDICTS = [
  {
    name: "Not yet met",
    result: "Claude starts another turn, with the reason as its guide",
    box: "border-primaryColor/30 bg-primaryColor/[0.06]",
    label: "text-primaryColor",
  },
  {
    name: "Met",
    result: "The goal clears and is marked achieved",
    box: "border-accentGreen/30 bg-accentGreen/[0.06]",
    label: "text-accentGreen",
  },
  {
    name: "Impossible",
    result: "The goal clears and is marked failed, with the reason",
    box: "border-error/30 bg-error/[0.06]",
    label: "text-error",
  },
];

const FOOTNOTE =
  "“Not yet met” sends Claude back to the top. A cap in your condition, like “stop after 5 tries”, is what bounds the loop.";

function Step({ title, note, accent }: { title: string; note: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 text-center ${
        accent ? "border-primaryColor/25 bg-primaryColor/[0.06]" : "border-darkBorder bg-darkElevated"
      }`}
    >
      <div className="font-display text-[13.5px] font-semibold text-white">{title}</div>
      <div className="mt-0.5 text-[11.5px] leading-snug text-textFaint">{note}</div>
    </div>
  );
}

function Down({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 py-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-textFaint">{label}</span>
      <LuArrowDown className="h-3.5 w-3.5 text-textFaint" />
    </div>
  );
}

export default function GoalEvaluatorDiagram() {
  return (
    <DiagramFrame label="What /goal does each time Claude stops">
      <div className="flex flex-col">
        <Step title="Claude works one turn" note="reads, edits, runs the check you named" />
        <Down label="turn ends" />
        <Step
          accent
          title="The evaluator reads your condition"
          note="a small fast model, Haiku by default. It sees only the transcript and runs nothing"
        />
        <Down label="one verdict" />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {VERDICTS.map((v) => (
            <div key={v.name} className={`rounded-xl border px-3.5 py-3 ${v.box}`}>
              <div className={`font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] ${v.label}`}>
                {v.name}
              </div>
              <div className="mt-1 text-[12px] leading-snug text-textSecondary">{v.result}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-darkBorder pt-3.5 text-[12px] leading-relaxed text-textFaint">
        <LuRepeat className="h-3.5 w-3.5 flex-shrink-0 text-primaryColor" />
        {FOOTNOTE}
      </div>
    </DiagramFrame>
  );
}
