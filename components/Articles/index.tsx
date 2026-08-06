import SectionTitle from "../Common/SectionTitle";
import ArticlesGrid from "./ArticlesGrid";
import { allPostsMeta } from "@/content/articles";

// Server Component on purpose. The post registry in `@/content/articles` holds a
// reference to every article body, so importing it from a client component pulled
// all of them (plus Prism) into the browser bundle for a listing that only needs
// titles and excerpts. Rendering here keeps the bodies on the server and sends
// just the metadata across to the small client grid.
const Articles = ({
  variant = "default",
}: {
  variant?: "articles" | "default";
}) => {
  if (allPostsMeta.length === 0) {
    return null;
  }

  const isPreview = variant === "default";
  const articles = isPreview ? allPostsMeta.slice(0, 4) : allPostsMeta;

  return (
    <section
      id="articles"
      className={isPreview ? "py-16 md:py-20 lg:py-28" : "pt-2 pb-16"}
    >
      <div className="container">
        {isPreview && (
          <SectionTitle
            title="Check out our posts"
            paragraph="Technical write-ups, product case studies, and practical lessons from building AI-powered software, digital catalogs, and automation tooling."
            center
          />
        )}
        <ArticlesGrid articles={articles} showViewAll={isPreview} />
      </div>
    </section>
  );
};

export default Articles;
