"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaUser, FaSignInAlt, FaUserPlus, FaTimes, FaHistory, FaComments } from "react-icons/fa";
import Login from "../auth/Login";
import Profile from "../auth/Profile";
import Register from "../auth/Register";
import ForgetPassword from "../auth/ForgetPassword";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalContent(null), 500);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    setIsLoggedIn(!!userId);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 20 || lastScrollY - currentScrollY > 10) setIsVisible(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 100) setIsVisible(false);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        id="header"
        className={`fixed top-0 left-0 w-full z-10 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } bg-gray-800 shadow-lg`}
      >
        <div className="flex justify-between items-center p-5 bg-gray-800 shadow-lg">
          <Link href="/" passHref legacyBehavior>
            <a className="flex items-center cursor-pointer">
              <Image
                src="/images/property-logo.png"
                alt="Property Logo"
                className="h-8 w-auto rounded-2xl"
                width={50}
                height={50}
              />
              <h1 className="ml-4 text-2xl font-bold text-white">Luxury Properties</h1>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/list_property" passHref>
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-md transition">
                List Property
              </button>
            </Link>

            {/* Conditional Links Based on Login Status */}
            {isLoggedIn ? (
              <>
                <button onClick={() => openModal(<Profile />)} className="text-gray-400 hover:text-white transition">
                  <FaUser className="text-xl mr-2" /> Profile
                </button>
                <button onClick={() => openModal(<div>History Content</div>)} className="text-gray-400 hover:text-white transition">
                  <FaHistory className="text-xl mr-2" /> History
                </button>
                <button onClick={() => openModal(<div>Chat Content</div>)} className="text-gray-400 hover:text-white transition">
                  <FaComments className="text-xl mr-2" /> Chat
                </button>
              </>
            ) : (
              <>
                <button onClick={() => openModal(<Login openForgetPassword={() => openModal(<ForgetPassword />)} />)} className="text-gray-400 hover:text-white transition">
                  <FaSignInAlt className="mr-2" /> Log In
                </button>
                <button onClick={() => openModal(<Register />)} className="text-gray-400 hover:text-white transition">
                  <FaUserPlus className="mr-2" /> Sign Up
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={toggleMenu}>
            <span className="text-white text-3xl">&#9776;</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full bg-gray-900 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } shadow-lg w-3/4 max-w-sm p-6 space-y-6`}
          style={{ zIndex: 20 }}
        >
          <button className="text-white text-3xl mb-4" onClick={toggleMenu}>
            &#x2715;
          </button>

          <div className="bg-gray-800 p-4 rounded-lg space-y-4 text-lg">
            <Link href="/list_property" passHref>
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-md transition w-full">
                List Property
              </button>
            </Link>

            {isLoggedIn ? (
              <>
                <button onClick={() => openModal(<Profile />)} className="flex items-center text-gray-300 hover:text-white transition">
                  <FaUser className="mr-3" /> Profile
                </button>
                <button onClick={() => openModal(<div>History Content</div>)} className="flex items-center text-gray-300 hover:text-white transition">
                  <FaHistory className="mr-3" /> History
                </button>
                <button onClick={() => openModal(<div>Chat Content</div>)} className="flex items-center text-gray-300 hover:text-white transition">
                  <FaComments className="mr-3" /> Chat
                </button>
              </>
            ) : (
              <>
                <button onClick={() => openModal(<Login openForgetPassword={() => openModal(<ForgetPassword />)} />)} className="flex items-center text-gray-300 hover:text-white transition">
                  <FaSignInAlt className="mr-3" /> Log In
                </button>
                <button onClick={() => openModal(<Register />)} className="flex items-center text-gray-300 hover:text-white transition">
                  <FaUserPlus className="mr-3" /> Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Modal with smooth transition */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black transition-all duration-1000 transform bg-opacity-50 z-50">
          <div
            className={`bg-gray-100 rounded-lg p-6 w-80 relative ${
              isModalOpen ? "scale-100" : "scale-0"
            }`}
          >
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
              <FaTimes />
            </button>
            {modalContent}
          </div>
        </div>
      )}
    </>
  );
}
