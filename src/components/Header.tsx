import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import MenuIcon from "../assets/icons/bars-solid.svg?react";
import CloseIcon from "../assets/icons/xmark.svg?react";
import LanguageDropdown from "./LanguageDropdown";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const navItems = [
  { label: "მთავარი", path: "/" },
  { label: "ჩვენს შესახებ", path: "/about" },
  { label: "ბლოგი", path: "/blog" },
  { label: "რესურსები", path: "/contact" },
  { label: "კონტაქტი", path: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <div className="w-full z-50 bg-background sticky top-0 backdrop-blur-md shadow-sm">
      <motion.div
        animate={{ 
          position: isScrolled ? "fixed" : "relative",
          y: isScrolled ? "-100%" : 0
        }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="w-full p-10 flex z-50 items-center justify-between bg-background"
      >
        <div className="title font-bold text-primary text-lg">
          <Link to="/">Logo</Link>
        </div>
        <LanguageDropdown />
      </motion.div>


      {/* Desktop Navigation */}
      <header
        className={clsx(
          "hidden md:flex w-full py-5 px-10 justify-between space-x-6 items-center plain-text transition-all duration-300",
          isScrolled
            ? "sticky top-0 left-0 z-40 bg-primary text-white shadow-md"
            : "bg-primary text-white"
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="hover:underline transition"
          >
            {item.label}
          </Link>
        ))}
      </header>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-end px-5">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="cursor-pointer my-2"
        >
          {menuOpen ? (
            <CloseIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={clsx(
          "md:hidden overflow-hidden transition-all bg-background duration-300 ease-in-out",
          menuOpen ? "max-h-60 opacity-100 px-4 pb-4" : "max-h-0 opacity-0 px-4"
        )}
      >
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={handleLinkClick}
              className="transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
