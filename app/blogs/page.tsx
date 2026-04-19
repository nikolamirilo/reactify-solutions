import blogData from "@/components/Blogs/blogData";
import SingleBlog from "@/components/Blogs/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical write-ups, product case studies, and practical lessons from building AI-powered software, digital catalogs, and automation tooling.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Blog | Reactify Solutions",
    description:
      "Technical write-ups, product case studies, and lessons from building AI-powered software for real businesses.",
    url: "/blogs",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Reactify Solutions",
    description:
      "Technical write-ups and product case studies from Reactify Solutions.",
  },
};

export default function page() {
  return (
    <>
      <Breadcrumb
        pageName="Blog"
        description="Technical write-ups, product case studies, and practical lessons from building AI-powered software, digital catalogs, and automation tooling."
      />

      <section className="pb-[120px] pt-[60px]">
        <div className="container">
          {blogData.length === 0 ? (
            <p className="text-center text-textColor dark:text-white/70">
              New posts coming soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {blogData.map((blog) => (
                <SingleBlog key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
