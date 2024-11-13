// components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaTimes,
  FaHistory,
  FaComments,
  FaArrowRight,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import Login from "../auth/Login";
import Profile from "../auth/Profile";
import Register from "../auth/Register";
import ForgetPassword from "../auth/ForgetPassword";
import { useTheme } from "../ThemeContext";

export default function Header() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const openModal = (content: React.ReactNode, isProfile = false) => {
    if (isProfile) {
      setIsProfileSidebarOpen(true);
    } else {
      setModalContent(content);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalContent(null), 500);
  };

  const closeProfileSidebar = () => {
    setIsProfileSidebarOpen(false);
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
        } shadow-lg`}
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <div className="flex justify-between items-center p-5">
          <Link href="/" passHref legacyBehavior>
            <a className="flex items-center cursor-pointer">
              <Image
                src="/images/property-logo.png"
                alt="Property Logo"
                className="h-8 w-auto rounded-2xl"
                width={50}
                height={50}
              />
              <h1 className="ml-4 text-2xl font-bold">Luxury Properties</h1>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/list_property" passHref>
              <button
                className="py-2 px-6 rounded-lg shadow-md transition"
                style={{
                  backgroundColor: "var(--cta)",
                  color: "var(--cta-text)",
                }}
              >
                List Property
              </button>
            </Link>

            {isLoggedIn ? (
              <>
                <button onClick={() => openModal(<Profile />, true)} className="flex items-center transition">
                  <FaUser className="text-xl mr-2" style={{ color: "var(--gray-text)" }} /> Profile
                </button>
                <button onClick={() => openModal(<div>History Content</div>)} className="flex items-center transition">
                  <FaHistory className="text-xl mr-2" style={{ color: "var(--gray-text)" }} /> History
                </button>
                <button onClick={() => openModal(<div>Chat Content</div>)} className="flex items-center transition">
                  <FaComments className="text-xl mr-2" style={{ color: "var(--gray-text)" }} /> Chat
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openModal(<Login openForgetPassword={() => openModal(<ForgetPassword />)} />)}
                  className="flex items-center transition"
                >
                  <FaSignInAlt className="mr-2" style={{ color: "var(--gray-text)" }} /> Log In
                </button>
                <button onClick={() => openModal(<Register />)} className="flex items-center transition">
                  <FaUserPlus className="mr-2" style={{ color: "var(--gray-text)" }} /> Sign Up
                </button>
              </>
            )}
          </nav>

          <button onClick={toggleTheme} className="text-xl transition">
            {isDarkTheme ? (
              <FaMoon className="text-blue-500" />
            ) : (
              <FaSun className="text-yellow-500" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={toggleMenu}>
            <span className="text-3xl" style={{ color: "var(--foreground)" }}>
              &#9776;
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div
            className={`md:hidden fixed top-0 right-0 h-full w-3/4 max-w-sm p-6 space-y-6 transition-transform duration-300`}
            style={{
              backgroundColor: "rgba(var(--background), 0.9)",
              color: "var(--foreground)",
              zIndex: 20,
            }}
          >
            <button className="text-3xl mb-4" onClick={toggleMenu}>
              <FaTimes style={{ color: "var(--foreground)" }} />
            </button>

            <div className="p-4 rounded-lg space-y-4 text-lg">
              <Link href="/list_property" passHref>
                <button
                  className="py-2 px-6 rounded-lg shadow-md transition w-full"
                  style={{
                    backgroundColor: "var(--cta)",
                    color: "var(--cta-text)",
                  }}
                >
                  List Property
                </button>
              </Link>

              {isLoggedIn ? (
                <>
                  <button onClick={() => openModal(<Profile />, true)} className="flex items-center transition">
                    <FaUser className="mr-3" style={{ color: "var(--gray-text)" }} /> Profile
                  </button>
                  <button onClick={() => openModal(<div>History Content</div>)} className="flex items-center transition">
                    <FaHistory className="mr-3" style={{ color: "var(--gray-text)" }} /> History
                  </button>
                  <button onClick={() => openModal(<div>Chat Content</div>)} className="flex items-center transition">
                    <FaComments className="mr-3" style={{ color: "var(--gray-text)" }} /> Chat
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => openModal(<Login openForgetPassword={() => openModal(<ForgetPassword />)} />)} className="flex items-center transition">
                    <FaSignInAlt className="mr-3" style={{ color: "var(--gray-text)" }} /> Log In
                  </button>
                  <button onClick={() => openModal(<Register />)} className="flex items-center transition">
                    <FaUserPlus className="mr-3" style={{ color: "var(--gray-text)" }} /> Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black transition-all duration-1000 transform bg-opacity-50 z-50">
          <div
            className="rounded-lg p-6 w-80 relative"
            style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }}
          >
            <button onClick={closeModal} className="absolute top-2 right-2">
              <FaTimes style={{ color: "var(--gray-text)" }} className="text-2xl" />
            </button>
            {modalContent}
          </div>
        </div>
      )}

      {/* Profile Sidebar */}
      {isProfileSidebarOpen && (
        <div
          className={`fixed inset-y-0 right-0 transform transition-transform duration-300 ${
            isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"
          } w-80 md:w-96 shadow-lg z-10`}
          style={{
            backgroundColor: "var(--gray-bg)",
            color: "var(--foreground)",
          }}
        >
          <button onClick={closeProfileSidebar} className="absolute top-2 left-2">
            <FaArrowRight className="text-2xl" style={{ color: "var(--gray-text)" }} />
          </button>
          <Profile />
        </div>
      )}
    </>
  );
}
