"use client";

import React, { useState } from "react";

interface EventData {
  _id: string;
  coverImage: string;
  startDate: string;
  location: string;
  translations: {
    tr: {
      title: string;
      description: string;
      slug: string;
    };
  };
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

export default function EventsList({
  events,
  pastEvents,
}: {
  events: EventData[];
  pastEvents: EventData[];
}) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const displayEvents = (activeTab === "upcoming" ? events : pastEvents).slice(
    0,
    4,
  );

  const count = displayEvents.length;

  return (
    <section className="flex flex-col h-full min-h-0">
      {/* Başlık ve Tablar */}
      <div className="shrink-0 mb-6 border-b border-slate-100 pb-3">
        <h2 className="text-sm font-black tracking-widest text-black uppercase mb-3">
          Etkinlikler
        </h2>
        <div className="flex gap-5 text-[10px] font-bold uppercase">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-1 transition-all ${activeTab === "upcoming" ? "text-black border-b-2 border-black" : "text-slate-400"}`}
          >
            Gelecek
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`pb-1 transition-all ${activeTab === "past" ? "text-black border-b-2 border-black" : "text-slate-400"}`}
          >
            Geçmiş
          </button>
        </div>
      </div>

      {/* Akıllı Dinamik Liste Alanı */}
      <div className="flex-grow flex flex-col gap-4 min-h-0">
        {count > 0 ? (
          displayEvents.map((event) => {
            // Dinamik Stil Atamaları
            const isLarge = count === 1; // 1 veri: Dev dikey
            const isMedium = count === 2; // 2 veri: Orta dikey
            const isSmall = count >= 3; // 3-4 veri: Kompakt yatay

            return (
              <a
                key={event._id}
                href={`/etkinlikler/${event.translations.tr.slug}`}
                className={`group flex rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden
                  ${isSmall ? "flex-row items-center p-3 flex-1" : "flex-col flex-1"}`}
              >
                {/* Görsel Alanı */}
                <div
                  className={`relative shrink-0 overflow-hidden bg-slate-50
                  ${isLarge ? "w-full aspect-[16/10]" : ""}
                  ${isMedium ? "w-full aspect-[21/9]" : ""}
                  ${isSmall ? "w-24 h-full max-h-[110px] rounded-xl" : ""}`}
                >
                  <img
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    src={event.coverImage}
                    alt=""
                  />
                  {!isSmall && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] whitespace-nowrap font-black shadow-sm">
                      {formatDate(event.startDate)}
                    </div>
                  )}
                </div>

                {/* İçerik Alanı */}
                <div
                  className={`flex flex-col justify-center min-w-0
                  ${isLarge ? "p-8" : "p-4"}
                  ${isSmall ? "ml-4 p-0" : ""}`}
                >
                  <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase mb-1 whitespace-nowrap">
                    <span className="truncate">{event.location}</span>
                    {isSmall && <span>• {formatDate(event.startDate)}</span>}
                  </div>

                  <h3
                    className={`font-extrabold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors
                    ${isLarge ? "text-2xl mb-3" : "text-base mb-1"}
                    ${isSmall ? "text-[13px] line-clamp-2" : ""}`}
                  >
                    {event.translations.tr.title}
                  </h3>

                  {!isSmall && (
                    <p
                      className={`text-slate-500 font-medium leading-relaxed
                      ${isLarge ? "text-sm line-clamp-4" : "text-xs line-clamp-2"}`}
                    >
                      {event.translations.tr.description.replace(
                        /<[^>]*>?/gm,
                        "",
                      )}
                    </p>
                  )}
                </div>
              </a>
            );
          })
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-400">
            <span className="text-xs font-bold uppercase tracking-widest opacity-50">
              Kayıt Bulunamadı
            </span>
          </div>
        )}
      </div>

      {/* Alt Buton */}
      <div className="shrink-0 mt-6">
        <a
          href="/etkinlikler"
          className="flex items-center justify-center w-full py-4 bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] border border-slate-200 rounded-xl hover:bg-black hover:text-white transition-all"
        >
          Tümünü Gör
        </a>
      </div>
    </section>
  );
}
