import fs from "fs";
import path from "path";
import GithubSlugger from "github-slugger";
import { docsNav, getTopicNav } from "@/content/docs/nav";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

export type DocFrontmatter = {
  title: string;
  description: string;
  lastReviewed: string;
  verifiedAgainst: string;
  appliesTo: string;
};

export type DocHeading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export type DocRef = {
  topic: string;
  slug: string;
  label: string;
  section: string;
};

export type DocPageMeta = DocRef & DocFrontmatter;

function readSource(topic: string, slug: string): string {
  const file = path.join(DOCS_DIR, topic, `${slug}.mdx`);
  return fs.readFileSync(file, "utf8");
}

// Frontmatter here is always a flat key: value block — no nested structures —
// so a small line-based parser is enough and avoids a second markdown
// dependency (next-mdx-remote already parses this same block for rendering).
function parseFrontmatter(source: string): { data: DocFrontmatter; body: string } {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    throw new Error("Doc file is missing its --- frontmatter block");
  }
  const raw = match[1];
  const body = source.slice(match[0].length);
  const data: Record<string, string> = {};
  raw.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    data[key] = value;
  });
  return { data: data as unknown as DocFrontmatter, body };
}

function extractHeadings(body: string): DocHeading[] {
  const slugger = new GithubSlugger();
  const headings: DocHeading[] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = line.match(/^(#{2,3})\s+(.*)$/);
    if (!match) continue;
    const depth = match[1].length as 2 | 3;
    const text = match[2].trim();
    headings.push({ id: slugger.slug(text), text, depth });
  }
  return headings;
}

export function getAllDocRefs(): DocRef[] {
  return docsNav.flatMap((t) =>
    t.pages.flatMap((section) =>
      section.pages.flatMap((p) => {
        const base: DocRef = { topic: t.topic, slug: p.slug, label: p.label, section: section.title };
        if (!p.children?.length) return [base];
        return [
          base,
          ...p.children.map((child) => ({
            topic: t.topic,
            slug: child.slug,
            label: child.label,
            section: section.title,
          })),
        ];
      }),
    ),
  );
}

export function getDocRefsForTopic(topic: string): DocRef[] {
  return getAllDocRefs().filter((r) => r.topic === topic);
}

export function docExists(topic: string, slug: string): boolean {
  return getAllDocRefs().some((r) => r.topic === topic && r.slug === slug);
}

export function getDocMeta(topic: string, slug: string): DocPageMeta {
  const ref = getAllDocRefs().find((r) => r.topic === topic && r.slug === slug);
  if (!ref) {
    throw new Error(`Unknown doc page: ${topic}/${slug}`);
  }
  const source = readSource(topic, slug);
  const { data } = parseFrontmatter(source);
  return { ...ref, ...data };
}

export function getDocHeadings(topic: string, slug: string): DocHeading[] {
  const source = readSource(topic, slug);
  const { body } = parseFrontmatter(source);
  return extractHeadings(body);
}

export function getDocBody(topic: string, slug: string): string {
  const source = readSource(topic, slug);
  return parseFrontmatter(source).body;
}

export function getAdjacentDocs(
  topic: string,
  slug: string,
): { prev: DocRef | null; next: DocRef | null } {
  const refs = getDocRefsForTopic(topic);
  const idx = refs.findIndex((r) => r.slug === slug);
  return {
    prev: idx > 0 ? refs[idx - 1] : null,
    next: idx >= 0 && idx < refs.length - 1 ? refs[idx + 1] : null,
  };
}

export type DocSearchEntry = {
  id: string;
  topic: string;
  slug: string;
  pageLabel: string;
  heading: string | null;
  snippet: string;
  url: string;
};

// A section is the plain-text run under one ## heading. JSX component
// tags and their props are skipped rather than indexed literally — the
// content underneath a <Callout> or <CodeBlock> is what a reader searches
// for, not the component syntax.
function splitIntoSections(body: string): { id: string; heading: string; text: string }[] {
  const slugger = new GithubSlugger();
  const sections: { id: string; heading: string; text: string }[] = [];
  let current: { id: string; heading: string; text: string } | null = null;
  let inFence = false;

  for (const rawLine of body.split("\n")) {
    const trimmed = rawLine.trim();
    if (/^```/.test(trimmed)) {
      inFence = !inFence;
      continue;
    }
    if (inFence || !trimmed) continue;

    const h2 = rawLine.match(/^##\s+(.*)$/);
    if (h2) {
      if (current) sections.push(current);
      const heading = h2[1].trim();
      current = { id: slugger.slug(heading), heading, text: "" };
      continue;
    }
    if (/^#{1,4}\s/.test(rawLine)) continue; // h1/h3/h4 — indexed under their parent h2
    if (/^<\/?[A-Z]/.test(trimmed)) continue; // JSX component open/close/self-close
    if (/^\/?>$/.test(trimmed)) continue; // a lone JSX closing bracket
    if (/^[a-zA-Z][\w-]*=/.test(trimmed)) continue; // a JSX prop line

    const plain = trimmed
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

    if (current) {
      current.text = current.text ? `${current.text} ${plain}` : plain;
    }
  }
  if (current) sections.push(current);
  return sections;
}

export function getSearchIndex(): DocSearchEntry[] {
  const entries: DocSearchEntry[] = [];
  for (const ref of getAllDocRefs()) {
    const meta = getDocMeta(ref.topic, ref.slug);
    const body = getDocBody(ref.topic, ref.slug);

    entries.push({
      id: `${ref.topic}/${ref.slug}`,
      topic: ref.topic,
      slug: ref.slug,
      pageLabel: ref.label,
      heading: null,
      snippet: meta.description,
      url: `/docs/${ref.topic}/${ref.slug}`,
    });

    for (const section of splitIntoSections(body)) {
      entries.push({
        id: `${ref.topic}/${ref.slug}#${section.id}`,
        topic: ref.topic,
        slug: ref.slug,
        pageLabel: ref.label,
        heading: section.heading,
        snippet: section.text.slice(0, 220),
        url: `/docs/${ref.topic}/${ref.slug}#${section.id}`,
      });
    }
  }
  return entries;
}

export { docsNav, getTopicNav };
