import DiagramFrame from "./DiagramFrame";

const LAYERS = [
  {
    title: "Name and description",
    detail: "~100 tokens, loaded every session",
    width: 40,
  },
  {
    title: "SKILL.md body",
    detail: "loaded only when the task matches",
    width: 68,
  },
  {
    title: "scripts/, references/, assets/",
    detail: "loaded only when that specific file is needed",
    width: 100,
  },
];

export default function ProgressiveDisclosureDiagram() {
  return (
    <DiagramFrame label="What loads, and when">
      <div className="flex flex-col gap-3">
        {LAYERS.map((layer, i) => (
          <div key={layer.title} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
            <span className="w-full flex-shrink-0 font-mono text-[11px] text-textFaint sm:w-6 sm:text-right">
              {i === 0 ? "always" : `+${i}`}
            </span>
            <div
              className="flex min-h-[52px] flex-col justify-center rounded-lg border border-primaryColor/20 bg-primaryColor/[0.06] px-4 py-2.5"
              style={{ width: "100%", maxWidth: `${layer.width}%` }}
            >
              <div className="font-display text-[13.5px] font-semibold text-white">
                {layer.title}
              </div>
              <div className="text-[12px] leading-snug text-textFaint">{layer.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
