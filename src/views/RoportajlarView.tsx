"use client";
import React, { useState, useMemo } from "react";

import Link from "next/link";

import { useEffect } from "react";
import { getPostByCategory } from "@/lib/posts/data";
import Image from "next/image";

async function getRoportajlar() {
  return await getPostByCategory("roportajlar");
}

export default function RoportajlarView({ dict }) {
  const [search, setSearch] = useState("");
  const [roportajlar, setRoportajlar] = useState([]);

  useEffect(() => {
    getRoportajlar().then(setRoportajlar);
  }, []);

  const filtered = useMemo(() => {
    if (!search) return roportajlar;
    return roportajlar.filter(
      (post) =>
        (post.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (post.excerpt?.toLowerCase() || "").includes(search.toLowerCase())
    );
  }, [search, roportajlar]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 my-44">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{dict?.navbar?.interviews}</h1>
        <div className="relative w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder={dict?.navbar?.fastsearch || "Ara..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white placeholder-gray-400 text-gray-800"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(filtered) && filtered.length > 0 ? (
          filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="bg-white rounded-xl shadow hover:shadow-lg border border-slate-100 overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
              prefetch={false}
            >
              {/* Kapak görseli */}
              <Image
                width={400}
                height={200}
                src={post.coverImage ? post.coverImage : "/images/kapdem.jpeg"}
                alt={post.title}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="flex-1 flex flex-col p-5">
                {/* Başlık */}
                <h2 className="text-xl font-semibold mb-2">
                  {post.title}
                </h2>
                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {post.excerpt}
                </p>
                {/* İçerik (kısa gösterim) */}
                {post.content?.text && (
                  <p className="text-gray-500 text-xs mb-2 line-clamp-2">
                    {post.content.text}
                  </p>
                )}
                {/* Yayınlanma tarihi ve erişim seviyesi */}
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("tr-TR")}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 ml-2">
                    {post.accessTier}
                  </span>
                </div>
                {/* Yazar bilgisi */}
                {post.author && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-slate-800 text-sm">
                      {post.author.firstName} {post.author.lastName}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            Henüz röportaj eklenmemiş.
          </div>
        )}
      </div>
    </div>
  );
}
