import { notFound } from "next/navigation";
import { getTopicNav } from "@/lib/docs";
import DocsShell from "@/components/Docs/DocsShell";

export default async function TopicLayout({
  params,
  children,
}: {
  params: Promise<{ topic: string }>;
  children: React.ReactNode;
}) {
  const { topic } = await params;
  const nav = getTopicNav(topic);

  if (!nav) {
    notFound();
  }

  return <DocsShell nav={nav}>{children}</DocsShell>;
}
