import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import MenuIcon from "../assets/icons/bars-solid.svg?react";
import CloseIcon from "../assets/icons/xmark.svg?react";
import LanguageDropdown from "./LanguageDropdown";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "../assets/awd_logo.png"
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { navItems } from "../routes/routes";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { t } = useTranslation();

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
          <Link to="/">
            <img className="h-[30px]" src={Logo} />
          </Link>
        </div>
        <Link className="bg-gray-200 md:block hidden title text-primary rounded-2xl p-3" to={`https://adaptive.aowd.ge/${i18n.language}`}>ადაპტირებული ვებ-გვერდი</Link>
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
            className="hover:underline transition text-center"
          >
            {t(item.label)}
          </Link>
        ))}
      </header>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex py-4 justify-between pb-5 px-5">
        <Link className="bg-gray-200 md:hidden title text-primary rounded-2xl p-3 text-center" to={`https://adaptive.aowd.ge/${i18n.language}`}>ადაპტირებული ვებ-გვერდი</Link>
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
          menuOpen ? "max-h-70 opacity-100 px-4 pb-4" : "max-h-0 opacity-0 px-4"
        )}
      >
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={handleLinkClick}
              className="transition text-primary title"
            >
              {t(item.label)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
