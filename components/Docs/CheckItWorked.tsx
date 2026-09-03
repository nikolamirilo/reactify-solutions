import { LuCheck } from "react-icons/lu";

export default function CheckItWorked({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex max-w-[42rem] items-start gap-2.5 rounded-lg border border-accentGreen/20 bg-accentGreen/5 px-4 py-3.5">
      <LuCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-accentGreen" />
      {/* MDX wraps loose text children in its own <p> (via the `p` override
          in MdxComponents.tsx) — nesting that inside a <p> here would be
          invalid HTML and a hydration mismatch, so this is a <div> with the
          nested paragraph forced inline instead. */}
      <div className="text-[14.5px] leading-relaxed text-textSecondary [&_code]:text-accentGreen [&_p]:m-0 [&_p]:inline">
        <strong className="font-semibold text-textPrimary">Check it worked. </strong>
        {children}
      </div>
    </div>
  );
}
