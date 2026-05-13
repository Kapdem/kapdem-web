"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaGlobe,
  FaArrowLeft,
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface Education {
  degree: string;
  field: string;
  institution: string;
  year: string;
  isOngoing: boolean;
  _id: string;
}

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  email?: string;
  website?: string;
}

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  photo: string;
  about: string;
  education: Education[];
  isActive: boolean;
  socialLinks: SocialLinks;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  member: TeamMember;
  dict: any;
  lang: string;
}

export default function TeamMemberDetail({ member, dict, lang }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto max-w-7xl px-4 pt-8 relative z-10">
        <Link
          href={`/${lang}/ana-kadro`}
          className="group inline-flex items-center gap-2 text-[#002C54] hover:text-blue-600 transition-all duration-300 font-semibold text-sm backdrop-blur-sm bg-white/80 px-4 py-2 rounded-full shadow-sm hover:shadow-md"
        >
          <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
          {dict?.teamMemberDetail?.backToTeam || "Ana Kadroya Dön"}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-8 md:py-16 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Profile Image & Social */}
            <div className="lg:col-span-4">
              <div className="sticky top-8">
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100/50 backdrop-blur-sm">
                  {/* Profile Image */}
                  <div className="relative mb-6 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <Image
                      width={400}
                      height={400}
                      src={member.photo}
                      alt={member.fullName}
                      className="relative w-full aspect-square rounded-3xl object-cover border-4 border-white shadow-xl"
                      priority
                    />
                    <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-gradient-to-br from-[#002C54] to-blue-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                      <span className="text-white text-xl">✓</span>
                    </div>
                  </div>

                  {/* Name and Title - Mobile */}
                  <div className="lg:hidden mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                      {member.fullName}
                    </h1>
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#002C54] to-blue-600 rounded-full text-white font-semibold text-base shadow-lg">
                      {member.title}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    {member.socialLinks.email && (
                      <Link
                        href={`mailto:${member.socialLinks.email}`}
                        className="group flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-red-50 to-red-100 hover:from-red-500 hover:to-red-600 text-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
                      >
                        <FaEnvelope className="text-lg" />
                        <span className="text-sm">Email</span>
                      </Link>
                    )}
                    {member.socialLinks.linkedin && (
                      <Link
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        className="group flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-[#0077B5] hover:to-[#005885] text-[#0077B5] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
                      >
                        <FaLinkedin className="text-lg" />
                        <span className="text-sm">LinkedIn</span>
                      </Link>
                    )}
                    {member.socialLinks.twitter && (
                      <Link
                        href={member.socialLinks.twitter}
                        target="_blank"
                        className="group flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 hover:from-[#1DA1F2] hover:to-[#0d8bd9] text-[#1DA1F2] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
                      >
                        <FaTwitter className="text-lg" />
                        <span className="text-sm">Twitter</span>
                      </Link>
                    )}
                    {member.socialLinks.website && (
                      <Link
                        href={member.socialLinks.website}
                        target="_blank"
                        className="group flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-700 hover:to-gray-900 text-gray-700 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
                      >
                        <FaGlobe className="text-lg" />
                        <span className="text-sm">Website</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {/* Name and Title - Desktop */}
                <div className="hidden lg:block bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50 backdrop-blur-sm">
                  <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    {member.fullName}
                  </h1>
                  <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#002C54] to-blue-600 rounded-full text-white font-semibold text-lg shadow-lg">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    {member.title}
                  </div>
                </div>

                {/* About Section */}
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl">📝</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {dict?.teamMemberDetail?.about || "Hakkında"}
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {member.about.split("\n").map((paragraph, index) =>
                      paragraph.trim() ? (
                        <p key={index} className="mb-4 text-justify">
                          {paragraph}
                        </p>
                      ) : null
                    )}
                  </div>
                </div>

                {/* Education Section */}
                {member.education && member.education.length > 0 && (
                  <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                        <FaGraduationCap className="text-white text-xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {dict?.teamMemberDetail?.education || "Eğitim"}
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {member.education.map((edu, index) => (
                        <div
                          key={edu._id}
                          className="group relative bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-6 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 hover:shadow-lg"
                        >
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-semibold text-gray-600 shadow-sm border border-gray-200">
                              <FaCalendarAlt className="text-blue-500" />
                              {edu.isOngoing
                                ? `${edu.year} - ${
                                    dict?.teamMemberDetail?.ongoing ||
                                    "Devam Ediyor"
                                  }`
                                : edu.year}
                            </span>
                          </div>
                          <div className="pr-32">
                            <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-blue-600 transition-colors">
                              {edu.degree}
                            </h3>
                            <p className="text-[#002C54] font-semibold mb-2 text-lg">
                              {edu.field}
                            </p>
                            <p className="text-gray-600 flex items-center gap-2 text-base">
                              <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                              {edu.institution}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002C54] via-blue-700 to-indigo-600"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6 ring-4 ring-white/30">
              <FaEnvelope className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {dict?.teamMemberDetail?.contact?.title || "İletişime Geçin"}
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
              {dict?.teamMemberDetail?.contact?.description?.replace(
                "{name}",
                member.firstName
              ) ||
                `${member.firstName} ile doğrudan iletişim kurmak için aşağıdaki bağlantıları kullanabilirsiniz.`}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            {member.socialLinks.email && (
              <Link
                href={`mailto:${member.socialLinks.email}`}
                className="group flex items-center gap-3 bg-white text-[#002C54] px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-white" />
                </div>
                <span className="text-lg">
                  {dict?.teamMemberDetail?.contact?.sendEmail ||
                    "E-posta Gönder"}
                </span>
              </Link>
            )}
            {member.socialLinks.linkedin && (
              <Link
                href={member.socialLinks.linkedin}
                target="_blank"
                className="group flex items-center gap-3 bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-[#0077B5] transition-all duration-300 backdrop-blur-sm shadow-2xl hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0077B5] to-[#005885] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform group-hover:bg-white">
                  <FaLinkedin className="text-white group-hover:text-[#0077B5]" />
                </div>
                <span className="text-lg">
                  {dict?.teamMemberDetail?.contact?.linkedin || "LinkedIn"}
                </span>
              </Link>
            )}
            {member.socialLinks.twitter && (
              <Link
                href={member.socialLinks.twitter}
                target="_blank"
                className="group flex items-center gap-3 bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-[#1DA1F2] transition-all duration-300 backdrop-blur-sm shadow-2xl hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0d8bd9] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform group-hover:bg-white">
                  <FaTwitter className="text-white group-hover:text-[#1DA1F2]" />
                </div>
                <span className="text-lg">Twitter</span>
              </Link>
            )}
            {member.socialLinks.website && (
              <Link
                href={member.socialLinks.website}
                target="_blank"
                className="group flex items-center gap-3 bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm shadow-2xl hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform group-hover:bg-white">
                  <FaGlobe className="text-white group-hover:text-gray-900" />
                </div>
                <span className="text-lg">Website</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
