import { Blog } from "@/types";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const {
    slug,
    title,
    image,
    excerpt,
    author,
    tags,
    publishDate,
    readingTime,
  } = blog;
  const href = `/blogs/${slug}`;
  return (
    <div
      className="wow fadeInUp relative overflow-hidden rounded-lg bg-white/5"
      data-wow-delay=".1s"
    >
      <Link href={href} className="relative block h-[180px] w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </Link>
      <div className="p-5">
        <h3>
          <Link
            href={href}
            className="mb-3 block text-base font-bold leading-snug text-black hover:text-primaryColor dark:text-white dark:hover:text-primaryColor sm:text-lg"
          >
            {title}
          </Link>
        </h3>
        <p className="mb-4 border-b border-textColor border-opacity-10 pb-4 text-sm font-medium leading-relaxed text-textColor dark:border-white dark:border-opacity-10">
          {excerpt}
        </p>
        <div className="flex items-center">
          <div className="mr-4 flex items-center border-r border-textColor border-opacity-10 pr-4 dark:border-white dark:border-opacity-10">
            <div className="mr-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image src={author.image} alt={author.name} fill />
              </div>
            </div>
            <div className="w-full">
              <h4 className="mb-0.5 text-xs font-medium text-dark dark:text-white">
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

export default SingleBlog;
