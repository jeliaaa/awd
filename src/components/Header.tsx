import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import MenuIcon from "../assets/icons/bars-solid.svg?react";
import CloseIcon from "../assets/icons/xmark.svg?react";
import LanguageDropdown from "./LanguageDropdown";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={clsx("w-full bg-background backdrop-blur-md z-50 shadow-sm h-[10dvh]",
      menuOpen && "fixed top-0 left-0"
    )}>
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="title font-bold text-primary text-lg">
          <Link to="/">Logo</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center plain-text">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="hover:text-primary transition"
            >
              {item.label}
            </Link>
          ))}
          <LanguageDropdown />
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen((prev) => !prev)} className="md:hidden cursor-pointer">
          {menuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
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
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
