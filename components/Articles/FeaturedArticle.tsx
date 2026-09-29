import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import Image from "@/components/Common/Image";
import { Article } from "@/types";
import { formatArticleDate, primaryTag } from "./articleMeta";

const FeaturedArticle = ({ article }: { article: Article }) => {
  const { slug, title, image, excerpt, author, publishDate, readingTime } =
    article;

  return (
    <Link
      href={`/articles/${slug}`}
      className="group grid overflow-hidden rounded-2xl border border-darkBorder bg-darkSurface/60 transition-colors duration-300 hover:border-primaryColor/30 hover:bg-darkSurface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryColor/60 lg:grid-cols-12"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-darkBorder bg-darkElevated lg:col-span-7 lg:aspect-auto lg:min-h-[400px] lg:border-b-0 lg:border-r">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="(min-width: 992px) 58vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
        <div className="flex flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.13em]">
            <span className="inline-flex items-center gap-2 rounded-full border border-primaryColor/25 bg-primaryColor/10 px-2.5 py-1 text-primaryColor">
              <span className="h-1.5 w-1.5 rounded-full bg-primaryColor shadow-[0_0_8px_rgba(0,212,200,0.8)]" />
              Latest
            </span>
            <span className="text-textSecondary">{primaryTag(article)}</span>
          </div>

          <h2 className="mt-5 font-display text-2xl font-semibold leading-tight text-white transition-colors group-hover:text-primaryColor sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 line-clamp-4 text-base leading-relaxed text-textSecondary">
            {excerpt}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primaryColor">
            Read article
            <LuArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>

        <div className="mt-8 flex items-center gap-3 border-t border-darkBorder pt-6">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-darkBorder bg-darkElevated">
            <Image src={author.image} alt="" fill sizes="36px" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {author.name}
            </p>
            <p className="truncate text-xs text-textFaint">
              {author.designation}
            </p>
          </div>
          <div className="shrink-0 text-right text-xs text-textFaint">
            <time dateTime={publishDate} className="block">
              {formatArticleDate(publishDate)}
            </time>
            {readingTime && <span className="block">{readingTime}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticle;
