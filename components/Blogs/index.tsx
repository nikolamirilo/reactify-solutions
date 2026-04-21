"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 2xl:grid-cols-4"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <SingleBlog blog={blog} />
            </motion.div>
          ))}
        </motion.div>

        {variant === "default" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-14 flex justify-center"
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-xl bg-primaryColor px-8 py-4 text-base font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow active:translate-y-0"
            >
              Read all posts
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
