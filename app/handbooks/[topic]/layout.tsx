import { notFound } from "next/navigation";
import { getTopicNav } from "@/lib/handbooks";
import HandbookShell from "@/components/Handbook/HandbookShell";

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

  return <HandbookShell nav={nav}>{children}</HandbookShell>;
}
