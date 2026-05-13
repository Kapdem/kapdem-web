"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, CircleX, Clock } from "lucide-react";
import dynamic from "next/dynamic";

const MailSubscription = dynamic(
  () => import("../components/MailSubscription"),
  { ssr: false },
);

const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_S3_URL ||
  "https://kapdem.s3.eu-central-1.amazonaws.com";

export default function Etkinlikler({
  pastEvents1 = [],
  upcomingEvents1 = [],
  dict,
  lang = "tr",
}) {
  const [showMailPopup, setShowMailPopup] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="fixed inset-0 pointer-events1-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl -translate-x-1/2 opacity-20"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl translate-x-1/2 opacity-20"></div>
      </div>
      <section className="relative min-h-[15vh] pt-28 flex flex-col justify-center items-center text-center bg-[#002c54] overflow-hidden py-20">
        <div className="absolute inset-0 ">
          <Image
            width={1920}
            height={1080}
            src="/images/banner1.jpg"
            alt="Etkinlik Banner"
            className="w-full h-full object-cover opacity-20"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4">
          <Image
            src="/images/onlylogo.png"
            width={80}
            height={80}
            alt="KAPDEM"
            className="mb-6"
            unoptimized
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {dict?.events1?.heroTitle || "Etkinliklerle Geleceğe Yön Ver"}
          </h1>
          <p className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            {dict?.events1?.heroDescription ||
              "KAPDEM'in özgün ve vizyoner etkinliklerinde yerini al, toplumsal değişimin parçası ol. İlham, network ve etki burada başlar."}
          </p>
          <div className="flex gap-6 justify-center mb-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white mb-1">
                {upcomingEvents1.length}
              </span>
              <span className="text-gray-300 text-xs">
                {dict?.events1?.upcomingEvents || "Yaklaşan Etkinlik"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white mb-1">
                {pastEvents1.length}
              </span>
              <span className="text-gray-300 text-xs">
                {dict?.events1?.pastEvents || "Geçmiş Etkinlik"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white mb-1">
                {pastEvents1.length + upcomingEvents1.length}
              </span>
              <span className="text-gray-300 text-xs">
                {dict?.events1?.totalEvents || "Toplam Etkinlik"}
              </span>
            </div>
          </div>
          <Link
            href="#upcoming"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#b61e24] text-white font-medium rounded-md shadow-lg hover:bg-[#d42329] transition-colors duration-200 text-sm"
          >
            {dict?.events1?.discoverEvents || "Etkinlikleri Keşfet"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section id="upcoming" className="py-16 px-4 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#002c54] rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="h-px bg-gray-300 flex-1 max-w-24"></div>
              </div>
              <h2 className="text-3xl font-bold text-[#002c54] mb-3">
                {dict?.events1?.upcomingTitle || "Yaklaşan Etkinlikler"}
              </h2>
              <p className="text-base text-gray-600 max-w-2xl">
                {dict?.events1?.upcomingDescription ||
                  "Kariyerine ve vizyonuna katkı sağlayacak, ilham verici buluşmalar. Geleceğin liderleri burada bir araya geliyor."}
              </p>
            </div>
            <div>
              <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#002c54] mb-1">
                    {upcomingEvents1.length}
                  </div>
                  <div className="text-xs text-gray-500">
                    {dict?.events1?.activeEvents || "Aktif Etkinlik"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {upcomingEvents1.length === 0 ? (
            <div className="text-gray-500 text-center py-12 text-base bg-white rounded-lg border border-gray-200 shadow-sm">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="max-w-md mx-auto">
                {dict?.events1?.noUpcomingEvents ||
                  "Yaklaşan etkinlik bulunamadı. Çok yakında yeni etkinlikler eklenecek!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents1.map((event, index) => {
                // Cover image URL düzeltme
                let coverImage = event.coverImage;
                if (coverImage && !coverImage.match(/^(http|https|\/)/)) {
                  coverImage = `${NEXT_PUBLIC_BASE_URL}${coverImage}`;
                }

                // Translations yapısından doğru dili al
                const translation =
                  event.translations?.[lang] || event.translations?.tr || {};
                const eventTitle =
                  translation.title || event.title || "Etkinlik";
                const eventSlug = translation.slug || event.slug || "";
                const eventExcerpt = translation.excerpt || event.excerpt || "";

                return (
                  <div
                    key={event._id || event.id || index}
                    className="relative bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 group flex flex-col h-[420px] overflow-hidden"
                  >
                    {/* Date badge */}
                    <div className="absolute top-3 left-3 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-md z-10 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>
                        {event.startDate
                          ? new Date(event.startDate).toLocaleDateString(
                              lang === "tr" ? "tr-TR" : "en-US",
                            )
                          : dict?.events1?.dateNotSpecified ||
                            "Tarih belirtilmemiş"}
                      </span>
                    </div>

                    <Link
                      href={`/${lang}/etkinlikler/${eventSlug}`}
                      className="block flex-shrink-0 relative"
                    >
                      {coverImage ? (
                        <div className="relative overflow-hidden">
                          <Image
                            width={400}
                            height={200}
                            src={coverImage || "/images/onlylogo.png"}
                            alt={eventTitle}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                      )}
                    </Link>

                    <div className="p-5 flex-grow flex flex-col">
                      <Link
                        href={`/${lang}/etkinlikler/${eventSlug}`}
                        className="block flex-shrink-0"
                      >
                        <h3 className="text-lg font-bold text-[#002c54] mb-2 hover:text-[#b61e24] transition-colors duration-200 line-clamp-2">
                          {eventTitle}
                        </h3>
                      </Link>

                      <div className="text-gray-600 text-sm leading-relaxed mb-auto line-clamp-3">
                        {eventExcerpt}
                      </div>

                      {!event.hasAccess && event.previewMessage && (
                        <div className="text-xs text-red-600 font-medium mt-2 mb-2 bg-red-50 px-3 py-1 rounded border border-red-100">
                          {event.previewMessage}
                        </div>
                      )}

                      <Link
                        href={`/${lang}/etkinlikler/${eventSlug}`}
                        className="mt-3 inline-flex items-center justify-center gap-2 bg-[#002c54] text-white rounded py-2 px-4 font-medium hover:bg-[#003d73] transition-colors duration-200 text-sm w-full"
                      >
                        <span>
                          {dict?.events1?.joinAndDetails || "Katıl & Detay"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* GEÇMİŞ ETKİNLİKLER */}
      <section className="py-16 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px bg-gray-300 flex-1 max-w-16"></div>
              <div className="w-10 h-10 bg-[#002c54] rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="h-px bg-gray-300 flex-1 max-w-16"></div>
            </div>
            <h2 className="text-3xl font-bold text-[#002c54] mb-3">
              {dict?.events1?.pastTitle || "Geçmiş Etkinlikler"}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              {dict?.events1?.pastDescription ||
                "Geride bıraktığımız değerli etkinlikler ve başarı hikayeleri."}
            </p>
          </div>

          {pastEvents1.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-white/50"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#002c54]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#002c54]" />
                </div>
                <h3 className="text-xl font-bold text-[#002c54] mb-2">
                  {dict?.events1?.noPastEvents1 || "Henüz Geçmiş Etkinlik Yok"}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                  {lang === "tr"
                    ? "Geride bıraktığımız değerli etkinlikler burada görüntülenecek. Çok yakında yeni etkinliklerle dolu bir geçmiş oluşturacağız!"
                    : "Past events1 will be displayed here. We'll soon create a history full of new events1!"}
                </p>
                <div className="mt-6 flex justify-center">
                  <Link
                    href="#upcoming"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#002c54] text-white font-medium rounded-lg shadow hover:bg-[#003d73] transition-colors duration-200"
                  >
                    <Calendar className="w-4 h-4" />
                    {lang === "tr"
                      ? "Yaklaşan Etkinlikleri İncele"
                      : "Explore Upcoming Events1"}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents1.map((event, index) => {
                // Cover image URL düzeltme
                let coverImage = event.coverImage;
                if (coverImage && !coverImage.match(/^(http|https|\/)/)) {
                  coverImage = `${NEXT_PUBLIC_BASE_URL}${coverImage}`;
                }

                // Translations yapısından doğru dili al
                const translation =
                  event.translations?.[lang] || event.translations?.tr || {};
                const eventTitle =
                  translation.title || event.title || "Etkinlik";
                const eventSlug = translation.slug || event.slug || "";
                const eventExcerpt = translation.excerpt || event.excerpt || "";

                return (
                  <div
                    key={event._id || event.id || index}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 group flex flex-col h-[420px] overflow-hidden border border-gray-100 relative"
                  >
                    {/* Past Event Badge */}
                    <div className="absolute top-3 left-3 bg-[#002c54] text-white text-xs px-3 py-1 rounded-md font-medium z-20 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {lang === "tr" ? "Geçmiş Etkinlik" : "Past Event"}
                    </div>

                    {/* Date badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2 py-1 rounded-md z-10 flex items-center border border-gray-200">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>
                        {event.startDate
                          ? new Date(event.startDate).toLocaleDateString(
                              lang === "tr" ? "tr-TR" : "en-US",
                            )
                          : dict?.events1?.dateNotSpecified ||
                            "Tarih belirtilmemiş"}
                      </span>
                    </div>

                    <Link
                      href={`/${lang}/etkinlikler/${eventSlug}`}
                      className="block flex-shrink-0 relative"
                    >
                      {coverImage ? (
                        <div className="relative overflow-hidden">
                          <Image
                            width={400}
                            height={200}
                            src={coverImage || "/images/onlylogo.png"}
                            alt={eventTitle}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                      )}
                    </Link>

                    <div className="p-5 flex-grow flex flex-col">
                      <Link
                        href={`/${lang}/etkinlikler/${eventSlug}`}
                        className="block flex-shrink-0"
                      >
                        <h3 className="text-lg font-bold text-[#002c54] mb-2 hover:text-[#b61e24] transition-colors duration-200 line-clamp-2">
                          {eventTitle}
                        </h3>
                      </Link>

                      <div className="text-gray-600 text-sm leading-relaxed mb-auto line-clamp-3">
                        {eventExcerpt}
                      </div>

                      <Link
                        href={`/${lang}/etkinlikler/${eventSlug}`}
                        className="mt-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#002c54] to-[#003d73] text-white rounded-lg py-3 px-4 font-medium hover:from-[#003d73] hover:to-[#004d93] transition-all duration-200 text-sm w-full shadow-sm hover:shadow-md"
                      >
                        <span>
                          {dict?.events1?.viewDetails || "Detayları Görüntüle"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Mail Subscription Popup */}
      {showMailPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center mt-28 bg-black/50 backdrop-blur-sm p-4">
          <div
            className="relative w-full max-w-lg mx-auto transform transition-all duration-300 ease-out"
            style={{
              animation: "popupSlideIn 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <button
              className="absolute -top-2 -right-2 z-30 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all duration-200"
              onClick={() => setShowMailPopup(false)}
              aria-label={dict?.events1?.popupClose || "Kapat"}
            >
              <CircleX className="w-5 h-5 text-gray-700" />
            </button>

            <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="relative bg-gradient-to-r from-[#002c54] to-[#003d6b] px-6 py-6 text-center text-white">
                <h3 className="text-xl font-bold mb-2">
                  {dict?.events1?.popupTitle || "Bültenimize Katılın"}
                </h3>
                <p className="text-sm text-white/90 max-w-sm mx-auto">
                  {dict?.events1?.popupDescription ||
                    "Özel içerikler ve etkinlik duyuruları için abone olun"}
                </p>
              </div>

              <div className="">
                <div className="mb-5">
                  <MailSubscription dict={dict} lang={lang} />
                </div>

                {/* <div className="grid grid-cols-1 gap-3 mt-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-8 h-8 bg-[#002c54] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#002c54]">
                        {dict?.events1?.popupBenefit2Title ||
                          "Öncelikli Erişim"}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {dict?.events1?.popupBenefit2Description ||
                          "Etkinliklerden ilk siz haberdar olun"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-8 h-8 bg-[#002c54] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#002c54]">
                        {dict?.events1?.popupBenefit1Title || "Özel İçerikler"}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {dict?.events1?.popupBenefit1Description ||
                          "Sadece üyelerimize özel raporlar"}
                      </p>
                    </div>
                  </div>
                </div> */}

                <div className="text-center  border-t border-gray-100 mb-3">
                  <p className="text-xs text-gray-500">
                    {lang === "tr" ? (
                      <>
                        Abone olarak{" "}
                        <span className="font-semibold text-[#002c54]">
                          KVKK
                        </span>{" "}
                        şartlarını kabul etmiş olursunuz.
                      </>
                    ) : (
                      <>
                        By subscribing, you agree to the{" "}
                        <span className="font-semibold text-[#002c54]">
                          Privacy Policy
                        </span>{" "}
                        terms.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes popupSlideIn {
              0% {
                opacity: 0;
                transform: scale(0.9) translateY(20px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}</style>
        </div>
      )}

      {/* CTA - Topluluğa Katıl */}
      <section className="py-16 bg-[#002c54] text-white text-center relative">
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-4">
          <div className="mb-6">
            <Image
              src="/images/onlylogo.png"
              alt="Logo"
              width={60}
              height={60}
              className="mx-auto"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {dict?.events1?.ctaTitle || "Topluluğun Bir Parçası Ol!"}
          </h2>

          <p className="text-lg mb-8 max-w-2xl leading-relaxed text-gray-200">
            {dict?.events1?.ctaDescription ||
              "Etkinliklerimizde yer almak, yeni insanlarla tanışmak ve toplumsal fayda için harekete geçmek için hemen topluluğumuza katıl."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#b61e24] text-white font-medium rounded-md shadow-lg hover:bg-[#d42329] transition-colors duration-200 text-sm"
              onClick={() => setShowMailPopup(true)}
            >
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
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>
                {dict?.events1?.subscribeButton || "Bültene Abone Ol"}
              </span>
            </button>

            <Link
              href="#upcoming"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#002c54] font-medium rounded-md shadow-lg hover:bg-gray-100 transition-colors duration-200 text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>
                {dict?.events1?.viewEvents1Button || "Etkinlikleri Görüntüle"}
              </span>
            </Link>
          </div>

          {/* Stats showcase */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">
                {pastEvents1.length + upcomingEvents1.length}
              </div>
              <div className="text-gray-300 text-xs">
                {dict?.events1?.totalEvents1 || "Toplam Etkinlik"}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">1000+</div>
              <div className="text-gray-300 text-xs">
                {dict?.events1?.participants || "Katılımcı"}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">50+</div>
              <div className="text-gray-300 text-xs">
                {dict?.events1?.speakers || "Konuşmacı"}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
