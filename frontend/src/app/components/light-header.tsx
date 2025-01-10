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

export default function LightHeader() {
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
        className={`flex fixed top-0 justify-between left-0 w-full z-20 bg-opacity-80 px-6 py-4`}
      >
        {/* Logo */}
        <Link href="/" passHref legacyBehavior>
          <a className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <Image
              src="/images/cloudlogo.png"
              alt="Property Logo"
              className="h-10 w-auto rounded-lg hover:scale-105 transition-transform"
              height={160}
              width={160}
            />
            <h1 className={`ml-4 text-2xl max-sm:text-xl font-bold bg-gradient-to-r 
              ${isDarkTheme 
                ? 'text-gray-900 from-gray-900 to-gray-800' 
                : 'text-white'} 
              bg-clip-text `}>
              Cloud Accommodation
            </h1>
          </a>
        </Link>
        <button onClick={toggleTheme} 
            className="text-xl transition-transform md:hidden hover:scale-110 hover:rotate-12">
            {isDarkTheme ? (
              <FaMoon className="text-blue-400" />
            ) : (
              <FaSun className="text-yellow-400" />
            )}
          </button>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 ml-6">
          <button onClick={toggleTheme} 
            className="text-xl transition-transform hover:scale-110 hover:rotate-12">
            {isDarkTheme ? (
              <FaMoon className="text-blue-400" />
            ) : (
              <FaSun className="text-yellow-400" />
            )}
          </button>
          
          {isLoggedIn ? (
            <>
              <button
                onClick={() => openModal(<Profile />)}
                className="flex items-center px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <FaUser className="text-xl mr-2 text-blue-500" /> Profile
              </button>
              <button
                onClick={() => openModal(<div>History Content</div>)}
                className="flex items-center px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <FaHistory className="text-xl mr-2 text-blue-500" /> History
              </button>
              <button
                onClick={() => openModal(<div>Chat Content</div>)}
                className="flex items-center px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <FaComments className="text-xl mr-2 text-blue-500" /> Chat
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openModal(<Login openForgetPassword={() => openModal(<ForgetPassword />)} />)}
                className="flex items-center px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all"
              >
                <FaSignInAlt className="mr-2" /> Log In
              </button>
              <button
                onClick={() => openModal(<Register />)}
                className="flex items-center px-6 py-2 rounded-full border-2 border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all"
              >
                <FaUserPlus className="mr-2" /> Sign Up
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          <span className="text-3xl">&#9776;</span>
        </button>
      </header>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 p-6 space-y-6 
          transition-all duration-300 z-50">
          <button className="text-3xl mb-4" onClick={toggleMenu}>
            <FaTimes style={{ color: "var(--gray-text)" }} />
          </button>

          <div className="p-4 rounded-lg bg-gray-200 space-y-4 text-lg">
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
                        openForgetPassword={() => openModal(<ForgetPassword />)}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className={`rounded-2xl w-96 p-6 shadow-2xl transform transition-all 
            ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <button onClick={closeModal} 
              className="absolute top-4 right-4 hover:rotate-90 transition-transform">
              <FaTimes className="text-2xl" />
            </button>
            {modalContent}
          </div>
        </div>
      )}
    </>
  );
}
