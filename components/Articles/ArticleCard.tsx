import Link from "next/link";
import { LuArrowUpRight, LuClock } from "react-icons/lu";
import Image from "@/components/Common/Image";
import { Article } from "@/types";
import { formatArticleDate, primaryTag } from "./articleMeta";

const ArticleCard = ({ article }: { article: Article }) => {
  const { slug, title, image, excerpt, publishDate, readingTime } = article;

  return (
    <Link
      href={`/articles/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-darkBorder bg-darkSurface/60 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-primaryColor/30 hover:bg-darkSurface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryColor/60"
    >
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-darkBorder bg-darkElevated">
        {/* The title right below already names the link, so the image is decorative. */}
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 992px) 33vw, (min-width: 575px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.13em]">
          <span className="truncate text-primaryColor">
            {primaryTag(article)}
          </span>
          <span aria-hidden className="text-textDim">
            /
          </span>
          <time dateTime={publishDate} className="shrink-0 text-textFaint">
            {formatArticleDate(publishDate)}
          </time>
        </div>

        <h3 className="font-display text-lg font-semibold leading-snug text-white transition-colors group-hover:text-primaryColor">
          {title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-textColor">
          {excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 text-xs">
          {readingTime ? (
            <span className="inline-flex items-center gap-1.5 text-textFaint">
              <LuClock aria-hidden className="h-3.5 w-3.5" />
              {readingTime}
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1 font-medium text-textSecondary transition-colors group-hover:text-primaryColor">
            Read article
            <LuArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
