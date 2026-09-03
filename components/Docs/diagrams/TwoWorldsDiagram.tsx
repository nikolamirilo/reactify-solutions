import { LuFolderGit2, LuCloud, LuBox } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

export default function TwoWorldsDiagram() {
  return (
    <DiagramFrame label="The two worlds">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-0">
        {/* Claude Code */}
        <div className="flex flex-1 flex-col items-center gap-3 rounded-xl border border-darkBorder bg-darkElevated px-5 py-6 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primaryColor/25 bg-primaryColor/10 text-primaryColor">
            <LuFolderGit2 className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-base font-semibold text-white">Claude Code</div>
            <div className="mt-1 text-[13px] leading-snug text-textFaint">
              Files in your repo,
              <br />
              versioned with git
            </div>
          </div>
        </div>

        {/* Bridge */}
        <div className="flex flex-row items-center justify-center gap-2 py-2 sm:flex-col sm:gap-1.5 sm:px-4 sm:py-0">
          <span className="h-px w-8 bg-darkBorderStrong sm:h-8 sm:w-px" />
          <span className="whitespace-nowrap rounded-full border border-accentGreen/25 bg-accentGreen/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-accentGreen">
            Skills bridge
          </span>
          <span className="h-px w-8 bg-darkBorderStrong sm:h-8 sm:w-px" />
        </div>

        {/* Claude apps */}
        <div className="flex flex-1 flex-col items-center gap-3 rounded-xl border border-darkBorder bg-darkElevated px-5 py-6 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primaryColor/25 bg-primaryColor/10 text-primaryColor">
            <LuCloud className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-base font-semibold text-white">Claude apps</div>
            <div className="mt-1 text-[13px] leading-snug text-textFaint">
              Settings in your account,
              <br />
              follows you everywhere
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2 text-[12.5px] leading-relaxed text-textFaint">
        <LuBox className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
        <span>
          A <code className="font-mono text-accentGreen">SKILL.md</code> folder is the only
          artifact that works on both sides. Everything else belongs to one world.
        </span>
      </div>
    </DiagramFrame>
  );
}
