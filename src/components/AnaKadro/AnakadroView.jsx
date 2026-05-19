"use client";
import React, { useState, useEffect } from "react";
import MainCastHero from "../MainCast/MainCastHero";
import SearchAndFilter from "../MainCast/SearchAndFilter";
import TeamMembersCard from "../MainCast/TeamMembersCard";
import JoinUsSection from "../MainCast/JoinUsSection";

export default function AnakadroView({ res, dict, lang }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const clearFilters = () => {
    setSearchTerm("");
    setFilterRole("all");
  };

  // API'den gelen data'yı transform et
  const transformTeamMember = (member) => ({
    username: member.slug,
    name: member.fullName,
    role: member.title,
    bio: member.education?.[0]
      ? `${member.education[0].degree}, ${member.education[0].institution}`
      : "",
    fullBio: member.about,
    education: member.education?.[0]
      ? `${member.education[0].degree}, ${member.education[0].institution}`
      : "",
    achievements:
      member.education?.map((edu) => `${edu.degree} - ${edu.institution}`) ||
      [],
    image: member.photo || "/images/onlologo.png",
    social: {
      linkedin: member.socialLinks?.linkedin || "#",
      twitter: member.socialLinks?.twitter || "#",
      email: member.socialLinks?.email || "#",
      website: member.socialLinks?.website || "#",
    },
  });

  // API'den gelen data'yı transform et
  const transformedMembers = Array.isArray(res)
    ? res.map(transformTeamMember)
    : res
      ? [transformTeamMember(res)]
      : [];

  const teamMembers = transformedMembers;

  // Dinamik roller - transform edilmiş data'dan unique roller
  const uniqueRoles = [...new Set(teamMembers.map((member) => member.role))];
  const roles = ["all", ...uniqueRoles];

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <section className="relative mt-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#002C54]/10 to-transparent"></div>
        <div className="container mx-auto max-w-full relative z-10 space-y-12">
          <MainCastHero dict={dict} />
          <SearchAndFilter
            clearFilters={clearFilters}
            filterRole={filterRole}
            roles={roles}
            searchTerm={searchTerm}
            setFilterRole={setFilterRole}
            setSearchTerm={setSearchTerm}
            filteredMembers={filteredMembers}
            dict={dict}
          />
        </div>
      </section>

      <TeamMembersCard
        isLoading={isLoading}
        filteredMembers={filteredMembers}
        lang={lang}
      />

      <JoinUsSection />
    </div>
  );
}
