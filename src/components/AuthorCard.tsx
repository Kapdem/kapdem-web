import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, User, FileText } from "lucide-react";

interface Author {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  postCount: number;
  title: string;
}

interface AuthorCardProps {
  author: Author;
  lang: string;
}

export default function AuthorCard({ author, lang }: AuthorCardProps) {
  const authorName = `${author?.firstName} ${author?.lastName}`;
  const profilePicture = author?.profilePicture || "/images/onlylogo.png";

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/30 hover:-translate-y-1">
      <div className="p-6 flex flex-col items-center text-center">
        {/* Profile Picture */}
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-primary/30 transition-colors duration-300">
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
        <div className="space-y-2 mb-4">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {authorName}
          </h3>

          {/* Email */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <p className="hover:text-primary transition-colors">
              {author?.title}
            </p>
          </div>

          {/* Post Count */}
          {/* <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span className="font-medium">
              {author.postCount} İçerik Yayınlandı
            </span>
          </div> */}
        </div>

        {/* View Profile Button */}
        {/* <Link
          href={`/authors/${author._id}`}
          className="inline-flex items-center gap-2 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-500/90 transition-colors text-sm font-medium"
        >
          <User className="w-4 h-4" />
          <span>Profili Görüntüle</span>
        </Link> */}
      </div>
    </div>
  );
}
