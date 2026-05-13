"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExcerptDropdownProps {
  excerpt: string;
  label: string;
  variant: "mobile" | "desktop";
}

export default function ExcerptDropdown({
  excerpt,
  label,
  variant,
}: ExcerptDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "mobile") {
    return (
      <div className="mb-6 bg-gradient-to-br px-3 from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-200 overflow-hidden backdrop-blur-sm relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full p-8 flex items-center justify-between hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
        >
          <div className="relative z-10">
            <p className="text-lg md:text-xl font-bold text-gray-800 tracking-wide drop-shadow-sm">
              {label}
            </p>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300 ease-out" />
          </div>
          <div className="relative z-10">
            {isOpen ? (
              <ChevronUp className="text-gray-600 w-6 h-6 drop-shadow-sm transition-all duration-300 ease-out transform group-hover:text-gray-800 group-hover:-translate-y-1" />
            ) : (
              <ChevronDown className="text-gray-600 w-6 h-6 drop-shadow-sm transition-all duration-300 ease-out transform group-hover:text-gray-800 group-hover:translate-y-1" />
            )}
          </div>
        </button>
        {isOpen && (
          <div className="px-8 pb-8 border-t border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-20" />
            <p className="relative text-gray-700 text-base md:text-lg leading-relaxed font-serif text-justify mt-6 drop-shadow-sm animate-fade-in">
              {excerpt}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="mb-8 relative">
      <div className="rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] shadow-2xl border border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-blue-900/40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-8 py-6 flex items-center justify-between"
        >
          <div>
            <h3 className="text-2xl font-serif font-bold text-gray-100 tracking-wide">
              {label}
            </h3>
            <span className="block mt-1 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
          </div>
          <div className="p-2 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 shadow-md">
            {isOpen ? (
              <ChevronUp className="w-6 h-6 text-white" />
            ) : (
              <ChevronDown className="w-6 h-6 text-white" />
            )}
          </div>
        </button>
        {isOpen && (
          <div className="px-8 pb-8 border-t border-gray-700 bg-gradient-to-br from-[#1e293b] to-[#0f172a] animate-fade-in">
            <p className="mt-6 text-gray-300 text-lg leading-relaxed font-light text-justify">
              {excerpt}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
