import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

// Deliberately half the vertical padding of a peer section (py-12 md:py-16
// vs. py-16 md:py-20 lg:py-28) and a ghost button rather than a filled one
// — the size is the message: a free bonus, not a second commercial offer.
const HandbooksPromo = () => {
  return (
    <section id="handbooks" className="py-12 md:py-16">
      <div className="container">
        <div className="relative grid gap-10 overflow-hidden rounded-2xl border border-darkBorder bg-darkSurface/50 px-6 py-8 backdrop-blur-sm sm:px-10 sm:py-10 lg:grid-cols-[1.15fr,0.85fr] lg:items-center lg:gap-12">
          <div
            aria-hidden
            className="bg-grid-faint pointer-events-none absolute inset-0 opacity-20 [mask-image:linear-gradient(to_right,black,transparent_75%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primaryColor/10 blur-3xl"
          />

          <div className="relative">
            <span className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-textSecondary">
              <span className="h-1.5 w-1.5 rounded-full bg-accentGreen shadow-[0_0_8px_rgba(74,222,128,0.85)]" />
              open resource · free
            </span>

            <h2 className="font-display mb-4 max-w-[560px] text-[28px] font-semibold leading-[1.14] text-white sm:text-4xl">
              We got tired of guessing how Claude works.{" "}
              <span className="text-gradient-accent">So we wrote the manual.</span>
            </h2>

            <p className="mb-6 max-w-[540px] text-[15.5px] leading-relaxed text-textSecondary">
              Settings, CLAUDE.md, hooks, skills, subagents, plugins, MCP. Every way to
              customize Claude Code, in plain language, with one example you can copy.
              We built it because we needed it.
            </p>

            <div className="mb-4 flex flex-wrap items-center gap-4">
              <Link
                href="/handbooks"
                className="inline-flex h-[42px] items-center gap-2 rounded-[10px] border border-primaryColor/40 bg-primaryColor/[0.06] px-5 font-semibold text-primaryColor transition-colors hover:bg-primaryColor/10"
              >
                Read the handbook
                <LuArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-textFaint">
              no signup · no email gate · we update it as claude ships
            </div>
          </div>

          <div className="relative rounded-xl border border-darkBorder bg-handbookCodeBg px-[22px] py-5">
            <div className="mb-3.5 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <pre className="m-0 font-mono text-[12.5px] leading-[1.85] text-textColor">
              <span className="text-textFaint"># what the handbook covers</span>
              {"\n"}
              <span className="text-textSecondary">.claude/</span>
              {"\n"}
              <span className="text-textFaint">├── </span>
              <span className="text-primaryColor">settings.json</span>
              {"   permissions, model\n"}
              <span className="text-textFaint">├── </span>
              <span className="text-primaryColor">CLAUDE.md</span>
              {"       what Claude knows\n"}
              <span className="text-textFaint">├── </span>
              <span className="text-primaryColor">hooks/</span>
              {"          scripts your hooks run\n"}
              <span className="text-textFaint">├── </span>
              <span className="text-primaryColor">skills/</span>
              {"         Claude loads on demand\n"}
              <span className="text-textFaint">└── </span>
              <span className="text-primaryColor">agents/</span>
              {"         isolated context\n"}
              <span className="text-primaryColor">.mcp.json</span>
              {"           your tools, in git\n"}
              <span className="text-textFaint"># every file, versioned in git</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HandbooksPromo;
