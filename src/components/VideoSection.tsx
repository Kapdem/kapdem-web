"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getPostByCategory } from "@/lib/posts/data";

type Props = {
  dict: any;
};

export default function VideoSection({ dict }: Props) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const swiperRef = useRef<any>(null);

  const handleVideoActivate = (id: string) => {
    setActiveVideoId(id);
    swiperRef.current?.autoplay?.stop();
  };

  const handleSlideChange = () => {
    setActiveVideoId(null);
    swiperRef.current?.autoplay?.start();
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await getPostByCategory("videolar");
        setVideos(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Videolar yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Sadece coverImage olanları göster
  const videoItems = Array.isArray(videos)
    ? videos.filter((item) => item.coverImage)
    : [];

  // Loading state
  if (loading) {
    return (
      <div className="w-full overflow-hidden px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {dict?.videos?.title || "Videolar"}
            </h2>
            <div className="w-20 h-1 bg-blue-600 rounded"></div>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Videolar yükleniyor...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full overflow-hidden px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {dict?.videos?.title || "Videolar"}
            </h2>
            <div className="w-20 h-1 bg-blue-600 rounded"></div>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-red-500 mb-2">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!videoItems || videoItems.length === 0) {
    return (
      <div className="w-full overflow-hidden px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {dict?.videos?.title || "Videolar"}
            </h2>
            <div className="w-20 h-1 bg-blue-600 rounded"></div>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-gray-400 mb-2">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">Henüz video bulunmuyor</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden px-4 py-12 bg-zinc-900">
      <div className="max-w-7xl mx-auto ">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">
            {dict?.videos?.title || "Videolar"}
          </h2>
          <div className="w-20 h-1 bg-blue-600 rounded"></div>
        </div>

        {/* Video Swiper */}
        <div className="relative px-12">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            loop={true}
            slidesPerView={2}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={handleSlideChange}
            navigation={{
              nextEl: ".video-swiper-button-next",
              prevEl: ".video-swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".video-swiper-pagination",
            }}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 2, spaceBetween: 24 },
            }}
            className="video-swiper pb-16"
          >
            {videoItems.map((item, index) => {
              const videoId = String(item._id || index);
              const isActive = activeVideoId === videoId;
              return (
                <SwiperSlide key={videoId}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
                    {/* Video Content */}
                    <div className="relative aspect-video bg-zinc-100 flex-shrink-0">
                      {item.coverImage &&
                        (isActive ? (
                          <iframe
                            src={(() => {
                              try {
                                const link = item.link.trim();
                                if (
                                  link.includes("youtube.com") ||
                                  link.includes("youtu.be")
                                ) {
                                  const url = new URL(link);
                                  let videoId = "";
                                  if (url.hostname.includes("youtube.com")) {
                                    videoId = url.searchParams.get("v") || "";
                                  } else if (
                                    url.hostname.includes("youtu.be")
                                  ) {
                                    videoId = url.pathname
                                      .slice(1)
                                      .split("?")[0];
                                  }
                                  if (videoId) {
                                    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
                                  }
                                }
                                return link;
                              } catch (e) {
                                console.error("URL parsing error:", e);
                                return "";
                              }
                            })()}
                            title={item.title || "Video"}
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            className="absolute top-0 left-0 w-full h-full rounded-t-xl border-0"
                          />
                        ) : (
                          <div
                            className="w-full h-full relative cursor-pointer group"
                            onClick={() => handleVideoActivate(videoId)}
                          >
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              className="w-full h-full object-cover rounded-t-xl"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-t-xl group-hover:bg-black/60 transition-colors">
                              <svg
                                className="w-20 h-20 text-white opacity-90"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      {!item.coverImage && (
                        <div className="flex items-center justify-center h-full bg-gray-200 rounded-t-xl">
                          <div className="text-center">
                            <svg
                              className="w-12 h-12 mx-auto text-gray-400 mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-gray-500">Video bulunamadı</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="video-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all duration-200 -ml-5 opacity-80 hover:opacity-100">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div className="video-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all duration-200 -mr-5 opacity-80 hover:opacity-100">
            <svg
              className="w-5 h-5 text-gray-700"
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
          </div>

          {/* Pagination */}
          <div className="video-swiper-pagination mt-10 text-center [&_.swiper-pagination-bullet]:bg-gray-400 [&_.swiper-pagination-bullet-active]:bg-blue-600"></div>
        </div>
      </div>
    </div>
  );
}
