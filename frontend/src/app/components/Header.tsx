"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
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
  FaBookmark,
  FaHeart,
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
import Drawer from "./Drawer";
import Bookings from "./bookings/Bookings";
interface HeaderProps {
  isPropertyPage: boolean;
}

export default function Header({ isPropertyPage, ...props }: HeaderProps) {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const { data, isLoading: isLoadingData, error: dataError, refetch } = useGetUserDetailsQuery({}, {
    skip: !isAuthenticatedUser
  });
  console.log(data);
  
  useEffect(() => {
    // Check auth status whenever the component mounts or auth state changes
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
  const router = useRouter();
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
      router.push(`/properties?search=${searchTerm}`);
    }
  };
  // if(isLoadingData){
  //   <Loader/>;
  // }

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full h-16 backdrop-blur bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 flex items-center justify-between px-4 py-4 border-b shadow-sm"
        style={{
          color: "var(--foreground)",
          borderBottomColor: "var(--gray-border)",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          zIndex: "50",
        }}
      >
        {/* Logo - Updated styling */}
        <Link href="/" passHref legacyBehavior>
          <a className="max-sm:hidden flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <Image
              src="/images/cloudlogo.png"
              alt="Property Logo"
              className="h-8 w-auto rounded-xl"
              height={160}
              width={160}
            />

            <h1 className="ml-4 text-2xl max-sm:text-lg  font-bold tracking-tight">
              cloud accommodation
            </h1>
          </a>
        </Link>

        {/* Search Bar - Updated styling */}
        {!isPropertyPage? (
          <div className="flex-grow h-10 mx-8 max-sm:mx-0">
          <div className="flex items-center w-full h-10 bg-gray-100 dark:bg-gray-800 rounded-full hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search by City, University, or Property"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="bg-transparent outline-none w-full h-10 px-6 py-3 rounded-full"
              style={{ color: "var(--gray-text)" }}
            />
            <FaSearch
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer mr-4 text-lg transition-colors"
              onClick={handleSearch}
            />
          </div>
        </div>
        ): null}

        
        {/* <button
          onClick={toggleTheme}
          className="md:hidden p-2 rounded-full hover:bg-gray-100 ml-4 mr-4 dark:hover:bg-gray-800 transition-colors"
        >
          {isDarkTheme ? (
            <FaMoon className="text-xl text-blue-500" />
          ) : (
            <FaSun className="text-xl text-yellow-500" />
          )}
        </button> */}
        {/* Desktop Navigation - Updated styling */}
        <nav className="hidden md:flex items-center space-x-3">
          {/* Theme Toggle - Updated styling */}
        {/* <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 ml-4 mr-4 dark:hover:bg-gray-800 transition-colors"
        >
          {isDarkTheme ? (
            <FaMoon className="text-xl text-blue-500" />
          ) : (
            <FaSun className="text-xl text-yellow-500" />
          )}
        </button> */}
          {isAuthenticatedUser ? (
            <>
              <button
                onClick={() => openModal(<Profile />)}
                className="flex items-center hover:text-blue-500 transition-colors"
              >
                <FaUser className="text-lg mr-2" /> Profile
              </button>
              <button
                onClick={() => router.push('/wishlist')}
                className="flex items-center hover:text-blue-500 transition-colors"
              >
                <FaHeart className="text-lg mr-2" /> Wishlist
              </button>
              {/* <button
                onClick={() => openModal(<div>History Content</div>)}
                className="flex items-center hover:text-blue-500 transition-colors"
              >
                <FaHistory className="text-lg mr-2" /> History
              </button> */}
              {/* <button
                onClick={() => openModal(<div>Chat Content</div>)}
                className="flex items-center hover:text-blue-500 transition-colors"
              >
                <FaComments className="text-lg mr-2" /> Chat
              </button> */}
              <button
                onClick={() => router.push('/bookings')}
                className="flex items-center hover:text-blue-500 transition-colors"
              >
                <FaBookmark className="text-lg mr-2" /> Bookings
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
                className="flex items-center px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FaSignInAlt className="mr-2" /> Log In
              </button>
              <button
                onClick={() => {
                  openModal(<Register />);
                }}
                className="flex items-center px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FaUserPlus className="mr-2" /> Sign Up
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu - Updated styling */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={toggleMenu}
        >
          <span className="text-2xl">&#9776;</span>
        </button>
      </header>

      <Drawer
        isOpen={menuOpen}
        onClose={toggleMenu}
        isAuthenticated={isAuthenticatedUser}
        onProfileClick={() => openModal(<Profile />)}
        onBookingsClick={() => router.push('/bookings')}
        onWishlistClick={() => router.push('/wishlist')}
        onLoginClick={() =>
          openModal(
            <Login openForgetPassword={() => openModal(<ForgetPassword />)} />
          )
        }
        onSignUpClick={() => openModal(<Register />)}
      />

      {/* Modal - Updated styling */}
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
