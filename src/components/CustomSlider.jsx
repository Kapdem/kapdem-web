"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { getPosts } from "../lib/posts/data";
import Link from "next/link";

export default function CustomSlider({ dict }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts("limit=3");
        setPosts(res || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="w-full h-[60vh] md:h-screen relative">
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        modules={[Autoplay, EffectCoverflow]}
        autoplay={{
          delay: 2000,
        }}
        loop={true}
        effect="coverflow"
        coverflowEffect={{
          rotate: 30,
          slideShadows: false,
        }}
        className="w-full h-full"
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <SwiperSlide
              key={post._id}
              className="flex items-center justify-center relative"
            >
              <div className="w-full h-[60vw] max-h-[60vh] md:h-full md:max-h-full relative">
                <Image
                  src={
                    post.coverImage && post.coverImage.trim() !== ""
                      ? post.coverImage
                      : "/images/1.jpg"
                  }
                  alt={post.title}
                  fill
                  className="object-cover w-full h-full rounded-lg md:rounded-3xl"
                  sizes="(max-width: 768px) 100vw, 100vw"
                  priority
                />
                {/* accessTier badge sağ üstte */}
                {post.accessTier && (
                  <span className="absolute top-3 right-3 z-20 bg-blue-600/90 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full shadow-lg select-none">
                    {post.accessTier}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none rounded-lg md:rounded-3xl" />
                <div className="absolute left-3 right-3 bottom-3 z-10 md:left-6 md:right-auto md:bottom-6 md:mb-20 flex flex-col gap-2">
                  <h3 className="text-white text-lg md:text-2xl font-bold drop-shadow-lg mb-1 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/80 text-xs md:text-base drop-shadow line-clamp-2">
                    {post.excerpt}
                  </p>
                  {post.slug && (
                    <Link
                      href={post.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center mt-2 w-36 h-10 md:w-44 md:h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-semibold rounded-full shadow transition select-none"
                      style={{ minWidth: "8rem", minHeight: "2.5rem" }}
                    >
                      {dict?.slider?.readMore || "Devamını Oku"}
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="flex items-center justify-center relative">
            <div className="text-white text-xl">
              {dict?.slider?.loading || "Yükleniyor..."}
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
