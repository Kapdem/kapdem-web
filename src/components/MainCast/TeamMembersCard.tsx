import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";

type Props = {
  readonly filteredMembers: any[];
  isLoading?: boolean;
  lang: string;
};

export default function TeamMembersCard({
  filteredMembers,
  isLoading = false,
  lang,
}: Props) {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-2 sm:px-4">
      <div className="container mx-auto max-w-5xl md:max-w-7xl">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Sonuç Bulunamadı
            </h3>
            <p className="text-gray-600">
              Arama kriterlerinize uygun üye bulunamadı.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredMembers.map((member, index) => (
              <Link
                key={member.username}
                href={`/${lang}/ana-kadro/${member.username}`}
                className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer w-full text-left"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isLoading
                    ? "none"
                    : "fadeInUp 0.6s ease-out forwards",
                }}
                aria-label={`${member.name} profilini görüntüle`}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#002C54]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative p-4 sm:p-6 md:p-8">
                  {/* Profile Image */}
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="relative">
                      <Image
                        width={160}
                        height={160}
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl object-cover object-center border-4 border-gray-100 shadow-lg group-hover:border-[#002C54] transition-all duration-300 group-hover:scale-105"
                      />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-[#002C54] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm">✓</span>
                      </div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#002C54] transition-colors">
                      {member.name}
                    </h3>
                    <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-[#002C54]/10 to-blue-100 rounded-full text-[#002C54] text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                      {member.role}
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {member.education}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-2 sm:gap-4">
                    {member.social.twitter && (
                      <Link
                        href={member.social.twitter}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all duration-200 transform hover:scale-110"
                      >
                        <FaTwitter className="text-lg" />
                      </Link>
                    )}
                    {member.social.linkedin && (
                      <Link
                        href={member.social.linkedin}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all duration-200 transform hover:scale-110"
                      >
                        <FaLinkedin className="text-lg" />
                      </Link>
                    )}
                    {member.social.github && (
                      <Link
                        href={member.social.github}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200 transform hover:scale-110"
                      >
                        <FiGithub className="text-lg" />
                      </Link>
                    )}
                  </div>

                  {/* Hover Effect Arrow */}
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#002C54] flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
