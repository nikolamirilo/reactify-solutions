import { getAllHandbookRefs, getHandbookMeta } from "@/lib/handbooks";

export { handbooksNav, getTopicNav } from "./nav";

export const allHandbookPages = getAllHandbookRefs().map((ref) => {
  const meta = getHandbookMeta(ref.topic, ref.slug);
  return {
    topic: ref.topic,
    slug: ref.slug,
    lastReviewed: meta.lastReviewed,
  };
});
