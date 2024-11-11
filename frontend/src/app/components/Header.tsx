"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaUser, FaSignInAlt, FaUserPlus, FaHistory, FaHome, FaComments } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 20 || lastScrollY - currentScrollY > 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 w-full z-10 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"} bg-gray-800 shadow-lg`}
    >
      <div className="flex justify-between items-center p-5 bg-gray-800 shadow-lg">
        <Link href="/" passHref>
          <div className="flex items-center cursor-pointer">
            <Image
              src="/images/property-logo.png"
              alt="Property Logo"
              className="h-8 w-auto rounded-2xl"
              width={50}
              height={50}
            />
            <h1 className="ml-4 text-2xl font-bold text-white">
              Luxury Properties
            </h1>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-400 hover:text-white transition">
            Find or List Your Dream Property
          </a>
          <Link href="/list_property" passHref>
            <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-md transition">
              List Property
            </button>
          </Link>

          {/* Profile Button */}
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center text-gray-400 hover:text-white transition"
            >
              <FaUser className="text-xl" />
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg space-y-2 p-4 text-lg">
                <Link href="/profile" className="flex items-center text-gray-300 hover:text-white transition">
                  <FaUser className="mr-3" /> Profile
                </Link>
                <Link href="/history" className="flex items-center text-gray-300 hover:text-white transition">
                  <FaHistory className="mr-3" /> History
                </Link>
                <Link href="/chat" className="flex items-center text-gray-300 hover:text-white transition">
                  <FaComments className="mr-3" /> Chat
                </Link>
                <Link href="/login" className="flex items-center text-gray-300 hover:text-white transition">
                  <FaSignInAlt className="mr-3" /> Log In
                </Link>
                <Link href="/signup" className="flex items-center text-gray-300 hover:text-white transition">
                  <FaUserPlus className="mr-3" /> Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>

        <button className="md:hidden" onClick={toggleMenu}>
          <span className="text-white text-3xl">&#9776;</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full bg-gray-900 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"} shadow-lg w-3/4 max-w-sm p-6 space-y-6`}
        style={{ zIndex: 20 }}
      >
        <button className="text-white text-3xl mb-4" onClick={toggleMenu}>
          &#x2715;
        </button>
        <div className="bg-gray-800 p-4 rounded-lg space-y-4 text-lg">
          <Link href="/login" className="flex items-center text-gray-300 hover:text-white transition">
            <FaSignInAlt className="mr-3" /> Log In
          </Link>
          <Link href="/signup" className="flex items-center text-gray-300 hover:text-white transition">
            <FaUserPlus className="mr-3" /> Sign Up
          </Link>
          <Link href="/profile" className="flex items-center text-gray-300 hover:text-white transition">
            <FaUser className="mr-3" /> Profile
          </Link>
          <Link href="/list_property" className="flex items-center text-gray-300 hover:text-white transition">
            <FaHome className="mr-3" /> List Property
          </Link>
          <Link href="/history" className="flex items-center text-gray-300 hover:text-white transition">
            <FaHistory className="mr-3" /> History
          </Link>
          <Link href="/chat" className="flex items-center text-gray-300 hover:text-white transition">
            <FaComments className="mr-3" /> Chat
          </Link>
        </div>
      </div>
    </header>
  );
}
