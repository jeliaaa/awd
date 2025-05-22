import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import MenuIcon from "../assets/icons/bars-solid.svg?react";
import CloseIcon from "../assets/icons/xmark.svg?react";
import LanguageDropdown from "./LanguageDropdown";

const navItems = [
  { label: "მთავარი", path: "/" },
  { label: "ჩვენს შესახებ", path: "/about" },
  { label: "ბლოგი", path: "/contact" },
  { label: "რესურსები", path: "/contact" },
  { label: "კონტაქტი", path: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <div className="w-full z-50 bg-background sticky top-0 backdrop-blur-md shadow-sm">
      {/* Top Section: Logo + Language Switcher */}
      <div className={`w-full p-10 flex items-center justify-between ${isScrolled ? "hidden" : "block"}`}>
        <div className="title font-bold text-primary text-lg">
          <Link to="/">Logo</Link>
        </div>
        <LanguageDropdown />
      </div>


      {/* Desktop Navigation */}
      <header
        className={clsx(
          "hidden md:flex w-full py-5 px-10 justify-between space-x-6 items-center plain-text transition-all duration-300",
          isScrolled
            ? "sticky top-0 left-0 z-50 bg-primary text-white shadow-md"
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
