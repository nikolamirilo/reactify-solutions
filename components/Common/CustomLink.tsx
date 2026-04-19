import Link from "next/link";
import React from "react";

const CustomLink = ({
  href,
  title,
  style,
  icon,
}: {
  href: string;
  title: string;
  style?: object;
  icon?: any;
}) => {
  return (
    <Link
      href={href}
      style={style}
      className="ease-in-up flex w-fit min-w-[6rem] flex-row items-center justify-center gap-2 rounded-xl bg-primaryColor py-3 px-6 text-base font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow active:translate-y-0"
    >
      {icon ? icon : null} {title}
    </Link>
  );
};

export default CustomLink;
