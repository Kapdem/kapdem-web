"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function LatestBlogs({ authorPosts, dict }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatDate = (dateString) => {
    if (!isClient || !dateString) return "";
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 px-6">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center tracking-tight bg-gradient-to-r from-[#002C54] to-[#013b73] bg-clip-text text-transparent drop-shadow-lg">
        {authorPosts?.[0]?.author?.firstName}{" "}
        {authorPosts?.[0]?.author?.lastName} {dict?.latestPaperViaAuthor}
      </h2>
      <div className="flex flex-col gap-8">
        {authorPosts
          ?.filter((blog) => blog.coverImage)
          ?.slice(0, 2)
          ?.map((blog) => (
            <div
              key={blog._id}
              className="group relative flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#013b73]/30 hover:scale-[1.02]"
            >
              <div className="overflow-hidden h-56 w-full">
                <Image
                  src={blog.coverImage}
                  alt={blog?.title || "Blog cover image"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  width={400}
                  height={300}
                />
              </div>
              <div className="flex-1 flex flex-col p-8">
                <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-4 group-hover:text-[#013b73] transition-colors duration-300 line-clamp-2 min-h-[60px]">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-base mb-6 line-clamp-3 min-h-[72px] leading-relaxed">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-gray-500 font-medium">
                    {formatDate(blog.publishedAt)}
                  </span>
                  <Link
                    href={`/${blog.slug}`}
                    className="inline-block px-4 py-2 text-sm bg-gradient-to-r from-[#013b73] to-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {dict?.seeAll1}
                  </Link>
                </div>
              </div>
              <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-3 py-2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                {dict?.detail1}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
