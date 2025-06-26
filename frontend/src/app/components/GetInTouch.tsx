import React, { useState, useEffect } from "react";
import { MessageSquare, Phone, Mail, MessageCircle, PhoneCall, UserPlus } from "lucide-react";
import Register from "../auth/Register";
import isAuthenticated, { useClientSide } from "@/utils/auth-util";

const GetInTouch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const isUserAuthenticated = isClient ? isAuthenticated() : false;
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const contactOptions = [
    {
      icon: <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" />, // Adjusted for mobile
      label: "Live Chat",
      color: "text-red-500 border-red-500",
    },
    {
      icon: <Phone className="w-6 h-6 sm:w-8 sm:h-8" />, // Adjusted for mobile
      label: "Call",
      color: "text-orange-400 border-orange-400",
    },
    {
      icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8" />, // Adjusted for mobile
      label: "Email",
      color: "text-blue-500 border-blue-500",
    },
    {
      icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />, // Adjusted for mobile
      label: "Chat on Whatsapp",
      color: "text-green-500 border-green-500",
    },
  ];

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 mb-6 py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            If you have any questions, feel free to contact us.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {contactOptions.map((option, index) => (
            <div
              key={index}
              className={`p-4 sm:p-6 border-2 rounded-lg bg-white flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-lg ${option.color}`}
            >
              <div className={option.color}>{option.icon}</div>
              <span className="mt-2 sm:mt-3 text-xs sm:text-base font-medium">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-red-600">
        <div className="mx-auto px-6 py-6 flex flex-col sm:flex-row sm:justify-between max-sm:justify-center items-center sm:items-center">
          <div className="text-white text-center sm:text-left">
            <h3 className="font-semibold">
              Find Your Perfect Stay with a Personal Agent!
            </h3>
            <p className="text-sm text-white/90 mt-2 max-sm:hidden">
              Get a personal agent for customized accommodation options,
              verified listings, and 24/7 support—hassle-free and tailored just
              for you!
            </p>
          </div>
          <button className="w-fit bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 mt-4 sm:mt-0 sm:w-auto justify-center">
            <PhoneCall /><span>Get an agent</span>
          </button>
        </div>
      </div>

      {!isUserAuthenticated && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-blue-50 rounded-lg shadow-md p-6 sm:p-8 flex flex-col items-center text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              Join Cloud Accommodation Today
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 max-w-lg">
              Sign up for an account to access exclusive deals, save your favorite properties, and get personalized accommodation recommendations.
            </p>
            <button 
              onClick={openModal}
              className="flex items-center px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-md"
            >
              <UserPlus className="mr-2 h-5 w-5" /> Sign Up Now
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:justify-between">
          <div className="w-full h-80 sm:mt-0 mb-4 max-sm:flex hidden">
            <img
              src="/images/splash.png"
              alt="Partnership illustration"
              className="w-full h-full rounded-lg "
            />
          </div>
          <div className="max-w-md text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              Partner With Us
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              At Cloud Accommodation, we provide a smooth booking experience and
              dedicated sales support to ensure success.
            </p>
            <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Partner with us
            </button>
          </div>
          <div className="w-48 sm:w-64 h-48 sm:h-64 mt-4 sm:mt-0 md:flex hidden">
            <img
              src="/images/splash.png"
              alt="Partnership illustration"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      {isModalOpen && (
        <div className="w-full fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl w-2/5 max-sm:w-full p-6 shadow-2xl transform transition-all">
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 hover:rotate-90 transition-transform"
            >
              <span className="text-2xl">×</span>
            </button>
            <Register />
          </div>
        </div>
      )}
    </div>
  );
};

export default GetInTouch;
