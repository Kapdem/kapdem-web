import React from "react";
import Image from "next/image";
import { Briefcase, Building2 } from "lucide-react";

interface Author {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  postCount: number;
  title?: string;
  profession?: string;
  institution?: string;
}

interface AuthorCardProps {
  author: Author;
  lang: string;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const authorName = `${author?.firstName} ${author?.lastName}`;
  const profilePicture = author?.profilePicture || "/images/onlylogo.png";

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#002c54]/30 hover:-translate-y-1">
      <div className="p-6 flex flex-col items-center text-center">
        {/* Profile Picture */}
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-[#002c54]/30 transition-colors duration-300">
            <Image
              src={profilePicture}
              alt={authorName}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Author Info */}
        <div className="space-y-2 mb-2">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#002c54] transition-colors">
            {authorName}
          </h3>

          {author?.title && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#002c54]/5 border border-[#002c54]/10">
              <span className="text-sm font-semibold text-[#002c54]">
                {author.title}
              </span>
            </div>
          )}

          {author?.profession && (
            <div className="flex items-center justify-center gap-1.5 text-sm text-gray-600 pt-1">
              <Briefcase className="w-3.5 h-3.5 text-gray-400" />
              <span>{author.profession}</span>
            </div>
          )}

          {author?.institution && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
              <Building2 className="w-3.5 h-3.5 text-gray-400" />
              <span>{author.institution}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
