"use client";

import { useState, ReactNode, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  booking?: boolean;
}

export default function Dropdown({ title, children, icon, className = '', booking = false }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`w-full max-w-lg mx-auto rounded-lg bg-white mb-2 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full rounded-lg p-4 font-medium transition-all duration-300 hover:bg-gray-100
          ${isOpen ? 'border-b' : ''}`}
        style={{ backgroundColor: "var(--card)" }}
        aria-expanded={isOpen}
        aria-controls="dropdown-content"
      >
        <div className="flex items-center gap-4">
          <div className="text-blue-500">
            {icon}
          </div>
          <span className="text-sm">{title}</span>
        </div>
        <span
          className={`text-gray-400 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown size={12} />
        </span>
      </button>

      <div
        id="dropdown-content"
        ref={contentRef}
        className={`transition-all rounded-lg duration-300 overflow-hidden bg-gray-50`}
        style={{
          height: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
        }}
      >
        <div className="p-4 text-sm text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
}
