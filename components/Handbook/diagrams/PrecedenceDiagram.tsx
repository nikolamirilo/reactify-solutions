import DiagramFrame from "./DiagramFrame";

const TIERS = [
  { label: "Managed", note: "your company's file, nothing beats it", strength: 100 },
  { label: "Command-line flags", note: "what you typed to start Claude", strength: 82 },
  { label: "Local", note: ".claude/settings.local.json", strength: 64 },
  { label: "Project", note: ".claude/settings.json", strength: 46 },
  { label: "User", note: "~/.claude/settings.json", strength: 28 },
];

export default function PrecedenceDiagram() {
  return (
    <DiagramFrame label="Strongest wins, top to bottom">
      <div className="flex flex-col gap-2">
        {TIERS.map((tier, i) => (
          <div key={tier.label} className="flex items-center gap-3 sm:gap-4">
            <span className="w-4 flex-shrink-0 text-right font-mono text-[11px] text-textFaint">
              {i + 1}
            </span>
            <div
              className="flex h-12 items-center justify-between rounded-lg border border-primaryColor/20 px-3.5 sm:px-4"
              style={{
                width: `${tier.strength}%`,
                backgroundColor: `rgba(0, 212, 200, ${0.04 + (tier.strength / 100) * 0.12})`,
              }}
            >
              <span className="truncate font-display text-[13.5px] font-semibold text-white sm:text-[14.5px]">
                {tier.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 pl-7 text-[12.5px] leading-relaxed text-textFaint sm:pl-8">
        Bar width is just a visual cue for strength. A <code className="font-mono text-accentGreen">deny</code> rule
        breaks this order entirely: see the callout below.
      </p>
    </DiagramFrame>
  );
}
