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
import ProductionAiAgentsToolUsePost, {
  meta as productionAiAgentsToolUseMeta,
} from "./posts/production-ai-agents-tool-use";
import QuickIntroductionReactNativePost, {
  meta as quickIntroductionReactNativeMeta,
} from "./posts/quick-introduction-react-native";
import PostgresqlOnlyBackendNextjsPost, {
  meta as postgresqlOnlyBackendNextjsMeta,
} from "./posts/postgresql-only-backend-nextjs";
import PwaNextjs2026GuidePost, {
  meta as pwaNextjs2026GuideMeta,
} from "./posts/pwa-nextjs-2026-guide";
import CuttingOpenAiCostsProductionPost, {
  meta as cuttingOpenAiCostsProductionMeta,
} from "./posts/cutting-openai-costs-production";

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
  {
    meta: productionAiAgentsToolUseMeta,
    Component: ProductionAiAgentsToolUsePost,
  },
  {
    meta: quickIntroductionReactNativeMeta,
    Component: QuickIntroductionReactNativePost,
  },
  {
    meta: postgresqlOnlyBackendNextjsMeta,
    Component: PostgresqlOnlyBackendNextjsPost,
  },
  {
    meta: pwaNextjs2026GuideMeta,
    Component: PwaNextjs2026GuidePost,
  },
  {
    meta: cuttingOpenAiCostsProductionMeta,
    Component: CuttingOpenAiCostsProductionPost,
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
