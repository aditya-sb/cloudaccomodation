"use client";
import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsAnimating(true);
      
      // Add animation class after a small delay to trigger transition
      const timer = setTimeout(() => setIsAnimating(false), 10);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle touch events for swipe-to-close
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    currentY.current = startY.current;
    
    if (drawerRef.current) {
      drawerRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    // Only allow swiping down, not up
    if (deltaY > 0 && drawerRef.current) {
      drawerRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = () => {
    const deltaY = currentY.current - startY.current;
    
    if (drawerRef.current) {
      drawerRef.current.style.transition = 'transform 0.3s ease-out';
      
      // If swiped more than 100px or 25% of drawer height, close it
      if (deltaY > 100 || (drawerRef.current.clientHeight && deltaY > drawerRef.current.clientHeight * 0.25)) {
        onClose();
      } else {
        // Otherwise snap back to original position
        drawerRef.current.style.transform = 'translateY(0)';
      }
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? 'bg-opacity-0' : 'bg-opacity-50'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`relative w-full max-h-[85vh] bg-white rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-y-full' : 'translate-y-0'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle for swiping */}
        <div className="absolute top-3 left-0 right-0 flex justify-center">
          <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          aria-label="Close drawer"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="pt-10 px-5 pb-8 max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomDrawer; 