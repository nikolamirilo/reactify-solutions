import { DocPageMeta } from "@/lib/docs";

export default function VerifiedFooter({ meta }: { meta: DocPageMeta }) {
  return (
    <div className="mt-14 max-w-[42rem] border-t border-darkBorder pt-5 font-mono text-[11.5px] text-textFaint">
      Last reviewed {formatDate(meta.lastReviewed)}
      {meta.verifiedAgainst ? <> · verified against {meta.verifiedAgainst}</> : null}
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
