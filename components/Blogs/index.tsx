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
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primaryColor to-[#158C7E] px-8 py-4 text-base font-semibold text-white shadow-[0_4px_20px_0px_rgba(27,153,139,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_0px_rgba(27,153,139,0.5)] active:scale-95"
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
