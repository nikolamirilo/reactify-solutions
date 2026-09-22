import { LuArrowRight, LuArrowDown, LuOctagonX, LuCircleDashed } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

function Step({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl border border-darkBorder bg-darkElevated px-3 py-3 text-center">
      <div className="font-display text-[13px] font-semibold text-white">{title}</div>
      <div className="font-mono text-[11px] leading-snug text-textFaint [overflow-wrap:anywhere]">{subtitle}</div>
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-shrink-0 flex-col items-center gap-0.5">
      {label && (
        <span className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-accentGreen">{label}</span>
      )}
      <LuArrowDown className="h-4 w-4 text-textFaint sm:hidden" />
      <LuArrowRight className="hidden h-4 w-4 text-textFaint sm:block" />
    </div>
  );
}

export default function HookResolutionDiagram() {
  return (
    <DiagramFrame label="How one hook resolves: Bash “rm -rf /tmp/build”" wide>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-2">
        <Step title="Event fires" subtitle="PreToolUse" />
        <Arrow />
        <Step title="Matcher" subtitle={`"Bash"`} />
        <Arrow label="match" />
        <Step title="if condition" subtitle={`"Bash(rm *)"`} />
        <Arrow label="match" />
        <Step title="Handler runs" subtitle="block-rm.sh" />
        <Arrow />
        <div className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl border border-error/30 bg-error/5 px-3 py-3 text-center">
          <div className="flex items-center gap-1.5 font-display text-[13px] font-semibold text-white">
            <LuOctagonX className="h-3.5 w-3.5 text-error" />
            Blocked
          </div>
          <div className="font-mono text-[11px] leading-snug text-textFaint">"deny"</div>
        </div>
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-lg border border-dashed border-darkBorder px-3.5 py-2.5 text-[12px] leading-relaxed text-textFaint">
        <LuCircleDashed className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
        <span>
          If the matcher or the <code className="text-accentGreen">if</code> check does not match (say, <code className="text-accentGreen">npm test</code>),
          the handler is skipped, no process is spawned, and the call goes through the normal permission flow.
        </span>
      </div>
    </DiagramFrame>
  );
}
