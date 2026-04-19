import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

const Blog = ({ variant = "default" }: { variant?: "blogs" | "default" }) => {
  const latest = blogData.slice(0, 4);
  const blogs = variant === "default" ? latest : blogData;
  if (latest.length === 0) {
    return null;
  }

  return (
    <section
      id="blog"
      className={variant === "default" ? "py-16 md:py-20 lg:py-28" : "py-2"}
    >
      <div className="container">
        {variant === "default" && (
          <SectionTitle
            title="Check out our posts"
            paragraph="Technical write-ups, product case studies, and lessons from building AI-powered software for real businesses."
            center
          />
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
          {blogs.map((blog) => (
            <SingleBlog key={blog.id} blog={blog} />
          ))}
        </div>

        {variant === "default" && (
          <div className="mt-14 flex justify-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-xl bg-primaryColor px-8 py-4 text-base font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow active:translate-y-0"
            >
              Read all posts
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
