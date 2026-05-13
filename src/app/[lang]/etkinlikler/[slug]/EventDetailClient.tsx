"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import PostContent from "../../../../components/PostContent";
import EventRegisterCard from "@/components/EventRegisterCard";

export default function EventDetailClient({
  event,
  dict,
  lang,
}: {
  event: any;
  dict: any;
  lang: string;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = "unset";
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < event.galleryImages?.length - 1
    ) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 3000);
    } catch (error) {
      console.error("URL kopyalanamadı:", error);
    }
  };

  const translation =
    event?.translations?.[lang] || event?.translations?.tr || {};
  const eventTitle = translation.title || event.title || "Etkinlik";
  const eventDescription = translation.description || event.content || "";

  const isPastEvent = () => {
    const now = new Date();
    const compareDate = event.endDate || event.startDate;
    return compareDate ? new Date(compareDate) < now : false;
  };

  function AttachmentPreview({
    url,
    fileName,
  }: {
    url: string;
    fileName: string;
  }) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    useEffect(() => {
      let isMounted = true;
      if (url.endsWith(".pdf")) {
        (async () => {
          try {
            // pdfjs-dist'i dinamik import et
            const pdfjsLib = await import("pdfjs-dist");
            // Worker'ı CDN'den ayarla (SSR uyumlu)
            pdfjsLib.GlobalWorkerOptions.workerSrc =
              "//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js";
            const loadingTask = pdfjsLib.getDocument(url);
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: context, viewport, canvas })
              .promise;
            if (isMounted) setPreviewUrl(canvas.toDataURL());
          } catch (e) {
            setPreviewUrl(null);
          }
        })();
      }
      return () => {
        isMounted = false;
      };
    }, [url]);

    // Her ek için sadece kapdem logosu göster
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group  w-28 h-36 rounded-lg overflow-hidden border bg-white shadow hover:shadow-lg transition-all relative flex items-center justify-center bg-gradient-to-b from-[#193cb9] to-[#193cb9]"
      >
        <div className="flex flex-col items-center">
          <img
            src="/images/onlylogo.png"
            alt="KAPDEM Logo"
            className="w-20 h-20 object-contain opacity-90  group-hover:opacity-100 transition-opacity"
          />
          <p className="text-white text-center font-bold">KAPDEM</p>
        </div>
      </a>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        {event.coverImage && (
          <Image
            src={event.coverImage}
            alt={eventTitle}
            fill
            className="object-cover"
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold px-4 text-center">
            {eventTitle}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-6">
              {/* Event Meta Info (Tarih, Saat, Konum) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">
                      {dict?.eventDetail?.date || "Tarih"}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {event.startDate
                        ? new Date(event.startDate).toLocaleDateString(
                            lang === "tr" ? "tr-TR" : "en-US",
                          )
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">
                      {dict?.eventDetail?.time || "Saat"}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {event.startDate
                        ? new Date(event.startDate).toLocaleTimeString(
                            lang === "tr" ? "tr-TR" : "en-US",
                            { hour: "2-digit", minute: "2-digit" },
                          )
                        : "-"}
                    </p>
                  </div>
                </div>

                {event.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 uppercase font-bold">
                        {dict?.eventDetail?.location || "Konum"}
                      </p>
                      <p className="font-semibold text-gray-900 truncate">
                        {event.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="prose prose-blue max-w-none mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {dict?.eventDetail?.eventDescription || "Etkinlik Açıklaması"}
                </h2>
                <PostContent
                  postData={{ ...event, content: eventDescription }}
                />
              </div>

              {/* Gallery */}
              {event.galleryImages?.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {dict?.eventDetail?.eventGallery || "Etkinlik Galerisi"} (
                    {event.galleryImages.length})
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.galleryImages.map((image: string, index: number) => (
                      <div
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                      >
                        <Image
                          src={image}
                          alt="Gallery"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {event.attachments?.length > 0 && (
                <div className="mt-12 border-t pt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {dict?.eventDetail?.attachments || "Ekler"}
                  </h2>
                  <div className="flex flex-row gap-4 flex-wrap">
                    {event.attachments.map((url: string, idx: number) => (
                      <AttachmentPreview
                        key={idx}
                        url={url}
                        fileName={url.split("/").pop() || "Ek"}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  {dict?.eventDetail?.eventInfo || "Etkinlik Kaydı"}
                </h3>
                <div className="space-y-4">
                  <EventRegisterCard
                    eventId={event._id}
                    dict={dict}
                    disabled={isPastEvent()}
                  />
                  <button
                    onClick={handleShare}
                    className="w-full py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {dict?.eventDetail?.share || "Paylaş"}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="font-bold text-blue-900 mb-2">
                  {dict?.eventDetail?.information || "Bilgi"}
                </h4>
                <p className="text-sm text-blue-700 leading-relaxed">
                  {dict?.eventDetail?.infoMessage ||
                    "Bu etkinlik için ön kayıt yaptırmanız gerekmektedir."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 text-white p-2 disabled:opacity-30"
            disabled={selectedImageIndex === 0}
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <div
            className="relative w-full max-w-5xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={event.galleryImages[selectedImageIndex]}
              alt="Gallery Large"
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 text-white p-2 disabled:opacity-30"
            disabled={selectedImageIndex === event.galleryImages.length - 1}
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>
      )}

      {/* Copy Notification */}
      {showCopyNotification && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce">
          {dict?.eventDetail?.linkCopied || "Bağlantı kopyalandı!"}
        </div>
      )}
    </div>
  );
}
