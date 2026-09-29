import { Article } from "@/types";

export type ArticleTopic = {
  id: string;
  label: string;
  /** An article belongs to the topic when it carries any of these tags. */
  tags: string[];
};

// Post tags are free-form and very long-tailed (most appear on a single post),
// so filtering on them directly would give dozens of one-article buttons. These
// group them into a handful of topics a reader would actually browse by.
export const ARTICLE_TOPICS: ArticleTopic[] = [
  { id: "agents", label: "AI Agents", tags: ["Agents"] },
  {
    id: "protocols",
    label: "MCP & Protocols",
    tags: ["MCP", "A2A", "AG-UI", "Protocol", "ACP", "AP2"],
  },
  {
    id: "llm",
    label: "LLM Engineering",
    tags: ["RAG", "LLM", "Cost", "Context Engineering", "Prompt Caching"],
  },
  {
    id: "web",
    label: "Web & Mobile",
    tags: ["Next.js", "PWA", "React Native", "SEO", "PostgreSQL", "Frontend"],
  },
  {
    id: "case-studies",
    label: "Case Studies",
    tags: ["Case Study", "Quicktalog", "unbg", "Data Analytics"],
  },
];

export const articleHasTopic = (article: Article, topic: ArticleTopic) =>
  article.tags.some((tag) => topic.tags.includes(tag));

// Tags that sit on most posts and so say nothing about any one of them.
const GENERIC_TAGS = new Set(["AI", "Agents", "Production"]);

/** The most specific tag on a post, shown as its label on cards. */
export const primaryTag = (article: Article) =>
  article.tags.find((tag) => !GENERIC_TAGS.has(tag)) ?? article.tags[0];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * `2026-09-23` → `Sep 23, 2026`. Formatted by hand rather than with
 * `toLocaleDateString` so the server and the browser always agree: a date-only
 * string parses as UTC midnight, which lands on the previous day in any
 * timezone west of UTC and would break hydration of the client-side grid.
 */
export const formatArticleDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
};
