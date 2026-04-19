"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import menuData from "./menuData";
import { usePathname } from "next/navigation";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const path = usePathname();

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${sticky
          ? "!fixed !z-[9999] !bg-dark/80 backdrop-blur-md !transition shadow-[0_8px_24px_-12px_rgba(0,0,0,0.7)] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-darkBorder after:to-transparent after:content-['']"
          : "absolute"
          } ${navbarOpen
            ? "!bg-dark/90 backdrop-blur-md"
            : ""
          }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo border-none ring-none block w-full ${sticky ? "py-5 lg:py-2" : "py-8"
                  } `}
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
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] lg:hidden"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 ${navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 ${navbarOpen ? "opacity-0 " : " "
                    }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                />
              </button>
              <nav
                id="navbarCollapse"
                className={`navbar absolute right-0 z-30 w-full py-2 px-6 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:!shadow-none lg:!backdrop-blur-none lg:p-0 lg:opacity-100 ${navbarOpen
                  ? "visibility top-full opacity-100"
                  : "invisible top-[90%] opacity-0"
                  } backdrop-blur-md shadow-lg bg-dark border border-darkBorder lg:border-none rounded-xl lg:rounded-none`}
              >
                <ul className="flex flex-col items-end lg:flex-row lg:space-x-12">
                  {menuData.map((menuItem, index) => {
                    // Hide "Home" link if we are already on the home page
                    if (path === "/" && menuItem.path === "/") {
                      return null;
                    }

                    // Hide Services, About, Testimonials when not on the home page
                    const homeOnlyPaths = ["#services", "#about", "#testimonials"];
                    if (path !== "/" && homeOnlyPaths.includes(menuItem.path)) {
                      return null;
                    }

                    // Handle hash links from other pages
                    let href = menuItem.path;
                    if (menuItem.path.startsWith("#") && path !== "/") {
                      href = "/" + menuItem.path;
                    }

                    return (
                      <li key={menuItem.id} className="group relative">
                        <Link
                          href={href}
                          onClick={() => setNavbarOpen(false)} // Close navbar on click
                          className={`flex py-2 text-base text-textSecondary transition-colors hover:text-white lg:mr-0 lg:inline-flex lg:py-6 rounded-md px-4 lg:px-0 justify-end ${
                            path === href
                              ? "!text-primaryColor"
                              : ""
                          }`}
                        >
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
    </>
  );
};

export default Header;
