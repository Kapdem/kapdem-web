"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider({ latestPosts, dict }) {
  const router = useRouter();
  // Kategori eşleme objesi (anahtar: veri, değer: Türkçe isim)
  const categoryMap = dict.categoryMap;

  // Podcastler ve videolar hariç kategoriler
  const allSlides = latestPosts || [];
  let slides = allSlides.filter((slide) => {
    const categories = Array.isArray(slide?.categories)
      ? slide.categories
      : [slide?.categories];
    return !categories.some(
      (cat) => cat === "podcastler" || cat === "videolar",
    );
  });
  // Eğer hiç slide kalmazsa, tüm slaytları göster (filtreyi kaldır)
  if (!slides || slides.length === 0) {
    slides = allSlides;
  }

  const getAuthorSlug = (slide) => {
    let authorSlug = "";
    if (slide?.author && typeof slide?.author === "object") {
      authorSlug = `${slide?.author?.firstName} ${slide?.author?.lastName}`
        .toLocaleLowerCase("tr-TR")
        .replace(/[^a-z0-9çğıöşü\s-]/g, "")
        .replace(/\s+/g, "-");
    } else if (typeof slide?.author === "string") {
      authorSlug = slide?.author
        .toLocaleLowerCase("tr-TR")
        .replace(/[^a-z0-9çğıöşü\s-]/g, "")
        .replace(/\s+/g, "-");
    }
    return authorSlug;
  };

  // Eğer slides yoksa veya boşsa, hiçbir şey render etme
  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Öne çıkan yazılar"
      className="relative w-full overflow-hidden h-[480px] md:h-[700px] sm:mt-10 mt-28"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className}" style="width: 10px; height: 10px; background: rgba(255, 255, 255, 0.3); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 50%; margin: 0 4px; transition: all 0.2s;"></span>`;
          },
        }}
        loop={slides.length > 1}
        className="h-full"
      >
        {slides.map((slide, index) => {
          const authorSlug = getAuthorSlug(slide);
          // Etkinlik kontrolü - categories içinde "etkinlikler", "gelecek-etkinlikler" veya "gecmis-etkinlikler" varsa
          const isEvent = Array.isArray(slide?.categories)
            ? slide.categories.some(
                (cat) =>
                  cat === "etkinlikler" ||
                  cat === "gelecek-etkinlikler" ||
                  cat === "gecmis-etkinlikler",
              )
            : slide?.categories === "etkinlikler" ||
              slide?.categories === "gelecek-etkinlikler" ||
              slide?.categories === "gecmis-etkinlikler";

          const slideUrl = slide?.slug
            ? isEvent
              ? `/etkinlikler/${slide.slug}`
              : `/${slide.slug}`
            : null;

          return (
            <SwiperSlide key={slide._id || index}>
              <div
                className="relative w-full h-full flex items-center cursor-pointer"
                onClick={() => {
                  if (slideUrl) {
                    router.push(slideUrl);
                  }
                }}
              >
                {/* Arka Plan */}
                <div className="absolute inset-0 select-none pointer-events-none">
                  <Image
                    src={
                      slide?.coverImage && slide.coverImage.trim() !== ""
                        ? slide.coverImage
                        : "/images/kapdem.jpeg"
                    }
                    alt={slide?.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 ease-in-out object-top"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* İçerik */}
                <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto">
                  <div className="max-w-3xl space-y-3 md:space-y-6">
                    <span className="inline-block px-4 py-2 bg-[#b61e24]/20 text-white text-sm font-semibold rounded-full border border-[#b61e24]/30 backdrop-blur-sm">
                      {Array.isArray(slide?.categories)
                        ? slide.categories
                            .map((cat) => categoryMap[cat] || cat)
                            .join(", ")
                        : categoryMap[slide?.categories] ||
                          slide?.categories ||
                          "Genel"}
                    </span>

                    <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight line-clamp-4 md:line-clamp-none">
                      {slide?.title}
                    </h1>

                    <p className="text-lg md:text-xl text-white/80 leading-relaxed line-clamp-4 md:line-clamp-5">
                      {slide?.preview && !slide?.preview.hasAccess
                        ? slide?.preview.previewContent
                        : slide?.excerpt || slide?.description}
                    </p>
                  </div>

                  <div className="mt-3 md:mt-6 flex flex-row items-center gap-4 text-white/70 text-sm">
                    <div className="font-bold text-lg text-white flex gap-1">
                      {dict.author}:
                      {slide?.author && typeof slide?.author === "object" ? (
                        <span>
                          {slide?.author.firstName} {slide?.author.lastName}
                        </span>
                      ) : (
                        <span>{slide?.author}</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-white/70 text-sm">
                    <p className="ml-auto text-xs opacity-80">
                      {dict.publishedAt}:{" "}
                      {slide?.publishedAt
                        ? new Date(slide?.publishedAt).toLocaleDateString(
                            "tr-TR",
                          )
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Masaüstü Oklar */}
      <button
        className="swiper-button-prev-custom hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
        aria-label="Önceki"
        tabIndex={0}
      >
        <FaChevronLeft className="text-xl" />
      </button>
      <button
        className="swiper-button-next-custom hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
        aria-label="Sonraki"
        tabIndex={0}
      >
        <FaChevronRight className="text-xl" />
      </button>
    </section>
  );
}
