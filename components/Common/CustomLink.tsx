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
      className="ease-in-up flex w-fit min-w-[6rem] flex-row items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primaryColor to-[#158C7E] py-3 px-6 text-base font-bold text-white transition-all duration-300 hover:shadow-[0_10px_30px_0px_rgba(27,153,139,0.5)] hover:bg-opacity-80 hover:scale-105 active:scale-95 shadow-[0_4px_20px_0px_rgba(27,153,139,0.3)]"
    >
      {icon ? icon : null} {title}
    </Link>
  );
};

export default CustomLink;
