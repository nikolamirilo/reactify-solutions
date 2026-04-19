import ReachOut from "@/components/ReachOut";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reach out",
  description:
    "Three fields. A real partner reads every message and writes back within one business day. Even if it's to say we're not the right fit.",
  alternates: { canonical: "/reach-out" },
  openGraph: {
    title: "Reach out",
    description:
      "Three fields. A real partner reads every message and writes back within one business day.",
    url: "/reach-out",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reach out | Reactify Solutions",
    description:
      "Three fields. A real partner reads every message and writes back within one business day.",
  },
};

export default function Page() {
  return <ReachOut />;
}
