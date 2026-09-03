import { getAllDocRefs, getDocMeta } from "@/lib/docs";

export { docsNav, getTopicNav } from "./nav";

export const allDocPages = getAllDocRefs().map((ref) => {
  const meta = getDocMeta(ref.topic, ref.slug);
  return {
    topic: ref.topic,
    slug: ref.slug,
    lastReviewed: meta.lastReviewed,
  };
});
