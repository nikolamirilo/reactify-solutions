"use client";

import { useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { Article } from "@/types";
import ArticleCard from "./ArticleCard";
import FeaturedArticle from "./FeaturedArticle";
import { ARTICLE_TOPICS, articleHasTopic } from "./articleMeta";

const ALL_TOPICS = "all";
const PAGE_SIZE = 9;

const chipClass = (active: boolean) =>
  `inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryColor/60 ${
    active
      ? "border-primaryColor/40 bg-primaryColor/10 text-primaryColor"
      : "border-darkBorder bg-darkSurface/60 text-textSecondary hover:border-darkBorderStrong hover:text-white"
  }`;

const ArticlesExplorer = ({ articles }: { articles: Article[] }) => {
  const [topicId, setTopicId] = useState(ALL_TOPICS);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const topics = ARTICLE_TOPICS.map((topic) => ({
    ...topic,
    count: articles.filter((article) => articleHasTopic(article, topic)).length,
  })).filter((topic) => topic.count > 0);

  const activeTopic = topics.find((topic) => topic.id === topicId);
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const isSearching = terms.length > 0;

  const results = articles.filter((article) => {
    if (activeTopic && !articleHasTopic(article, activeTopic)) {
      return false;
    }
    const haystack = [article.title, article.excerpt, ...article.tags]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });

  // The newest match leads as a large card, except while searching, where a
  // uniform list of hits is easier to scan than one promoted result.
  const featured = isSearching ? undefined : results[0];
  const rest = featured ? results.slice(1) : results;
  const shownCount = (featured ? 1 : 0) + Math.min(visibleCount, rest.length);

  const selectTopic = (id: string) => {
    setTopicId(id);
    setVisibleCount(PAGE_SIZE);
  };

  const updateQuery = (value: string) => {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  };

  const clearFilters = () => {
    selectTopic(ALL_TOPICS);
    setQuery("");
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-darkBorder pb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div
          role="group"
          aria-label="Filter articles by topic"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <button
            type="button"
            aria-pressed={!activeTopic}
            onClick={() => selectTopic(ALL_TOPICS)}
            className={chipClass(!activeTopic)}
          >
            All
            <span className="font-mono text-[11px] opacity-70">
              {articles.length}
            </span>
          </button>
          {topics.map((topic) => {
            const active = topic.id === activeTopic?.id;
            return (
              <button
                key={topic.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectTopic(topic.id)}
                className={chipClass(active)}
              >
                {topic.label}
                <span className="font-mono text-[11px] opacity-70">
                  {topic.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full shrink-0 lg:w-[300px]">
          <LuSearch
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-textFaint"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Search articles"
            aria-label="Search articles"
            className="h-11 w-full rounded-xl border border-darkBorder bg-darkSurface/60 pl-10 pr-10 text-sm text-white outline-none transition-colors placeholder:text-textFaint focus:border-primaryColor/50 focus:ring-2 focus:ring-primaryColor/20 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => updateQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-textFaint transition-colors hover:bg-darkElevated hover:text-white"
            >
              <LuX aria-hidden className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <p
        aria-live="polite"
        className="mt-6 font-mono text-[11px] uppercase tracking-[0.13em] text-textFaint"
      >
        {results.length} {results.length === 1 ? "article" : "articles"}
        {activeTopic && ` in ${activeTopic.label}`}
        {isSearching && ` matching “${query.trim()}”`}
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-darkBorderStrong px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold text-white">
            No articles found
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-textColor">
            Nothing matches your search
            {activeTopic && ` in ${activeTopic.label}`}. Try a different term or
            browse all topics.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex h-10 items-center rounded-xl border border-darkBorderStrong bg-darkSurface px-5 text-sm font-semibold text-white transition-colors hover:border-primaryColor/40 hover:text-primaryColor"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {featured && (
            <div className="mt-6">
              <FeaturedArticle article={featured} />
            </div>
          )}

          {rest.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article, index) => (
                // Articles past the current page stay in the markup, just
                // hidden, so every post is still linked from the server HTML.
                <li
                  key={article.id}
                  className={index >= visibleCount ? "hidden" : undefined}
                >
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          )}

          {shownCount < results.length && (
            <div className="mt-12 flex flex-col items-center gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.13em] text-textFaint">
                Showing {shownCount} of {results.length}
              </p>
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="inline-flex h-11 items-center rounded-xl border border-darkBorderStrong bg-darkSurface px-6 text-sm font-semibold text-white transition-colors hover:border-primaryColor/40 hover:text-primaryColor focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryColor/60"
              >
                Load more articles
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ArticlesExplorer;
