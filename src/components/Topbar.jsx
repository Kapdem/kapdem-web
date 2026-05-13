import React from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaEnvelope,
  FaXTwitter,
  FaBluesky,
  FaFacebook,
  FaYoutube,
  FaSpotify,
  FaLinkedin,
} from "react-icons/fa6";
import LocaleSwitcher from "./LocaleSwicher";

const Topbar = ({ dict, params }) => {
  return (
    <div className="w-full bg-[#002C54] text-white text-xs py-2 fixed top-0 left-0 z-[60] border-b border-blue-900/30 md:px-44 px-4 flex justify-end items-center">
      <div className="flex items-center gap-4">
        <div className="hidden lg:block">
          <LocaleSwitcher locale={params?.lang} />
        </div>
        <Link
          href="mailto:info@kapdem.org"
          className="hover:text-blue-300 transition"
          aria-label="Mail"
        >
          <FaEnvelope className="inline-block w-4 h-4" />
        </Link>

        <Link
          href="https://twitter.com/kapdemorg"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-300 transition"
          aria-label="Twitter"
        >
          <FaXTwitter className="inline-block w-4 h-4" />
        </Link>
        <Link
          href="https://instagram.com/kapdemorg"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-300 transition"
          aria-label="Instagram"
        >
          <FaInstagram className="inline-block w-4 h-4" />
        </Link>

        <Link
          href="https://bsky.app/profile/kapdem.bsky.social"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-300 transition"
          aria-label="Instagram"
        >
          <FaBluesky className="inline-block w-4 h-4" />
        </Link>

        <Link
          href="https://www.youtube.com/@KAPDEM"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-300 transition"
          aria-label="Instagram"
        >
          <FaYoutube className="inline-block w-4 h-4" />
        </Link>

        <Link
          href="https://open.spotify.com/show/4olEgVW8ojBVtNyXmWFh2a?si=ef5442968cab4f93&nd=1&dlsi=d410f626fc9e4cf7"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-300 transition"
          aria-label="Instagram"
        >
          <FaSpotify className="inline-block w-4 h-4" />
        </Link>
        <Link
          href="https://www.linkedin.com/company/kapdem/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-300 transition"
          aria-label="Instagram"
        >
          <FaLinkedin className="inline-block w-4 h-4" />
        </Link>

        <Link
          href={"/sendpaper"}
          className="rounded-xl text-white hover:text-blue-300 hover:bg-white/10 transition-all duration-300 font-medium text-xs relative group border border-blue-300 px-3 py-1 text-nowrap"
        >
          {dict.sendPaper}
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
