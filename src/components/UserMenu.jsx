"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaChevronDown } from "react-icons/fa6";
import { logout } from "../lib/action";
import { getProfile } from "../lib/data";
import { getUserRoleIcon } from "../utils/userRoles";

const UserMenu = ({ dict, isMobile = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();

        // Check if response is successful and has user data
        if (res && res.success !== false && res.statusCode !== 401) {
          setUserProfile(res);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        setUserProfile(null);
      }
    };
    fetchProfile();
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // User is not logged in - show login button
  if (!userProfile) {
    if (isMobile) {
      return (
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all font-medium w-full justify-center mb-2"
        >
          <FaUser className="w-5 h-5 text-white" /> {dict?.login || "Giriş Yap"}
        </Link>
      );
    }

    return (
      <Link
        href="/login"
        className="text-white flex items-center text-nowrap gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium text-sm whitespace-nowrap"
      >
        <FaUser className="w-4 h-4 flex-shrink-0" />
        <span className="inline-block">{dict?.login || "Giriş Yap"}</span>
      </Link>
    );
  }

  // User is logged in - show profile dropdown
  if (isMobile) {
    return (
      <div className="flex flex-col gap-1 mb-2">
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
            userProfile.role === "FREE"
              ? "text-white bg-black hover:bg-gray-800"
              : userProfile.role === "PAID"
              ? "text-white bg-red-500 hover:bg-red-600"
              : userProfile.role === "PREMIUM"
              ? "text-white bg-purple-600 hover:bg-purple-700"
              : "text-[#013b73] bg-blue-50 hover:bg-blue-100 hover:text-red-700"
          } transition-all font-medium w-full text-left cursor-pointer`}
        >
          {userProfile.role ? (
            <Image
              src={getUserRoleIcon(userProfile.role)}
              alt={`${userProfile.role} icon`}
              width={20}
              height={20}
              className="w-5 h-5 rounded-full object-cover"
            />
          ) : (
            <FaUser className="w-5 h-5 text-blue-500" />
          )}
          {userProfile.firstName}
          <FaChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isDropdownOpen && (
          <div className="flex flex-col py-2 bg-white rounded-xl shadow border mt-1">
            <Link
              href="/profile"
              className="px-4 py-2 text-gray-800 hover:bg-blue-50 rounded transition-all text-sm"
              onClick={() => setIsDropdownOpen(false)}
            >
              {dict?.profile || "Profil"}
            </Link>
            <button
              className="px-4 py-2 text-gray-800 hover:bg-red-50 rounded transition-all text-sm text-left"
              onClick={handleLogout}
            >
              {dict?.logout || "Çıkış Yap"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          userProfile.role === "FREE"
            ? "text-black bg-white hover:bg-gray-300"
            : userProfile.role === "PAID"
            ? "text-white bg-zinc-700 hover:bg-zinc-600"
            : userProfile.role === "PREMIUM"
            ? "text-white bg-black hover:bg-gray-800"
            : "text-[#013b73] bg-blue-50 hover:bg-blue-100 hover:text-red-700"
        } transition-all font-medium cursor-pointer`}
      >
        {userProfile.role ? (
          <Image
            src={getUserRoleIcon(userProfile.role)}
            alt={`${userProfile.role} icon`}
            width={32}
            height={32}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <FaUser className="w-4 h-4" />
        )}
        {userProfile.firstName}
        <FaChevronDown
          className={`w-3 h-3 transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-xl shadow-2xl transition-all duration-300 z-50 ${
          isDropdownOpen
            ? "opacity-100 visible transform translate-y-0"
            : "opacity-0 invisible transform -translate-y-3"
        }`}
      >
        <div className="flex flex-col py-2">
          <Link
            href="/profile"
            className="px-4 py-2 text-gray-800 hover:bg-blue-50 rounded transition-all text-sm"
            onClick={() => setIsDropdownOpen(false)}
          >
            {dict?.profile || "Profil"}
          </Link>
          <button
            className="px-4 py-2 text-gray-800 hover:bg-red-50 rounded transition-all text-sm text-left"
            onClick={handleLogout}
          >
            {dict?.logout || "Çıkış Yap"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
