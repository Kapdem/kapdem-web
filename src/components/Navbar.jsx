"use client";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import Topbar from "./Topbar";
import LocaleSwitcher from "./LocaleSwicher";
import UserMenu from "./UserMenu";
import SearchModal from "./SearchModal";

const NAVBAR_TOPBAR_HEIGHT = 32;
const Navbar = ({ dict, lang }) => {
  const pathname = usePathname();
  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/en/login" ||
    pathname === "/en/register" ||
    pathname === "/confirmation" ||
    pathname === "/en/confirmation" ||
    pathname.startsWith("/confirmation") ||
    pathname.startsWith("/en/confirmation") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/en/forgot-password") ||
    pathname.startsWith("/en/reset-password") ||
    pathname.startsWith("/reset-password")
  ) {
    return null;
  }
  const [isYayinlarOpen, setIsYayinlarOpen] = useState(false);
  const [isHakkimizdaOpen, setIsHakkimizdaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isMobileYayinlarOpen, setIsMobileYayinlarOpen] = useState(false);
  const [isMobileHakkimizdaOpen, setIsMobileHakkimizdaOpen] = useState(false);
  const yayinlarDropdownRef = useRef(null);
  const hakkimizdaDropdownRef = useRef(null);
  const searchRef = useRef(null);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileYayinlarOpen(false);
    setIsMobileHakkimizdaOpen(false);
  };

  // Mobile menu donate button
  const renderMobileDonateButton = () => (
    <Link
      prefetch={false}
      href="/donate"
      className="group relative overflow-hidden flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 rounded-2xl text-white font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl"
      onClick={closeMobileMenu}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Heart Icon */}
      <div className="relative z-10 w-6 h-6 text-red-200 group-hover:text-white transition-colors duration-300">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
        </svg>
      </div>

      {/* Text */}
      <span className="relative z-10 text-lg tracking-wide">{dict.donate}</span>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-pulse"></div>
      </div>
    </Link>
  );

  // Dropdown toggles
  const toggleYayinlarDropdown = () => {
    setIsYayinlarOpen((prev) => !prev);
    setIsHakkimizdaOpen(false);
  };
  const toggleHakkimizdaDropdown = () => {
    setIsHakkimizdaOpen((prev) => !prev);
    setIsYayinlarOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Click outside to close dropdown/search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        yayinlarDropdownRef.current &&
        !yayinlarDropdownRef.current.contains(event.target)
      ) {
        setIsYayinlarOpen(false);
      }
      if (
        hakkimizdaDropdownRef.current &&
        !hakkimizdaDropdownRef.current.contains(event.target)
      ) {
        setIsHakkimizdaOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Topbar üstte */}
      <Topbar dict={dict} params={{ lang }} />
      <div
        className={`w-full z-[100] fixed left-0 transition-all duration-300 ${
          scrolled
            ? "bg-[#002C54] backdrop-blur-sm shadow-lg"
            : pathname === "/en" || pathname === "/blog" || pathname === "/"
              ? "bg-[#002C54] lg:bg-gradient-to-b lg:from-blue/60 lg:via-blue/40 lg:to-transparent"
              : "bg-[#002C54] shadow-md"
        }`}
        style={{ top: NAVBAR_TOPBAR_HEIGHT }}
      >
        <div className="max-w-7xl mx-auto text-nowrap">
          <div className="flex justify-between items-center px-4 lg:px-6 h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link
                prefetch={false}
                href="/"
                className="flex items-center group z-10"
              >
                <Image
                  width={1920}
                  height={1080}
                  src="/images/kapdem-logo-2.png"
                  alt="Kapdem Logo"
                  className=" object-cover transition-all duration-300  w-44"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="relative" ref={yayinlarDropdownRef}>
                <button
                  onClick={toggleYayinlarDropdown}
                  className="flex items-center gap-2 px-3 py-1 rounded-xl text-white hover:text-blue-300 hover:bg-white/10 transition-all duration-300 font-medium text-sm focus:outline-none"
                >
                  {dict?.publications?.title}
                  <FaChevronDown
                    className={`w-3 h-3 transition-transform duration-300 ${
                      isYayinlarOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl transition-all duration-300 ${
                    isYayinlarOpen
                      ? "opacity-100 visible transform translate-y-0"
                      : "opacity-0 invisible transform -translate-y-3"
                  }`}
                >
                  <div className="p-2">
                    <Link
                      prefetch={false}
                      href="/category/kamu-politikalari"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsYayinlarOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {dict?.publications.items?.publication1}
                        </p>
                      </div>
                    </Link>
                    <Link
                      prefetch={false}
                      href="/category/yonetim-tasarimi"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsYayinlarOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {dict?.publications.items?.publication2}
                        </p>
                      </div>
                    </Link>
                    <Link
                      prefetch={false}
                      href={
                        "/category/kuresel-politika-ve-uluslararasi-iliskiler"
                      }
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsYayinlarOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm text-wrap">
                          {dict?.publications.items?.publication3}
                        </p>
                      </div>
                    </Link>
                    <Link
                      prefetch={false}
                      href={"/category/ekonomi-ve-kalkinma"}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsYayinlarOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm text-wrap">
                          {dict?.publications.items?.publication4}
                        </p>
                      </div>
                    </Link>
                    <Link
                      prefetch={false}
                      href={"/category/teknoloji-ve-inovasyon"}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsYayinlarOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm text-wrap">
                          {dict?.publications.items?.publication5}
                        </p>
                      </div>
                    </Link>
                    <Link
                      prefetch={false}
                      href={"/category/goc"}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsYayinlarOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {dict?.publications.items?.publication6}
                        </p>
                      </div>
                    </Link>
                    <Link
                      prefetch={false}
                      href={"/category/savunma-ve-guvenlik"}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsYayinlarOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {dict?.publications.items?.publication7}
                        </p>
                      </div>
                    </Link>
                    <Link
                      prefetch={false}
                      href={"/category/kultur-ve-sanat"}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsYayinlarOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {dict?.publications.items?.publication9}
                        </p>
                      </div>
                    </Link>

                    <Link
                      prefetch={false}
                      href={"/category/gorus-yazilari"}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsYayinlarOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {dict?.publications.items?.publication11}
                        </p>
                      </div>
                    </Link>
                    <Link
                      prefetch={false}
                      href="/category/roportajlar"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsYayinlarOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {dict?.publications.items?.publication12}
                        </p>
                      </div>
                    </Link>
                    <Link
                      prefetch={false}
                      href={"/category/kitap-incelemeleri"}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsYayinlarOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {dict?.publications.items?.publication10}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                prefetch={false}
                href={"/ozel-dosyalar"}
                className="px-4 py-2 rounded-xl text-white hover:text-blue-300 hover:bg-white/10 transition-all duration-300 font-medium text-sm relative group"
              >
                {dict?.specialfiles}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
              </Link>

              <Link
                prefetch={false}
                href={"/danismanlik"}
                className="px-4 py-2 rounded-xl text-white hover:text-blue-300 hover:bg-white/10 transition-all duration-300 font-medium text-sm relative group"
              >
                {dict?.consulting}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
              </Link>

              <Link
                prefetch={false}
                href={"/kapdem-dijital"}
                className="px-4 py-2 rounded-xl text-white hover:text-blue-300 hover:bg-white/10 transition-all duration-300 font-medium text-sm relative group"
              >
                {dict?.digital}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
              </Link>
              <Link
                prefetch={false}
                href={"/etkinlikler"}
                className="px-4 py-2 rounded-xl text-white hover:text-blue-300 hover:bg-white/10 transition-all duration-300 font-medium text-sm relative group"
              >
                {dict?.events}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
              </Link>

              <Link
                prefetch={false}
                href={"/membership"}
                className="px-4 py-2 rounded-xl text-white hover:text-blue-300 hover:bg-white/10 transition-all duration-300 font-medium text-sm relative group"
              >
                {dict?.membership}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
              </Link>
              {/* Interviews moved into the Publications dropdown per request */}

              {/* Dropdown Menu */}
              <div className="relative" ref={hakkimizdaDropdownRef}>
                <button
                  onClick={toggleHakkimizdaDropdown}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white hover:text-blue-300 hover:bg-white/10 transition-all duration-300 font-medium text-sm focus:outline-none"
                >
                  {dict?.aboutus?.title}
                  <FaChevronDown
                    className={`w-3 h-3 transition-transform duration-300 ${
                      isHakkimizdaOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl transition-all duration-300 ${
                    isHakkimizdaOpen
                      ? "opacity-100 visible transform translate-y-0"
                      : "opacity-0 invisible transform -translate-y-3"
                  }`}
                >
                  <div className="p-2">
                    <Link
                      prefetch={false}
                      href="/ana-kadro"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsHakkimizdaOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {dict?.aboutus?.items?.item1}
                        </p>
                        <p className="text-xs text-gray-500">
                          {dict?.aboutus?.items?.item1Sub}
                        </p>
                      </div>
                    </Link>
                    <Link
                      prefetch={false}
                      href="/authors"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsHakkimizdaOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {dict?.aboutus?.items?.authors}
                        </p>
                        <p className="text-xs text-gray-500">
                          {dict?.aboutus?.items?.authors}
                        </p>
                      </div>
                    </Link>
                    <Link
                      prefetch={false}
                      href="/about-us"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsHakkimizdaOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {dict?.aboutus?.items?.item2}
                        </p>
                        <p className="text-xs text-gray-500">
                          {dict?.aboutus?.items?.item2Sub}
                        </p>
                      </div>
                    </Link>

                    <Link
                      prefetch={false}
                      href={"/contact"}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsHakkimizdaOpen(false)}
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {dict?.aboutus?.items?.item3}
                        </p>
                        <p className="text-xs text-gray-500">
                          {dict?.aboutus?.items?.item3Sub}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <FiSearch className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* User Menu - Desktop only */}
              <div className="hidden lg:block">
                <UserMenu dict={dict} />
              </div>

              <Link
                prefetch={false}
                href="/donate"
                className="text-white sm:flex items-center text-nowrap gap-2 px-5 py-2.5 bg-red-900 hover:bg-red-800 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium text-sm hidden lg:flex"
              >
                {dict?.donate}
              </Link>

              {/* Desktop LocaleSwitcher */}
              {/* <div className="hidden lg:block">
                <LocaleSwitcher locale={lang} />
              </div> */}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                aria-label="Mobil Menü"
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-5 h-5 text-white" />
                ) : (
                  <FiMenu className="w-5 h-5 text-white" />
                )}
              </button>
              {/* Modern Mobile Menu Overlay */}
              {isMobileMenuOpen &&
                createPortal(
                  <div className="fixed inset-0 z-[100] lg:hidden">
                    {/* Animated Overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80 backdrop-blur-md transition-all duration-500 ease-out"
                      onClick={closeMobileMenu}
                      style={{ cursor: "pointer" }}
                    ></div>

                    {/* Modern Mobile Menu Container */}
                    <div
                      className="absolute right-0 z-[101] w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden mobile-panel-enter"
                      style={{
                        top: NAVBAR_TOPBAR_HEIGHT,
                        height: `calc(100% - ${NAVBAR_TOPBAR_HEIGHT}px)`,
                        boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.3)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Modern Header with Animated Elements */}
                      <div className="relative overflow-hidden">
                        <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-[#002C54] rounded-xl flex items-center justify-center shadow-md transition-transform duration-300">
                                <Image
                                  src="/images/onlylogo.png"
                                  alt="KAPDEM Logo"
                                  width={48}
                                  height={48}
                                />
                              </div>
                            </div>
                            <div>
                              <h5 className="text-xl font-bold text-[#002C54]">
                                KAPDEM
                              </h5>
                            </div>
                          </div>

                          <button
                            onClick={closeMobileMenu}
                            className="relative group p-3 bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-200 shadow-sm transition-all duration-300"
                            aria-label="Menüyü Kapat"
                          >
                            <FiX className="w-6 h-6 text-gray-700 group-hover:rotate-90 transition-transform duration-300" />
                          </button>
                        </div>
                      </div>
                      {/* Modern Content Area */}
                      <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4 min-h-0 mobile-menu-scroll mobile-menu-container bg-gray-50 whitespace-normal">
                        {/* User Section */}
                        <div className="mb-6">
                          <UserMenu dict={dict} isMobile={true} />
                        </div>

                        {/* Donate Button - Modern Style */}
                        <div className="mb-6">{renderMobileDonateButton()}</div>

                        {/* Modern Navigation Cards */}
                        <nav className="space-y-2 pb-8 mb-12">
                          {/* Home Link - Featured */}
                          <Link
                            prefetch={false}
                            href="/"
                            className="group flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all duration-200"
                            onClick={closeMobileMenu}
                          >
                            <div className="w-8 h-8 bg-[#002C54] rounded-lg flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <span className="font-medium text-gray-900">
                                {dict?.homePage}
                              </span>
                            </div>
                            <svg
                              className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>{" "}
                          {/* Publications Dropdown - Modern */}
                          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <button
                              onClick={() =>
                                setIsMobileYayinlarOpen(!isMobileYayinlarOpen)
                              }
                              className="w-full group flex items-center space-x-3 p-3 hover:bg-gray-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 bg-[#002C54] rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                                </svg>
                              </div>
                              <div className="flex-1 text-left">
                                <span className="font-medium text-gray-900">
                                  {dict?.publications?.title}
                                </span>
                              </div>
                              <FaChevronDown
                                className={`w-4 h-4 text-gray-400 transition-all duration-300 ${
                                  isMobileYayinlarOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isMobileYayinlarOpen && (
                              <div className="px-3 pb-3 space-y-1 bg-gray-50">
                                <Link
                                  prefetch={false}
                                  href="/category/kamu-politikalari"
                                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="font-medium">
                                    {dict?.publications?.items?.publication1}
                                  </span>
                                </Link>
                                <Link
                                  prefetch={false}
                                  href="/category/yonetim-tasarimi"
                                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="font-medium">
                                    {dict?.publications?.items?.publication2}
                                  </span>
                                </Link>
                                <Link
                                  prefetch={false}
                                  href="/category/kuresel-politika-ve-uluslararasi-iliskiler"
                                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="font-medium">
                                    {dict?.publications?.items?.publication3}
                                  </span>
                                </Link>
                                <Link
                                  prefetch={false}
                                  href="/category/ekonomi-ve-kalkinma"
                                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="font-medium">
                                    {dict?.publications?.items?.publication4}
                                  </span>
                                </Link>
                                <Link
                                  prefetch={false}
                                  href="/category/teknoloji-ve-inovasyon"
                                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="font-medium">
                                    {dict?.publications?.items?.publication5}
                                  </span>
                                </Link>
                                <Link
                                  prefetch={false}
                                  href="/category/goc"
                                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="font-medium">
                                    {dict?.publications?.items?.publication6}
                                  </span>
                                </Link>
                                <Link
                                  prefetch={false}
                                  href="/category/savunma-ve-guvenlik"
                                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="font-medium">
                                    {dict?.publications?.items?.publication7}
                                  </span>
                                </Link>
                                <Link
                                  prefetch={false}
                                  href="/category/kultur-ve-sanat"
                                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="font-medium">
                                    {dict?.publications?.items?.publication9}
                                  </span>
                                </Link>

                                <Link
                                  prefetch={false}
                                  href="/category/gorus-yazilari"
                                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="font-medium">
                                    {dict?.publications?.items?.publication11}
                                  </span>
                                </Link>
                                <Link
                                  prefetch={false}
                                  href="/roportajlar"
                                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="font-medium">
                                    {dict?.interviews}
                                  </span>
                                </Link>
                                <Link
                                  prefetch={false}
                                  href="/category/kitap-incelemeleri"
                                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="font-medium">
                                    {dict?.publications?.items?.publication10}
                                  </span>
                                </Link>
                              </div>
                            )}
                          </div>
                          {/* Special Files */}
                          <Link
                            prefetch={false}
                            href="/ozel-dosyalar"
                            className="group flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all duration-200"
                            onClick={closeMobileMenu}
                          >
                            <div className="w-8 h-8 bg-[#002C54] rounded-lg flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <span className="font-medium text-gray-900">
                                {dict?.specialfiles}
                              </span>
                            </div>
                            <svg
                              className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                          {/* Consulting */}
                          <Link
                            prefetch={false}
                            href="/danismanlik"
                            className="group flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all duration-200"
                            onClick={closeMobileMenu}
                          >
                            <div className="w-8 h-8 bg-[#002C54] rounded-lg flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12,2A3,3 0 0,1 15,5A3,3 0 0,1 12,8A3,3 0 0,1 9,5A3,3 0 0,1 12,2M12,9C14.67,9 20,10.34 20,13V16H4V13C4,10.34 9.33,9 12,9M12,10.9C9,10.9 5.9,12.36 5.9,13V14.1H18.1V13C18.1,12.36 15,10.9 12,10.9Z" />
                              </svg>
                            </div>
                            <span className="flex-1 font-medium text-gray-900">
                              {dict?.consulting}
                            </span>
                            <svg
                              className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                          {/* Digital KAPDEM */}
                          <Link
                            prefetch={false}
                            href="/kapdem-dijital"
                            className="group flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all duration-200"
                            onClick={closeMobileMenu}
                          >
                            <div className="w-8 h-8 bg-[#002C54] rounded-lg flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
                              </svg>
                            </div>
                            <span className="flex-1 font-medium text-gray-900">
                              {dict?.digital}
                            </span>
                            <svg
                              className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                          {/* Events */}
                          <Link
                            prefetch={false}
                            href="/etkinlikler"
                            className="group flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all duration-200"
                            onClick={closeMobileMenu}
                          >
                            <div className="w-8 h-8 bg-[#002C54] rounded-lg flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19M12,9V17L16,13L12,9Z" />
                              </svg>
                            </div>
                            <span className="flex-1 font-medium text-gray-900">
                              {dict?.events}
                            </span>
                            <svg
                              className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                          {/* Membership */}
                          <Link
                            prefetch={false}
                            href="/membership"
                            className="group flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all duration-200"
                            onClick={closeMobileMenu}
                          >
                            <div className="w-8 h-8 bg-[#002C54] rounded-lg flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M16,4C18.11,4 19.8,5.69 19.8,7.8C19.8,9.91 18.11,11.6 16,11.6C13.89,11.6 12.2,9.91 12.2,7.8C12.2,5.69 13.89,4 16,4M16,13.4C18.76,13.4 24,14.77 24,17.5V20H8V17.5C8,14.77 13.24,13.4 16,13.4M8.5,10H5V8.5H8.5V5H10V8.5H13.5V10H10V13.5H8.5V10Z" />
                              </svg>
                            </div>
                            <span className="flex-1 font-medium text-gray-900">
                              {dict?.membership}
                            </span>
                            <svg
                              className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                          {/* Send Paper */}
                          <Link
                            prefetch={false}
                            href="/sendpaper"
                            className="group flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all duration-200"
                            onClick={closeMobileMenu}
                          >
                            <div className="w-8 h-8 bg-[#002C54] rounded-lg flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M2,3H22C23.05,3 24,3.95 24,5V19C24,20.05 23.05,21 22,21H2C0.95,21 0,20.05 0,19V5C0,3.95 0.95,3 2,3M22,6L12,13L2,6V19H22V6Z" />
                              </svg>
                            </div>
                            <span className="flex-1 font-medium text-gray-900">
                              {dict.sendPaper}
                            </span>
                            <svg
                              className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                          {/* Section Divider */}
                          <div className="my-6 border-t border-gray-200"></div>
                          {/* About Us Dropdown */}
                          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <button
                              onClick={() =>
                                setIsMobileHakkimizdaOpen(
                                  !isMobileHakkimizdaOpen,
                                )
                              }
                              className="w-full group flex items-center space-x-3 p-3 hover:bg-gray-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 bg-[#002C54] rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                                </svg>
                              </div>
                              <span className="flex-1 text-left font-medium text-gray-900">
                                {dict.aboutus.title}
                              </span>
                              <FaChevronDown
                                className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-all duration-200 ${
                                  isMobileHakkimizdaOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isMobileHakkimizdaOpen && (
                              <div className="px-3 pb-3 pt-1 space-y-1 bg-gray-50">
                                <Link
                                  prefetch={false}
                                  href="/ana-kadro"
                                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-all duration-200 group"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="text-sm font-medium">
                                    {dict?.aboutus?.items?.item1}
                                  </span>
                                </Link>

                                <Link
                                  prefetch={false}
                                  href="/authors"
                                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-all duration-200 group"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="text-sm font-medium">
                                    {dict?.aboutus?.items?.authors}
                                  </span>
                                </Link>

                                <Link
                                  prefetch={false}
                                  href="/about-us"
                                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-all duration-200 group"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="text-sm font-medium">
                                    {dict?.aboutus?.items?.item2}
                                  </span>
                                </Link>

                                <Link
                                  prefetch={false}
                                  href="/contact"
                                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-all duration-200 group"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 bg-[#002C54] rounded-full"></div>
                                  <span className="text-sm font-medium">
                                    {dict?.aboutus?.items?.item3}
                                  </span>
                                </Link>
                              </div>
                            )}
                          </div>
                          <div className="mt-6 pt-6 border-t border-gray-200 pb-6">
                            <div className="flex justify-center">
                              <LocaleSwitcher locale={lang} />
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <button
                              onClick={() => {
                                setIsSearchModalOpen(true);
                                closeMobileMenu();
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 text-sm font-medium text-gray-600 shadow-sm"
                            >
                              <FiSearch className="w-4 h-4 text-gray-400" />
                              <span>{dict.fastsearch}</span>
                            </button>
                          </div>
                        </nav>

                        {/* Search Section */}

                        {/* Language Switcher */}
                      </div>
                    </div>
                  </div>,
                  document.body,
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        dict={dict}
        lang={lang}
      />
    </>
  );
};

export default Navbar;
