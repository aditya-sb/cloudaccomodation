// src/app/components/Header.tsx
"use client"; // Mark as client-side component

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if we're scrolling down or up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY < 20) {
        // Scrolling up or near the top
        setIsVisible(true);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
    id="header"
      className={`fixed top-0 left-0 w-full z-10 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-gray-800 shadow-lg`}
    >
      <div className="flex justify-between items-center p-5 bg-gray-800 shadow-lg">
        <Link href="/" passHref>
        <div className="flex items-center">
        <Image
            src="/images/property-logo.png"
            alt="Property Logo"
            className="h-8 w-auto"
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
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          <span className="text-white text-3xl">&#9776;</span>
        </button>
      </div>
    </header>
  );
}
