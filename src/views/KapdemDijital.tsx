"use client";
import SectionHeader from "../components/SectionHeader";
import Link from "next/link";
import PostContent from "../components/PostContent";
import { useState } from "react";

const LABELS = {
  tr: {
    videos: "Videolar",
    allVideos: "Tüm Videoları Gör",
    podcasts: "Podcastler",
    allPodcasts: "Tüm Podcastleri Gör",
    watchOnYoutube: "YouTube'da İzle",
  },
  en: {
    videos: "Videos",
    allVideos: "See All Videos",
    podcasts: "Podcasts",
    allPodcasts: "See All Podcasts",
    watchOnYoutube: "Watch on YouTube",
  },
};

export default function KapdemDijital({ podcasts, videos, lang = "tr" }) {
  const L = lang === "en" ? "en" : "tr";
  const labels = LABELS[L];
  const dateLocale = L === "en" ? "en-US" : "tr-TR";
  const [embedError, setEmbedError] = useState({});
  return (
    <div className="min-h-screen bg-gray-50 mt-28">
      {/* Hero/Header Section */}

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Videolar */}
        <section>
          <SectionHeader
            title={labels.videos}
            linkLabel={labels.allVideos}
            link={`/${lang}/category/videolar`}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((item) => (
              <Link href={`/${lang}/${item.slug}`} key={item._id}>
                <article className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-100 group cursor-pointer flex flex-col h-full">
                  <div className="flex-1 flex flex-col p-8">
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-medium text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors min-h-[56px] flex items-start">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-6 min-h-[24px]">
                        <span>
                          {item.author.firstName} {item.author.lastName}
                        </span>
                        <span className="mx-2">·</span>
                        <span>
                          {new Date(item.publishedAt).toLocaleDateString(
                            dateLocale
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/5 flex items-center justify-center">
                      {(() => {
                        const ytMatch = item.link?.match(
                          /(?:v=|youtu.be\/|embed\/)([\w-]{11})/
                        );
                        const ytId = ytMatch ? ytMatch[1] : null;
                        // YouTube linki ise embed dene, hata olursa buton göster
                        if (ytId && item.link?.includes("youtube.com/watch")) {
                          if (!embedError[item._id]) {
                            return (
                              <iframe
                                style={{ borderRadius: "12px" }}
                                src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                                onError={() =>
                                  setEmbedError((prev) => ({
                                    ...prev,
                                    [item._id]: true,
                                  }))
                                }
                              />
                            );
                          } else {
                            return (
                              <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors mt-2"
                              >
                                {labels.watchOnYoutube}
                              </Link>
                            );
                          }
                        }
                        // Embed destekleyen YouTube linkleri için iframe
                        if (ytId) {
                          return (
                            <iframe
                              style={{ borderRadius: "12px" }}
                              src={`https://www.youtube.com/embed/${ytId}`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              loading="lazy"
                            />
                          );
                        }
                        // Diğer linkler için eski davranış
                        if (item.link) {
                          return (
                            <iframe
                              title="Player"
                              src={item.link}
                              className="w-full h-full"
                            />
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeader
            title={labels.podcasts}
            linkLabel={labels.allPodcasts}
            link={`/${lang}/category/podcastler`}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts.map((item) => (
              <Link key={item._id} href={`/${lang}/${item.slug}`}>
                <article
                  key={item._id}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-100 group cursor-pointer flex flex-col h-full"
                >
                  <div className="flex-1 flex flex-col p-8">
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-medium text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors min-h-[56px] flex items-start">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-6 min-h-[24px]">
                        <span>
                          {item.author.firstName} {item.author.lastName}
                        </span>
                        <span className="mx-2">·</span>
                        <span>
                          {new Date(item.publishedAt).toLocaleDateString(
                            dateLocale
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="w-full ">
                      {item.link &&
                      item.link.includes("open.spotify.com/") &&
                      (item.link.includes("/episode/") ||
                        item.link.includes("/track/")) ? (
                        <iframe
                          style={{ borderRadius: "12px" }}
                          src={(() => {
                            if (item.link.includes("/episode/")) {
                              const id = item.link
                                .split("/episode/")[1]
                                ?.split("?")[0];
                              return `https://open.spotify.com/embed/episode/${id}?`;
                            } else if (item.link.includes("/track/")) {
                              const id = item.link
                                .split("/track/")[1]
                                ?.split("?")[0];
                              return `https://open.spotify.com/embed/track/${id}?utm_source=generator`;
                            }
                            return "";
                          })()}
                          width="100%"
                          height="152"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        />
                      ) : (
                        <PostContent
                          postData={item}
                          className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:aspect-video [&>iframe]:block"
                          tag="div"
                        />
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
