"use client";
import React, { useEffect, useState } from "react";
import Modal from "@/components/General/Modal";
import { getUpcomingEvents } from "@/lib/data";
import Link from "next/link";

const POPUP_KEY = "kapdem_popup_last_seen";
const POPUP_INTERVAL = 30 * 60 * 1000;

// --- Geri Sayım Kutucukları Bileşeni ---
const CountdownBoxes = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    gun: 0,
    saat: 0,
    dakika: 0,
    saniye: 0,
    tamamlandi: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference <= 0) {
        setTimeLeft((prev) => ({ ...prev, tamamlandi: true }));
        return;
      }

      setTimeLeft({
        gun: Math.floor(difference / (1000 * 60 * 60 * 24)),
        saat: Math.floor((difference / (1000 * 60 * 60)) % 24),
        dakika: Math.floor((difference / 1000 / 60) % 60),
        saniye: Math.floor((difference / 1000) % 60),
        tamamlandi: false,
      });
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.tamamlandi) {
    return (
      <div className="mt-3 py-2 px-4 bg-emerald-50 text-emerald-600 rounded-xl text-center font-semibold text-sm">
        Etkinlik Başladı!
      </div>
    );
  }

  const Box = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-1">
      <div className="w-full h-10 sm:h-12 flex items-center justify-center bg-slate-900 text-white rounded-lg sm:rounded-xl shadow-inner">
        <span className="text-base sm:text-xl font-bold tabular-nums tracking-tight">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-[9px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className="mt-4 pt-4 border-t border-slate-100">
      <div className="flex justify-between items-center gap-2">
        <Box value={timeLeft.gun} label="Gün" />
        <Box value={timeLeft.saat} label="Saat" />
        <Box value={timeLeft.dakika} label="Dk" />
        <Box value={timeLeft.saniye} label="Sn" />
      </div>
    </div>
  );
};

// --- Ana Popup Bileşeni ---
export default function HomePopup({
  lang,
  labels,
}: {
  lang: string;
  labels: Record<string, any>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    function shouldShowPopup() {
      if (typeof window === "undefined") return false;
      const lastSeen = localStorage.getItem(POPUP_KEY);
      if (!lastSeen) return true;
      const lastSeenTime = parseInt(lastSeen, 10);
      return Date.now() - lastSeenTime > POPUP_INTERVAL;
    }

    if (shouldShowPopup()) {
      getUpcomingEvents().then((UpcomingEvents) => {
        const all = Array.isArray(UpcomingEvents.data) ? UpcomingEvents.data : [];
        // Sadece en yakın etkinliği göster
        const sorted = all
          .filter((e: any) => e.startDate && new Date(e.startDate) > new Date())
          .sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        setEvents(sorted.length > 0 ? [sorted[0]] : all.length > 0 ? [all[0]] : []);
        setIsOpen(sorted.length > 0 || all.length > 0);
        localStorage.setItem(POPUP_KEY, Date.now().toString());
      });
    }
  }, []);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      lang={lang}
      labels={labels}
    >
      <div className="space-y-2">
        {events.length > 0 ? (
          events.map((event: any, idx: number) => {
            const t =
              event.translations?.[lang] || event.translations?.tr || {};
            return (
              <Link
                href={`/etkinlikler/${event.translations?.tr?.slug || idx}`}
                key={event._id || idx}
              >
                <div
                  className="card-animate group bg-white border border-slate-100 rounded-xl overflow-hidden hover:border-indigo-100 transition-all duration-300 shadow-sm"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  {/* Görsel sadece tek etkinlik varsa göster */}
                  {events.length === 1 && event.coverImage && (
                    <div className="relative overflow-hidden aspect-[16/9]">
                      <img
                        src={event.coverImage}
                        alt={t?.title || "Event Cover"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                    </div>
                  )}

                  <div className="px-3 py-2.5">
                    <h3 className="font-bold text-slate-800 text-xs leading-snug mb-1.5 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {t?.title || "Etkinlik Başlığı"}
                    </h3>

                    {event.location && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-100 mb-1">
                        {event.location}
                      </span>
                    )}

                    {event.startDate && (
                      <CountdownBoxes targetDate={event.startDate} />
                    )}
                  </div>

                  <div className="px-3 pb-2.5 pt-0">
                    <Link
                      href={`/etkinlikler/${event.translations?.tr?.slug || idx}`}
                      className="block w-full text-center py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-xs hover:bg-indigo-100 transition-colors border border-indigo-100"
                      tabIndex={0}
                      aria-label="Detayları Gör"
                    >
                      Detayları Gör
                    </Link>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center py-10 text-slate-400 italic">
            Etkinlik bulunamadı.
          </div>
        )}
      </div>
    </Modal>
  );
}
