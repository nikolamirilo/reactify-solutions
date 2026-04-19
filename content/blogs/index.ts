import { Blog } from "@/types";
import QuicktalogBuildingAiCatalogPost, {
  meta as quicktalogBuildingAiCatalogMeta,
} from "./posts/quicktalog-building-ai-catalog";
import UnbgBrowserBasedAiBackgroundRemovalPost, {
  meta as unbgBrowserBasedAiBackgroundRemovalMeta,
} from "./posts/unbg-browser-based-ai-background-removal";
import RagNextjsLangchainVercelAiSdkPost, {
  meta as ragNextjsLangchainVercelAiSdkMeta,
} from "./posts/rag-nextjs-langchain-vercel-ai-sdk";
import EndToEndAnalyticsMicrosoftFabricPost, {
  meta as endToEndAnalyticsMicrosoftFabricMeta,
} from "./posts/end-to-end-analytics-microsoft-fabric";
import NextjsSeoChecklist2026Post, {
  meta as nextjsSeoChecklist2026Meta,
} from "./posts/nextjs-seo-checklist-2026";

type PostRegistryEntry = {
  meta: Blog;
  Component: () => JSX.Element;
};

const posts: PostRegistryEntry[] = [
  {
    meta: quicktalogBuildingAiCatalogMeta,
    Component: QuicktalogBuildingAiCatalogPost,
  },
  {
    meta: unbgBrowserBasedAiBackgroundRemovalMeta,
    Component: UnbgBrowserBasedAiBackgroundRemovalPost,
  },
  {
    meta: ragNextjsLangchainVercelAiSdkMeta,
    Component: RagNextjsLangchainVercelAiSdkPost,
  },
  {
    meta: endToEndAnalyticsMicrosoftFabricMeta,
    Component: EndToEndAnalyticsMicrosoftFabricPost,
  },
  {
    meta: nextjsSeoChecklist2026Meta,
    Component: NextjsSeoChecklist2026Post,
  },
];

export const allPostsMeta: Blog[] = posts
  .map((p) => p.meta)
  .sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );

export function getPostBySlug(slug: string): PostRegistryEntry | undefined {
  return posts.find((p) => p.meta.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return posts.map((p) => p.meta.slug);
}
