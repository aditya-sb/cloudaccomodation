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
  const scrollThreshold = 50; 

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
    // Check if user is logged in
    const userId = sessionStorage.getItem("userId");
    setIsLoggedIn(!!userId);

    // Handle scroll with debounce for better performance
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show the header if scrolling up or near the top, hide when scrolling down
      if (currentScrollY < scrollThreshold || lastScrollY - currentScrollY > 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll event listener for smoother behavior
    let throttleTimeout: NodeJS.Timeout | null = null;
    const throttledHandleScroll = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          handleScroll();
          throttleTimeout = null;
        }, 100); // Adjust this value (in ms) to control scroll detection sensitivity
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-10 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
          } shadow-lg`}
        style={{
          backgroundColor: "var(--background)",
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
              <h1 className="ml-4 text-2xl font-bold" style={{ color: "var(--copy-primary)" }}>Cloud Accommodation</h1>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={toggleTheme} className="text-xl transition">
              {isDarkTheme ? (
                <FaMoon className="text-blue-500" />
              ) : (
                <FaSun className="text-yellow-500" />
              )}
            </button>
            <Link href="/blogs" passHref>
              <button
                className="py-2 px-6 rounded-lg shadow-md transition hover:opacity-75"
                style={{
                  backgroundColor: "var(--cta)",
                  color: "var(--cta-text)",
                }}
              >
                Blogs
              </button>
            </Link>
            <Link href="/list_property" passHref>
              <button
                className="py-2 px-6 rounded-lg shadow-md transition hover:opacity-75"
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
                <button onClick={() => openModal(<Profile />, true)} className="flex items-center transition" style={{ color: "var(--gray-text)" }}>
                  <FaUser className="text-xl mr-2" style={{ color: "var(--gray-text)" }} /> Profile
                </button>
                <button onClick={() => openModal(<div>History Content</div>)} className="flex items-center transition" style={{ color: "var(--gray-text)" }}>
                  <FaHistory className="text-xl mr-2" style={{ color: "var(--gray-text)" }} /> History
                </button>
                <button onClick={() => openModal(<div>Chat Content</div>)} className="flex items-center transition" style={{ color: "var(--gray-text)" }}>
                  <FaComments className="text-xl mr-2" style={{ color: "var(--gray-text)" }} /> Chat
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openModal(<Login openForgetPassword={() => openModal(<ForgetPassword />)} />)}
                  className="flex items-center transition" style={{ color: "var(--gray-text)" }}
                >
                  <FaSignInAlt className="mr-2" style={{ color: "var(--gray-text)" }} /> Log In
                </button>
                <button onClick={() => openModal(<Register />)} className="flex items-center transition" style={{ color: "var(--gray-text)" }}>
                  <FaUserPlus className="mr-2" style={{ color: "var(--gray-text)" }} /> Sign Up
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={toggleMenu}>
            <span className="text-3xl" style={{  color: "var(--gray-text)" }}>
              &#9776;
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div
            className={`md:hidden fixed top-0 right-0 h-full w-3/4 max-w-sm p-6 space-y-6 transition-transform duration-300`}
            style={{
              backgroundColor: "var(--gray-bg)",
              color: "var(--gray-text)",
              zIndex: 20,
            }}
          >
            <button className="text-3xl mb-4" onClick={toggleMenu}>
              <FaTimes style={{ color: "var(--gray-text)" }} />
            </button>

            <div className="p-4 rounded-lg space-y-4 text-lg" style={{
              backgroundColor: "var(--gray-bg)",
              zIndex: 20,
            }}>
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
              <button onClick={toggleTheme} className="text-xl transition">
              {isDarkTheme ? (<>
                <FaMoon className="text-blue-500" /> <span className="text-blue-500">Dark</span>
                </>
              ) : (
                <>
                <FaSun className="text-yellow-500" /><span className="text-yellow-500">Light</span>
                </>
              )}
            </button>

              {isLoggedIn ? (
                <>
                  <button onClick={() => openModal(<Profile />, true)} className="flex items-center transition" style={{ color: "var(--gray-text)" }}>
                    <FaUser className="mr-3" style={{ color: "var(--gray-text)" }} /> Profile
                  </button>
                  <button onClick={() => openModal(<div>History Content</div>)} className="flex items-center transition" style={{ color: "var(--gray-text)" }}>
                    <FaHistory className="mr-3" style={{ color: "var(--gray-text)" }} /> History
                  </button>
                  <button onClick={() => openModal(<div>Chat Content</div>)} className="flex items-center transition" style={{ color: "var(--gray-text)" }}>
                    <FaComments className="mr-3" style={{ color: "var(--gray-text)" }} /> Chat
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => openModal(<Login openForgetPassword={() => openModal(<ForgetPassword />)} />)} className="flex items-center transition" style={{ color: "var(--gray-text)" }}>
                    <FaSignInAlt className="mr-3" style={{ color: "var(--gray-text)" }} /> Log In
                  </button>
                  <button onClick={() => openModal(<Register />)} className="flex items-center transition" style={{ color: "var(--gray-text)" }}>
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
          className={`fixed inset-y-0 right-0 transform transition-transform duration-300 ${isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"
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
