import React from 'react';
import {
  X,
  Home,
  User,
  Bookmark,
  LogIn,
  LogOut,
  UserPlus,
  HelpCircle,
  MessageCircle,
  FileText,
  TrendingUp,
  ChevronRight,
  Settings,
  Moon,
  Sun,
  Heart
} from 'lucide-react';
import { setAuthToken, notifyAuthStateChange } from '@/utils/auth-util';
import { signOut as nextAuthSignOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Wishlist from './wishlist';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onWishlistClick: () => void;
  onProfileClick: () => void;
  onBookingsClick: () => void;
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

interface MenuItemProps {
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  badge?: string;
  showArrow?: boolean;
  variant?: 'default' | 'danger' | 'primary';
  disabled?: boolean;
}

const MenuItem = ({
  icon: Icon,
  label,
  onClick,
  href,
  className = '',
  badge,
  showArrow = false,
  variant = 'default',
  disabled = false
}: MenuItemProps) => {
  const variantStyles = {
    default: "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 hover:text-blue-600 hover:border-blue-200/60",
    danger: "text-red-600 hover:bg-gradient-to-r hover:from-red-50/80 hover:to-pink-50/80 hover:text-red-700 hover:border-red-200/60",
    primary: "text-blue-600 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 border-blue-200/60"
  };

  const baseClassName = `flex items-center justify-between px-4 py-3.5 mx-2 rounded-xl transition-all duration-300 border border-transparent group relative overflow-hidden ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'} ${className}`;

  const content = (
    <>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/2 group-hover:to-purple-600/2 transition-all duration-300" />

      <div className="flex items-center space-x-3 relative z-10">
        <div className="p-2 rounded-lg bg-white/50 group-hover:bg-white/80 transition-all duration-300 group-hover:shadow-sm">
          <Icon size={18} className="transition-all duration-300 group-hover:scale-110" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{label}</span>
          {badge && (
            <span className="text-xs text-gray-500 mt-0.5">{badge}</span>
          )}
        </div>
      </div>

      {showArrow && (
        <ChevronRight
          size={16}
          className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`w-full text-left ${baseClassName}`}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

const Drawer = ({
  isOpen,
  onClose,
  isAuthenticated,
  onProfileClick,
  onBookingsClick,
  onWishlistClick,
  onLoginClick,
  onSignUpClick
}: DrawerProps) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);

      // Sign out from NextAuth
      await nextAuthSignOut({
        callbackUrl: '/',
        redirect: false
      });

      // Clear any local auth tokens
      setAuthToken(null);
      notifyAuthStateChange();
      onClose();

      // Redirect to home after a short delay
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
    }
  };

  // Menu items for authenticated users
  const authMenuItems = [
    {
      icon: Home,
      label: 'Home',
      href: '/',
      showArrow: true
    },
    {
      icon: User,
      label: 'Profile',
      onClick: onProfileClick,
      badge: 'View & Edit',
      showArrow: true
    },
    {
      icon: Bookmark,
      label: 'My Bookings',
      onClick: onBookingsClick,
      badge: 'Manage reservations',
      showArrow: true
    },
    {
      icon: Heart,
      label: 'Wishlist',
      onClick: onBookingsClick,
      badge: 'Manage reservations',
      showArrow: true
    },
    
    // {
    //   icon: HelpCircle,
    //   label: 'Help Center',
    //   href: '/help',
    //   showArrow: true
    // },
    {
      icon: MessageCircle,
      label: 'Contact Us',
      href: 'https://wa.me/14372887804',
      showArrow: true
    },
    {
      icon: FileText,
      label: 'About',
      href: '/about',
      showArrow: true
    },

    // { 
    //   icon: Settings, 
    //   label: 'Settings', 
    //   onClick: () => {}, 
    //   showArrow: true
    // },
  ];

  // Menu items for guests
  const guestMenuItems = [
    {
      icon: Home,
      label: 'Home',
      href: '/',
      showArrow: true
    },
    {
      icon: TrendingUp,
      label: 'Popular',
      href: '/properties?',
      badge: 'Trending stays',
      showArrow: true
    },
    // {
    //   icon: HelpCircle,
    //   label: 'Help Center',
    //   href: '/help',
    //   showArrow: true
    // },
    {
      icon: MessageCircle,
      label: 'Contact Us',
      href: 'https://wa.me/14372887804',
      showArrow: true
    },
    {
      icon: FileText,
      label: 'About',
      href: '/about',
      showArrow: true
    },
  ];

  return (
    <>
      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-all duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-all duration-500 ease-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <div className="h-full flex flex-col relative">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50/70 to-indigo-50/70 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 to-purple-600/3" />
            <div className="flex items-center justify-between relative z-10">
              <Link href="/" className="flex items-center group" onClick={onClose}>
                <div className="p-2 rounded-xl bg-white shadow-sm group-hover:shadow-md transition-all duration-300">
                  <Image
                    src="/images/cloudlogo.png"
                    alt="Cloud Accommodation"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                </div>
                <div className="ml-3">
                  <h1 className="text-lg font-bold text-gray-800">Cloud Accommodation</h1>
                  <p className="text-xs text-gray-500">Your perfect stay awaits</p>
                </div>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/80 transition-all duration-300 hover:shadow-md active:scale-95"
                aria-label="Close menu"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="space-y-2">
              {isAuthenticated ? (
                <>
                  {/* User section */}
                  <div className="px-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Welcome back!</p>
                          <p className="text-sm text-gray-500">Manage your account</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {authMenuItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      icon={item.icon}
                      label={item.label}
                      onClick={item.onClick}
                      href={item.href}
                      badge={item.badge}
                      showArrow={item.showArrow}
                    />
                  ))}

                  {/* Theme toggle */}
                  {/* <div className="mx-2 my-4">
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-white">
                          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </div>
                        <span className="font-medium text-sm">Theme</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {isDarkMode ? 'Dark' : 'Light'}
                        </span>
                        <div className={`w-10 h-5 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'}`}>
                          <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 mt-0.5 ${isDarkMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </div>
                      </div>
                    </button>
                  </div> */}

                  {/* Logout button */}
                  <div className="mx-2 mt-8 pt-4 border-t border-gray-200">
                    <MenuItem
                      icon={LogOut}
                      label={isLoggingOut ? 'Signing Out...' : 'Sign Out'}
                      onClick={handleSignOut}
                      variant="danger"
                      disabled={isLoggingOut}
                    />
                  </div>
                </>
              ) : (
                <>
                  {guestMenuItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      icon={item.icon}
                      label={item.label}
                      href={item.href}
                      onClick={onClose}
                      badge={item.badge}
                      showArrow={item.showArrow}
                    />
                  ))}

                  {/* Auth buttons */}
                  <div className="mx-2 mt-8 pt-6 border-t border-gray-200 space-y-3">
                    <button
                      onClick={() => {
                        onClose();
                        onLoginClick();
                      }}
                      className="w-full px-4 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center space-x-2"
                    >
                      <LogIn size={18} />
                      <span>Log In</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onSignUpClick();
                      }}
                      className="w-full px-4 py-3.5 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:shadow-md active:scale-95 flex items-center justify-center space-x-2"
                    >
                      <UserPlus size={18} />
                      <span>Sign Up</span>
                    </button>
                  </div>
                </>
              )}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                © 2024 Cloud Accommodation
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Version 2.1.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;