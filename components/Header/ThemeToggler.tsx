//@ts-nocheck
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (theme == "dark") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [theme]);
  return (
    <button
      onClick={() => {
        if (theme == "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full md:h-14 md:w-14"
    >
      <div className="flex cursor-pointer items-center">
        <div className="relative">
          <div
            className={`h-5 w-14 rounded-full ${isDark ? "bg-dark" : "bg-[#f4f4f5]"
              } shadow-inner`}
          ></div>
          <div
            className={`${isDark ? "" : "translate-x-full"
              } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full ${isDark ? "bg-white" : "bg-dark"
              } transition`}
          >
            {isDark ? (
              <AiOutlineMoon size={25} className="text-dark" />
            ) : (
              <AiOutlineSun size={25} className="text-white" />
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggler;
