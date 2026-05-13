"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaSquareXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { usePathname } from "next/navigation";
import FooterMailSubscription from "./FooterMailSubscription";

export default function Footer({ dict }) {
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
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/live") ||
    pathname.startsWith("/en/live")
  ) {
    return null;
  }

  return (
    <footer className="bg-zinc-800" aria-labelledby="footer-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-6 pt-8 sm:pb-8 sm:pt-12 lg:pb-10 lg:pt-16 xl:pb-12 xl:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* 1. Kolon: Logo ve açıklama */}
          <div className="flex flex-col gap-4">
            <Image
              className="w-48 h-auto max-w-full"
              src={"/images/kapdem-logo-2.png"}
              alt="KAPDEM Logo"
              width={1920}
              height={1080}
            />
            <p className="text-sm text-white text-justify ">
              {dict?.footer?.text}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 mt-2">
              <Link
                prefetch={false}
                href="https://www.linkedin.com/company/kapdem/"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="LinkedIn"
                target="_blank"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </Link>
              <Link
                prefetch={false}
                href="https://x.com/kapdemorg"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="X (Twitter)"
                target="_blank"
              >
                <FaSquareXTwitter className="w-5 h-5" />
              </Link>
              <Link
                prefetch={false}
                href="https://www.instagram.com/kapdemorg/"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="Instagram"
                target="_blank"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link
                prefetch={false}
                href="https://www.youtube.com/channel/UCpWaTCuKLX2wEScGiEyntmQ"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="YouTube"
                target="_blank"
              >
                <FaYoutube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* 2. Kolon: Kategoriler */}
          <div className="mt-6 md:mt-0 md:ml-12">
            <h3 className="text-base font-semibold text-white mb-4 text-start">
              {dict?.footer?.additionalText}
            </h3>
            <ul className="space-y-2 mx-auto w-full flex flex-col text-justify ">
              <li>
                <Link
                  prefetch={false}
                  href="/category/kamu-politikalari"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {dict?.footer?.publication1}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/category/yonetim-tasarimi"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {dict?.footer?.publication3}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/category/kuresel-politika-ve-uluslararasi-iliskiler"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {dict?.footer?.publication4}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/category/ekonomi-ve-kalkinma"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {dict?.footer?.publication6}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/category/teknoloji-ve-inovasyon"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {dict?.footer?.publication7}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/category/goc"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {dict?.footer?.publication8}
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/category/savunma-ve-guvenlik"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {dict?.footer?.publication9}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/category/kultur-ve-sanat"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {dict?.footer?.publication11}
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/category/gorus-yazilari"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {dict?.footer?.publication2}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/category/roportajlar"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {dict?.footer?.publication13}
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/category/kitap-incelemeleri"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {dict?.footer?.publication12}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Kolon: Mail Subscription */}
          <div className="mt-8 md:mt-0 flex items-center justify-center">
            <FooterMailSubscription dict={dict} />
          </div>
        </div>
      </div>
    </footer>
  );
}
