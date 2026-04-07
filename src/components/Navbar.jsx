import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineShoppingBag,
  HiOutlineSearch,
  HiOutlineMenu,
  HiX,
} from "react-icons/hi";
import { useCart } from "../Context/CartContext";

export default function Navbar({ onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleLink = (e, link) => {
    e.preventDefault();
    setMenuOpen(false);
    if (link === "Home") navigate("/");
    if (link === "Collections") scrollToSection("collections");
    if (link === "Shop") navigate("/shop");
    if (link === "About") scrollToSection("about");
    if (link === "Contact") navigate("/contact");
  };

  const links = ["Home", "Collections", "Shop", "About", "Contact"];

  return (
    <header className="w-full bg-white border-b border-[#e8e8e2] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="font-serif text-xl tracking-[4px] text-[#2C5F2E] cursor-pointer"
          onClick={() => navigate("/")}
        >
          NOOR <span className="text-[#C9A84C]">STORE</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => handleLink(e, link)}
              className="text-[11px] tracking-[2px] uppercase text-[#555] hover:text-[#2C5F2E] transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <HiOutlineSearch className="text-xl text-[#1A1A1A] cursor-pointer hover:text-[#2C5F2E] transition-colors duration-300" />
          <div className="relative cursor-pointer" onClick={onCartClick}>
            <HiOutlineShoppingBag className="text-xl text-[#1A1A1A] hover:text-[#2C5F2E] transition-colors duration-300" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C9A84C] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            className="md:hidden text-xl text-[#1A1A1A] cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#e8e8e2] px-6 py-4 flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => handleLink(e, link)}
              className="text-[11px] tracking-[2px] uppercase text-[#555] hover:text-[#2C5F2E] transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}