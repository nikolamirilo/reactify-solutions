import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";
import ArticleCard from "./ArticleCard";
import ArticlesExplorer from "./ArticlesExplorer";
import { allPostsMeta } from "@/content/articles";

// Server Component on purpose. The post registry in `@/content/articles` holds a
// reference to every article body, so importing it from a client component pulled
// all of them (plus Prism) into the browser bundle for a listing that only needs
// titles and excerpts. Rendering here keeps the bodies on the server and sends
// just the metadata across to the small client explorer.
const Articles = ({
  variant = "default",
}: {
  variant?: "articles" | "default";
}) => {
  if (allPostsMeta.length === 0) {
    return null;
  }

  if (variant === "articles") {
    return (
      <section id="articles" className="pb-24 pt-8 lg:pt-10">
        <div className="container">
          <ArticlesExplorer articles={allPostsMeta} />
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Check out our posts"
          paragraph="Technical write-ups, product case studies, and practical lessons from building AI-powered software, digital catalogs, and automation tooling."
          center
        />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allPostsMeta.slice(0, 3).map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
        <div className="mt-14 flex justify-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-xl bg-primaryColor px-8 py-4 text-base font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow active:translate-y-0"
          >
            Read all posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Articles;
