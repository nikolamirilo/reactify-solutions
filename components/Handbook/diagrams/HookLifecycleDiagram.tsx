import { LuArrowDown, LuRepeat, LuZap } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

// Mirrors the lifecycle graph in Anthropic's hooks reference: a session
// wraps a per-turn loop, which wraps the agentic (per-tool-call) loop, with
// a set of events that fire outside that sequence entirely.

function Event({
  name,
  note,
  blocks,
}: {
  name: string;
  note?: string;
  blocks?: boolean;
}) {
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-darkBorder bg-darkElevated px-3 py-2">
      <div className="min-w-0">
        <div className="font-mono text-[12px] font-semibold text-white [overflow-wrap:anywhere]">{name}</div>
        {note && <div className="text-[11px] leading-snug text-textFaint">{note}</div>}
      </div>
      {blocks && (
        <span
          className="h-2 w-2 flex-shrink-0 rounded-full bg-error"
          title="Can block"
          aria-label="Can block"
        />
      )}
    </div>
  );
}

function Down() {
  return (
    <div className="flex justify-center py-1">
      <LuArrowDown className="h-3.5 w-3.5 text-textFaint" />
    </div>
  );
}

function Loop({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "primary" | "green";
  children: React.ReactNode;
}) {
  const toneClasses =
    tone === "primary"
      ? "border-primaryColor/30 bg-primaryColor/[0.04] text-primaryColor"
      : "border-accentGreen/30 bg-accentGreen/[0.04] text-accentGreen";
  return (
    <div className={`rounded-xl border border-dashed p-3 ${toneClasses}`}>
      <div className="mb-2.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em]">
        <LuRepeat className="h-3 w-3" />
        {label}
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function Side({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-darkBorder bg-darkSurface/60 p-3">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-textFaint">{title}</div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

export default function HookLifecycleDiagram() {
  return (
    <DiagramFrame label="The hook lifecycle" wide>
      <div className="flex flex-col gap-6">
        {/* Main sequence */}
        <div className="flex flex-col">
          <Event name="Setup" note="optional: --init-only, -p --init, -p --maintenance" />
          <Down />
          <Event name="SessionStart" note="startup · resume · clear · compact · fork" />
          <Down />

          <Loop label="Per turn · repeats for every prompt" tone="primary">
            <Event name="UserPromptSubmit" blocks />
            <Down />
            <Event name="UserPromptExpansion" note="only when a /command expands" blocks />
            <Down />

            <Loop label="Agentic loop · every tool call" tone="green">
              <Event name="PreToolUse" blocks />
              <Down />
              <Event name="PermissionRequest" note="only if a prompt would be shown" />
              <div className="ml-4 mt-1.5 border-l border-dashed border-error/40 pl-3">
                <Event name="PermissionDenied" note="side branch: auto mode denied it" />
              </div>
              <Down />
              <div className="rounded-lg border border-darkBorder/70 px-3 py-2 text-center text-[11.5px] text-textFaint">
                tool runs
                <span className="mt-1 block font-mono text-[11px] text-textSecondary">
                  Elicitation → ElicitationResult (inside an MCP tool)
                </span>
              </div>
              <Down />
              <div className="grid grid-cols-2 gap-1.5">
                <Event name="PostToolUse" note="succeeded" />
                <Event name="PostToolUseFailure" note="failed" />
              </div>
              <Down />
              <Event name="PostToolBatch" note="after a parallel batch resolves" blocks />
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                <Event name="SubagentStart" />
                <Event name="SubagentStop" blocks />
                <Event name="TaskCreated" blocks />
                <Event name="TaskCompleted" blocks />
              </div>
            </Loop>

            <Down />
            <div className="grid grid-cols-2 gap-1.5">
              <Event name="Stop" note="turn finished" blocks />
              <Event name="StopFailure" note="API error ended it" />
            </div>
            <Down />
            <Event name="TeammateIdle" note="agent teams only" blocks />
          </Loop>

          <Down />
          <div className="grid grid-cols-2 gap-1.5">
            <Event name="PreCompact" blocks />
            <Event name="PostCompact" />
          </div>
          <Down />
          <Event name="SessionEnd" note="clear · resume · logout · prompt_input_exit · other" />
        </div>

        {/* Out-of-band events */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-starYellow">
            <LuZap className="h-3 w-3" />
            Fire outside the sequence
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Side title="Async, any time">
              <Event name="Notification" />
              <Event name="InstructionsLoaded" />
              <Event name="ConfigChange" blocks />
              <Event name="CwdChanged" />
              <Event name="FileChanged" />
              <Event name="DirectoryAdded" />
              <Event name="WorktreeCreate" blocks />
              <Event name="WorktreeRemove" blocks />
            </Side>
            <div className="flex flex-col gap-3">
              <Side title="Model switch">
                <Event name="PreModelSwitch" note="sequential, before a requested switch" blocks />
                <Event name="PostModelSwitch" note="async, after any change" />
              </Side>
              <Side title="Display only">
                <Event name="MessageDisplay" note="while assistant text streams" />
              </Side>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-darkBorder/70 px-3 py-2 text-[11.5px] text-textFaint">
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-error" />
            can block, via exit code 2 or a JSON decision
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}
