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
          ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-black dark:!bg-opacity-80"
          : "absolute"
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
                  width={160}
                  height={40}
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-end px-4">
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="ring-primaryColor absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] focus:ring-2 lg:hidden"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? "opacity-0 " : " "
                    }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                />
              </button>
              <nav
                id="navbarCollapse"
                className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-textColor/50 bg-white py-4 px-6 duration-300 dark:border-textColor/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${navbarOpen
                  ? "visibility top-full opacity-100"
                  : "invisible top-[120%] opacity-0"
                  }`}
              >
                <ul className="block lg:flex lg:space-x-12">
                  {menuData
                    .filter((menuItem) => !menuItem.path.includes("#"))
                    .map((menuItem, index) => (
                      <li key={menuItem.id} className="group relative">
                        <Link
                          href={menuItem.path}
                          className={`hover:!text-primaryColor flex py-2 text-base text-dark transition-all ease-in dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 lg:hover:scale-110`}
                        >
                          {menuItem.title}
                        </Link>
                      </li>
                    ))}
                  {path == "/" &&
                    menuData
                      .filter((menuItem) => menuItem.path.includes("#"))
                      .map((menuItem, index) => (
                        <li key={menuItem.id} className="group relative">
                          <Link
                            href={menuItem.path}
                            className={`hover:!text-primaryColor flex py-2 text-base text-dark transition-all ease-in dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 lg:hover:scale-110`}
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                      ))}
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
