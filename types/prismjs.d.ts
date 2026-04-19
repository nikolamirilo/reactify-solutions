declare module "prismjs" {
  type Grammar = Record<string, unknown>;
  type Languages = Record<string, Grammar>;
  export const languages: Languages;
  export function highlight(
    text: string,
    grammar: Grammar,
    language: string,
  ): string;
  const Prism: { languages: Languages; highlight: typeof highlight };
  export default Prism;
}

declare module "prismjs/components/prism-typescript";
declare module "prismjs/components/prism-javascript";
declare module "prismjs/components/prism-jsx";
declare module "prismjs/components/prism-tsx";
declare module "prismjs/components/prism-bash";
declare module "prismjs/components/prism-json";
