import { Dispatch, SetStateAction } from "react";

type ClassValue = string | boolean | undefined | null;

const Hamburger = ({ setNavbarOpen, navbarOpen, cx }: {
  setNavbarOpen: Dispatch<SetStateAction<boolean>>;
  navbarOpen: boolean;
  cx: (...classes: ClassValue[]) => string;
}) => {
  return (
    <button
      onClick={() => setNavbarOpen((open) => !open)}
      id="navbarToggler"
      aria-label="Mobile Menu"
      aria-expanded={navbarOpen}
      className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] lg:hidden"
    >
      <span
        className={cx(
          "relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300",
          navbarOpen && "top-[7px] rotate-45"
        )}
      />
      <span
        className={cx(
          "relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300",
          navbarOpen && "opacity-0"
        )}
      />
      <span
        className={cx(
          "relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300",
          navbarOpen && "top-[-8px] -rotate-45"
        )}
      />
    </button>
  );
};

export default Hamburger;