"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaHistory,
  FaComments,
  FaMoon,
  FaSun,
  FaTimes,
  FaBookmark,
} from "react-icons/fa";
import Login from "../auth/Login";
import Profile from "../auth/Profile";
import Register from "../auth/Register";
import ForgetPassword from "../auth/ForgetPassword";
import { useTheme } from "../ThemeContext";
import isAuthenticated from "@/utils/auth-util";
import { useGetUserDetailsQuery } from "../redux/slices/apiSlice";
import Loader from "@/loader/loader";
import { useRouter } from "next/navigation";
import Bookings from "./bookings/Bookings";

export default function LightHeader() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const { data, isLoading: isLoadingData, error: dataError, refetch } = useGetUserDetailsQuery({}, {
    skip: !isAuthenticatedUser
  });
  console.log(data);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticatedUser(isAuthenticated());
    };

    checkAuth();
    window.addEventListener('auth-state-changed', checkAuth);
    
    return () => {
      window.removeEventListener('auth-state-changed', checkAuth);
    };
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

  // if (isLoadingData) return <Loader />;


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
        {/* <button onClick={toggleTheme} 
            className="text-xl transition-transform md:hidden hover:scale-110 hover:rotate-12">
            {isDarkTheme ? (
              <FaMoon className="text-blue-400" />
            ) : (
              <FaSun className="text-yellow-400" />
            )}
          </button> */}
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 ml-6">
          {/* <button onClick={toggleTheme} 
            className="text-xl transition-transform hover:scale-110 hover:rotate-12">
            {isDarkTheme ? (
              <FaMoon className="text-blue-400" />
            ) : (
              <FaSun className="text-yellow-400" />
            )}
          </button> */}
          
          {isAuthenticatedUser ? (
            <>
              <button
                onClick={() => openModal(<Profile />)}
                className="flex items-center px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <FaUser className="text-xl mr-2 text-blue-500" /> Profile
              </button>
              {/* <button
                onClick={() => openModal(<div>Chat Content</div>)}
                className="flex items-center px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <FaComments className="text-xl mr-2 text-blue-500" /> Chat
              </button> */}
              <button
                onClick={() => router.push('/bookings')}
                className="flex items-center px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <FaBookmark className="text-xl mr-2 text-blue-500" /> Bookings
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

            {isAuthenticatedUser ? (
              <>
                <button
                  onClick={() => openModal(<Profile />)}
                  className="flex items-center transition"
                  style={{ color: "var(--gray-text)" }}
                >
                  <FaUser className="mr-3" /> Profile
                </button>
                {/* <button
                  onClick={() => openModal(<div>Chat Content</div>)}
                  className="flex items-center transition"
                  style={{ color: "var(--gray-text)" }}
                >
                  <FaComments className="mr-3" /> Chat
                </button> */}
                <button
                  onClick={() => openModal(<Bookings />)}
                  className="flex items-center transition"
                  style={{ color: "var(--gray-text)" }}
                >
                  <FaBookmark className="mr-3" /> Bookings
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
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white md:w-2/5  dark:bg-gray-900 rounded-2xl w-full m-4  relative shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
            <div className="flex items-center justify-center">{modalContent}</div>
          </div>
        </div>
      )}
    </>
  );
}
