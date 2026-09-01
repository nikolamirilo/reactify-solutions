"use client";

import Image from "@/components/Common/Image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuSend } from "react-icons/lu";
import menuData from "./menuData";
import Hamburger from "./Hamburger";

const HOME_ONLY_PATHS = ["#services", "#about", "#testimonials"];
const STICKY_OFFSET = 80;

type MenuItem = (typeof menuData)[number];

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

const Header = () => {
  const path = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= STICKY_OFFSET);

    handleScroll(); // sync state on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setNavbarOpen(false);
  }, [path]);

  const isVisible = (item: MenuItem) => {
    if (path === "/" && item.path === "/") return false; // hide Home on home page
    if (path !== "/" && HOME_ONLY_PATHS.includes(item.path)) return false; // hide section links off-home
    return true;
  };

  const resolveHref = (item: MenuItem) =>
    item.path.startsWith("#") && path !== "/" ? `/${item.path}` : item.path;

  return (
    <header
      className={cx(
        "header top-0 left-0 z-40 flex w-full items-center bg-transparent",
        sticky
          ? "!fixed !z-[9999] !bg-dark/80 backdrop-blur-md !transition shadow-[0_8px_24px_-12px_rgba(0,0,0,0.7)] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-darkBorder after:to-transparent after:content-['']"
          : "absolute",
        navbarOpen && "!bg-dark/90 backdrop-blur-md"
      )}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={cx(
                "header-logo border-none ring-none block w-full",
                sticky ? "py-5 lg:py-2" : "py-8"
              )}
            >
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={150}
                height={100}
              />
            </Link>
          </div>

          <div className="flex w-full items-center justify-end px-4">
            <Hamburger navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} cx={cx} />

            <nav
              id="navbarCollapse"
              className={cx(
                "navbar absolute right-0 z-30 w-full py-2 px-6 duration-300",
                "lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:!shadow-none lg:!backdrop-blur-none lg:p-0 lg:opacity-100",
                "backdrop-blur-md shadow-lg bg-dark border border-darkBorder lg:border-none rounded-xl lg:rounded-none",
                navbarOpen
                  ? "visibility top-full opacity-100"
                  : "invisible top-[90%] opacity-0"
              )}
            >
              <ul className="flex flex-col items-end lg:flex-row lg:items-center lg:space-x-12">
                {menuData.filter(isVisible).map((menuItem) => {
                  const href = resolveHref(menuItem);
                  const isActive = path === href;

                  return (
                    <li key={menuItem.id} className="group relative">
                      <Link
                        href={href}
                        className={cx(
                          "flex justify-end py-2 text-base font-medium transition-all duration-200 lg:mr-0 lg:inline-flex",
                          menuItem.highlighted
                            ? "group inline-flex items-center gap-2 rounded-xl bg-primaryColor px-6 py-2 font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 hover:bg-primaryDark hover:shadow-glow"
                            : cx(
                              "px-4 lg:px-1 lg:py-6",
                              isActive
                                ? "text-primaryColor"
                                : "text-textSecondary hover:text-white"
                            ),
                        )}
                      >
                        {menuItem.highlighted && (
                          <LuSend className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        )}
                        {menuItem.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;