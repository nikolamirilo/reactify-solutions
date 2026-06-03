import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

type Language =
  | "tsx"
  | "typescript"
  | "javascript"
  | "jsx"
  | "bash"
  | "json";

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
  const grammar = Prism.languages[language] || Prism.languages.tsx;
  const html = Prism.highlight(code.trim(), grammar, language);

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
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
          {language}
        </span>
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
