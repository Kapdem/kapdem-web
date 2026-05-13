import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function UserProfileCard({ post }) {
  const author = post?.author;

  if (!author) {
    return null; // Don't render if no author data
  }

  const authorName = `${author.firstName || ""} ${
    author.lastName || ""
  }`.trim();
  const authorSlug = author.username || author.slug || "default";
  const authorPhoto =
    author.profilePicture && author.profilePicture.trim() !== ""
      ? author.profilePicture
      : "/images/onlylogo.png";
  const authorTitle = author.title || author.title || "";
  const authorInstitution = author.institution || "";
  const authorBio = author.profession || author.profession || "";
  const socialMediaLinks = author.socialMediaLinks || [];

  const socialLinks = Array.isArray(author.socialMediaLinks)
    ? author.socialMediaLinks.reduce((acc, link) => {
        if (link.platform && link.url) {
          acc[link.platform.toLowerCase()] = link.url;
        }
        return acc;
      }, {})
    : author.socialMediaLinks || {};

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-9">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col items-center gap-4">
        <div className="relative -mt-16 mb-2">
          <Image
            width={192}
            height={192}
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
            src={
              authorPhoto && authorPhoto.trim() !== ""
                ? authorPhoto
                : "/images/onlylogo.png"
            }
            alt={`${authorName} Fotoğrafı`}
          />
        </div>

        {/* <Link
          href={`/member/${authorSlug}`}
          className="text-2xl font-bold text-gray-900 hover:text-[#b61e24] transition"
        >
          {authorName}
        </Link> */}
        <p className="text-2xl font-bold text-gray-900 hover:text-[#b61e24] transition">
          {authorName}
        </p>
        <p className="text-sm text-[#b61e24] font-medium mb-1">{authorTitle}</p>
        <p className="text-gray-600 text-sm mb-2 text-center">
          {authorInstitution}
        </p>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex items-start gap-4">
        <div className="flex-shrink-0">
          <Image
            width={96}
            height={96}
            className="w-16 h-16 object-cover rounded-full border-2 border-gray-200"
            src={authorPhoto}
            alt={`${authorName} Fotoğrafı`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <Link
            href={`/member/${authorSlug}`}
            className="text-xl font-bold text-blue-600 hover:text-blue-800 transition block mb-1"
          >
            {authorName}
          </Link>
          <p className="text-sm text-gray-700 font-medium mb-1">
            {authorTitle}
          </p>
          <p className="text-xs text-gray-600">{authorInstitution}</p>

          {authorBio && (
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              {authorBio.length > 80 ? (
                <span>
                  {authorBio.substring(0, 80)}...
                  <Link
                    href={`/member/${authorSlug}`}
                    className="text-[#b61e24] hover:underline ml-1"
                  >
                    Devamını oku
                  </Link>
                </span>
              ) : (
                authorBio
              )}
            </p>
          )}
        </div>
      </div>

      {/* Social Media Links - Mobile */}
      {socialMediaLinks.length > 0 && (
        <div className="md:hidden flex gap-2 mt-3 justify-center">
          {socialMediaLinks.map((link) => (
            <Link
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-[#b61e24] rounded-full p-2 transition"
            >
              {link.platform === "twitter" && (
                <FaXTwitter className="w-4 h-4" />
              )}
              {link.platform === "instagram" && (
                <FaInstagram className="w-4 h-4" />
              )}
              {link.platform === "facebook" && (
                <FaFacebookF className="w-4 h-4" />
              )}
              {link.platform === "linkedin" && (
                <FaLinkedin className="w-4 h-4" />
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Social Media Links - Desktop Only */}
      {(socialLinks.twitter ||
        socialLinks.instagram ||
        socialLinks.facebook ||
        socialLinks.linkedin) && (
        <div className="md:hidden flex gap-2 mt-3 justify-center">
          {socialLinks.twitter && (
            <Link
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-[#b61e24] rounded-full p-2 transition"
            >
              <FaXTwitter className="w-4 h-4" />
            </Link>
          )}
          {socialLinks.instagram && (
            <Link
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-[#b61e24] rounded-full p-2 transition"
            >
              <FaInstagram className="w-4 h-4" />
            </Link>
          )}
          {socialLinks.facebook && (
            <Link
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-[#b61e24] rounded-full p-2 transition"
            >
              <FaFacebookF className="w-4 h-4" />
            </Link>
          )}
          {socialLinks.linkedin && (
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-[#b61e24] rounded-full p-2 transition"
            >
              <FaLinkedin className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}

      {/* Social Media Links - Desktop Only */}
      {(socialLinks.twitter ||
        socialLinks.instagram ||
        socialLinks.facebook ||
        socialLinks.linkedin) && (
        <div className="hidden md:flex gap-3 mt-2 justify-center">
          {socialLinks.twitter && (
            <Link
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-[#b61e24] rounded-full p-2 transition"
            >
              <FaXTwitter className="w-5 h-5" />
            </Link>
          )}
          {socialLinks.instagram && (
            <Link
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-[#b61e24] rounded-full p-2 transition"
            >
              <FaInstagram className="w-5 h-5" />
            </Link>
          )}
          {socialLinks.facebook && (
            <Link
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-[#b61e24] rounded-full p-2 transition"
            >
              <FaFacebookF className="w-5 h-5" />
            </Link>
          )}
          {socialLinks.linkedin && (
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-[#b61e24] rounded-full p-2 transition"
            >
              <FaLinkedin className="w-5 h-5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
