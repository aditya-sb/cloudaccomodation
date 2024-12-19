"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaHistory,
  FaComments,
  FaMoon,
  FaSun,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import Login from "../auth/Login";
import Profile from "../auth/Profile";
import Register from "../auth/Register";
import ForgetPassword from "../auth/ForgetPassword";
import { useTheme } from "../ThemeContext";

export default function Header() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/properties?search=${searchTerm}`;
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center px-6 py-2 border-b"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          borderBottomColor: "var(--gray-border)",
        }}
      >
        {/* Logo */}
        <Link href="/" passHref legacyBehavior>
          <a className="flex items-center cursor-pointer">
            <Image
              src="/images/cloudlogo.png"
              alt="Property Logo"
              className="h-10 w-auto rounded-2xl"
              height={160}
              width={160}
            />
            <h1
              className="ml-4 text-xl font-bold"
              style={{ color: "var(--copy-primary)" }}
            >
              Cloud Accommodation
            </h1>
          </a>
        </Link>

        {/* Search Bar (Hidden on mobile screens) */}
        <div className="flex-grow mx-6 hidden md:block">
          <div
            className="flex items-center bg-gray-200 dark:bg-gray-800 rounded-full gap-2 px-4 py-2"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--gray-text)",
            }}
          >
            <input
              type="text"
              placeholder="Search by City, University, or Property"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none w-full"
              style={{ color: "var(--gray-text)" }}
            />
            <FaSearch
              className="text-gray-500 cursor-pointer"
              onClick={handleSearch}
              style={{ color: "var(--gray-text)" }}
            />
          </div>
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="text-xl transition">
          {isDarkTheme ? (
            <FaMoon className="text-blue-500" />
          ) : (
            <FaSun className="text-yellow-500" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 ml-6">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => openModal(<Profile />)}
                className="flex items-center transition"
                style={{ color: "var(--gray-text)" }}
              >
                <FaUser className="text-xl mr-2" /> Profile
              </button>
              <button
                onClick={() => openModal(<div>History Content</div>)}
                className="flex items-center transition"
                style={{ color: "var(--gray-text)" }}
              >
                <FaHistory className="text-xl mr-2" /> History
              </button>
              <button
                onClick={() => openModal(<div>Chat Content</div>)}
                className="flex items-center transition"
                style={{ color: "var(--gray-text)" }}
              >
                <FaComments className="text-xl mr-2" /> Chat
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() =>
                  openModal(
                    <Login
                      openForgetPassword={() =>
                        openModal(<ForgetPassword />)
                      }
                    />
                  )
                }
                className="flex items-center transition"
                style={{ color: "var(--gray-text)" }}
              >
                <FaSignInAlt className="mr-2" /> Log In
              </button>
              <button
                onClick={() => openModal(<Register />)}
                className="flex items-center transition"
                style={{ color: "var(--gray-text)" }}
              >
                <FaUserPlus className="mr-2" /> Sign Up
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          <span className="text-3xl" style={{ color: "var(--gray-text)" }}>
            &#9776;
          </span>
        </button>
      </header>

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
                <button
                  onClick={() => openModal(<Profile />)}
                  className="flex items-center transition"
                  style={{ color: "var(--gray-text)" }}
                >
                  <FaUser className="mr-3" /> Profile
                </button>
                <button
                  onClick={() => openModal(<div>History Content</div>)}
                  className="flex items-center transition"
                  style={{ color: "var(--gray-text)" }}
                >
                  <FaHistory className="mr-3" /> History
                </button>
                <button
                  onClick={() => openModal(<div>Chat Content</div>)}
                  className="flex items-center transition"
                  style={{ color: "var(--gray-text)" }}
                >
                  <FaComments className="mr-3" /> Chat
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    openModal(
                      <Login
                        openForgetPassword={() =>
                          openModal(<ForgetPassword />)
                        }
                      />
                    )
                  }
                  className="flex items-center transition"
                  style={{ color: "var(--gray-text)" }}
                >
                  <FaSignInAlt className="mr-3" /> Log In
                </button>
                <button
                  onClick={() => openModal(<Register />)}
                  className="flex items-center transition"
                  style={{ color: "var(--gray-text)" }}
                >
                  <FaUserPlus className="mr-3" /> Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          style={{ backgroundColor: "var(--gray-overlay)" }}
        >
          <div
            className="rounded-lg p-6 w-80 relative"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--foreground)",
            }}
          >
            <button onClick={closeModal} className="absolute top-2 right-2">
              <FaTimes className="text-2xl" style={{ color: "var(--gray-text)" }} />
            </button>
            {modalContent}
          </div>
        </div>
      )}
    </>
  );
}
