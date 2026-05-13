"use client";
import { getPostByCategory } from "@/lib/posts/data";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, User, Mic } from "lucide-react";

export default function PodcastSections() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await getPostByCategory("podcastler", 3);

        setPodcasts(res || []);
      } catch (error) {
        console.error("Error fetching podcast data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const formattedDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("tr-TR", options);
  };

  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!podcasts || podcasts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Podcast'ler</h2>
          </div>
          <Link
            href="/category/podcastler"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            Tümünü Gör
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Podcasts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {podcasts.slice(0, 3).map((podcast) => (
            <div
              key={podcast._id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-200/50 hover:border-slate-300/50 hover:-translate-y-1"
            >
              {/* Spotify Embed */}
              <div className="p-4">
                {podcast.link ? (
                  <iframe
                    src={(() => {
                      try {
                        const link = podcast.link.trim();

                        // Spotify embed URL'i oluştur
                        if (link.includes("spotify.com")) {
                          // https://open.spotify.com/episode/ID formatından embed formatına çevir
                          const episodeMatch = link.match(
                            /episode\/([a-zA-Z0-9]+)/,
                          );
                          if (episodeMatch && episodeMatch[1]) {
                            return `https://open.spotify.com/embed/episode/${episodeMatch[1]}`;
                          }
                        }

                        return link;
                      } catch (e) {
                        console.error("Spotify URL parsing error:", e);
                        return "";
                      }
                    })()}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: "12px" }}
                  />
                ) : (
                  <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
                    <Mic className="w-12 h-12 text-slate-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/${podcast.slug}`} aria-label={podcast.title}>
                    {podcast.title}
                  </Link>
                </h3>

                {/* Meta Information */}
                <div className="space-y-2 text-sm text-slate-600">
                  {/* Author */}
                  {podcast.author && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>
                        {typeof podcast.author === "object"
                          ? `${podcast.author.firstName || ""} ${
                              podcast.author.lastName || ""
                            }`.trim()
                          : podcast.author}
                      </span>
                    </div>
                  )}

                  {/* Date */}
                  {podcast.publishedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <time>{formattedDate(podcast.publishedAt)}</time>
                    </div>
                  )}
                </div>

                {/* Read More Link */}
                <Link
                  href={`/${podcast.slug}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group-hover:gap-2"
                  aria-label={`${podcast.title} detaylarını gör`}
                >
                  Detayları Gör
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .podcast-embed :global(iframe) {
          width: 100%;
          border-radius: 12px;
        }
      `}</style>
    </section>
  );
}
