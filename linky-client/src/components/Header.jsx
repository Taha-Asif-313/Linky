import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiHome, FiUser, FiZap, FiDollarSign } from "react-icons/fi"; // Import icons for navigation
import { FaArrowRight } from "react-icons/fa";

const Header = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/", icon: <FiHome className="text-lg" /> },
    { name: "Features", path: "/features", icon: <FiZap className="text-lg" /> },
    { name: "Pricing", path: "/pricing", icon: <FiDollarSign className="text-lg" /> },
    { name: "About", path: "/about", icon: <FiUser className="text-lg" /> },
  ];

  return (
    <nav className="w-full z-30 bg-white text-black fixed top-0 left-0 shadow-sm border-b">
      <div className="grid grid-cols-2 lg:grid-cols-3 px-6 py-2 lg:px-10 max-w-7xl mx-auto">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-1 font-bold text-primary">
          <img className="w-10" src="/logo.png" alt="Logo" />
          <span className="text-lg max-sm:hidden">Linky</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center gap-2 text-sm font-medium text-black hover:text-primary transition"
            >
              {link.icon} {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Action Button */}
        <div className="hidden md:flex items-center justify-end">
          <Link
            to={isLogin ? "/chat" : "/signup"}
            className="text-sm flex items-center gap-2 font-medium rounded px-5 py-1.5 border border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition duration-300"
          >
            {isLogin ? "Go to Chat" : "Let’s Chat"}
            <FaArrowRight/>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center justify-end">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-3xl text-primary"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 py-4 bg-white flex flex-col space-y-4 border-t border-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-black hover:text-primary transition"
            >
              {link.icon} {link.name}
            </Link>
          ))}
          <Link
            to={isLogin ? "/chat" : "/signup"}
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium rounded px-5 py-2 border border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition duration-300 w-fit"
          >
            {isLogin ? "Go to Chat" : "Let’s Chat"}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
