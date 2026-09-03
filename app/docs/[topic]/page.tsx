import { redirect, notFound } from "next/navigation";
import { getTopicNav } from "@/lib/docs";

export default async function TopicIndexPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const nav = getTopicNav(topic);

  if (!nav) {
    notFound();
  }

  const firstPage = nav.pages[0]?.pages[0];
  if (!firstPage) {
    notFound();
  }

  redirect(`/docs/${topic}/${firstPage.slug}`);
}
