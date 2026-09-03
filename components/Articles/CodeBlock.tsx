"use client";

import { useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-ini";
import { LuCheck, LuCopy } from "react-icons/lu";

type Language =
  | "tsx"
  | "typescript"
  | "javascript"
  | "jsx"
  | "bash"
  | "json"
  | "python"
  | "yaml"
  | "markdown"
  | "diff"
  | "ini"
  | "text";

type Props = {
  code: string;
  language?: Language;
  filename?: string;
};

export default function CodeBlock({
  code,
  language = "tsx",
  filename,
}: Props) {
  const [copied, setCopied] = useState(false);
  const trimmed = code.trim();

  // A missing grammar must render as plain text, not silently borrow tsx's
  // rules — that produces confidently wrong highlighting for the reader.
  const grammar = language !== "text" ? Prism.languages[language] : undefined;
  const html = grammar
    ? Prism.highlight(trimmed, grammar, language)
    : trimmed.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be denied by the browser; failing silently
      // is preferable to breaking the page over a non-essential feature.
    }
  };

  return (
    <figure className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#161b22] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          {filename && (
            <span className="font-mono text-xs text-white/70">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-white/50 transition-colors hover:border-primaryColor/40 hover:text-primaryColor"
          >
            {copied ? (
              <>
                <LuCheck className="h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <LuCopy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
      <pre className="!m-0 overflow-x-auto !bg-transparent !p-5 text-[13px] leading-relaxed text-white/90">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </figure>
  );
}
