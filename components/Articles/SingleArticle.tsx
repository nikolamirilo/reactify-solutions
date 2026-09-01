import { Article } from "@/types";
import Image from "@/components/Common/Image";
import Link from "next/link";

const SingleArticle = ({ article }: { article: Article }) => {
  const {
    slug,
    title,
    image,
    excerpt,
    author,
    tags,
    publishDate,
    readingTime,
  } = article;
  const href = `/articles/${slug}`;
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-lg bg-white/5">
      <Link href={href} className="relative block h-[180px] w-full shrink-0">
        <Image src={image} alt={title} fill className="object-cover" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3>
          <Link
            href={href}
            className="mb-3 block text-base font-bold leading-snug text-white hover:text-primaryColor sm:text-lg"
          >
            {title}
          </Link>
        </h3>
        <p className="mb-4 flex-1 border-b border-white/10 pb-4 text-sm font-medium leading-relaxed text-textColor">
          {excerpt}
        </p>
        <div className="flex items-center">
          <div className="mr-4 flex items-center border-r border-white/10 pr-4">
            <div className="mr-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image src={author.image} alt={author.name} fill />
              </div>
            </div>
            <div className="w-full">
              <h4 className="mb-0.5 text-xs font-medium text-white">
                {author.name}
              </h4>
              <p className="text-[11px] text-textColor">{author.designation}</p>
            </div>
          </div>
          <div className="inline-block">
            <p className="text-xs text-textColor">
              {readingTime ?? publishDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
