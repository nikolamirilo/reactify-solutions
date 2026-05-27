import Breadcrumb from "@/components/Common/Breadcrumb";
import policiesData from "@/components/PrivacyPolicies/policiesData";
import solutionsData from "@/components/Solutions/solutionsData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  // Only prerender policy pages for solutions that both exist (visible) and
  // have a policy defined in policiesData.
  const solutionIds = new Set(
    solutionsData.filter((s) => s.visible).map((s) => s.id),
  );
  return policiesData
    .filter((p) => solutionIds.has(p.id))
    .map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const policy = policiesData.find((p) => p.id === id);

  if (!policy) {
    return { title: "Privacy Policy Not Found" };
  }

  const canonical = `/solutions/${policy.id}/privacy-policy`;

  return {
    title: policy.metaTitle,
    description: policy.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: policy.metaTitle,
      description: policy.metaDescription,
      url: canonical,
      images: ["/opengraph-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${policy.metaTitle} | Reactify Solutions`,
      description: policy.metaDescription,
    },
  };
}

export default async function SolutionPrivacyPolicyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const policy = policiesData.find((p) => p.id === id);

  if (!policy) {
    notFound();
  }

  return (
    <>
      <Breadcrumb
        pageName={`Privacy Policy · ${policy.productName}`}
        description={policy.breadcrumbDescription}
        contentClassName="mx-auto max-w-4xl"
      />

      <section className="pb-16 pt-4 md:pb-24">
        <div className="container">
          <article className="mx-auto max-w-4xl space-y-10 text-textSecondary">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-textColor">
              last updated · {policy.lastUpdated}
            </p>

            {policy.sections.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                  {section.heading}
                </h2>
                {section.body}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
