"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SingleArticle from "./SingleArticle";
import { Article } from "@/types";

const ArticlesGrid = ({
  articles,
  showViewAll = false,
}: {
  articles: Article[];
  showViewAll?: boolean;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 2xl:grid-cols-4">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            className="h-full"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: Math.min(index, 3) * 0.1,
            }}
          >
            <SingleArticle article={article} />
          </motion.div>
        ))}
      </div>

      {showViewAll && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-xl bg-primaryColor px-8 py-4 text-base font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow active:translate-y-0"
          >
            Read all posts
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default ArticlesGrid;
