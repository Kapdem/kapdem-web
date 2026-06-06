"use client";

import { useState } from "react";
import EventsList from "./EventsList";
import SlimCard from "./SlimCard";
import FeaturedContent from "./FeaturedContent";

// ─── Tipler ve Temalar ────────────────────────────────────────────────────────
type ColorKey = "amber" | "blue" | "teal" | "purple" | "coral";

const THEMES: Record<
  ColorKey,
  { text: string; bg: string; dot: string; hover: string }
> = {
  amber: {
    text: "text-amber-700",
    bg: "bg-amber-50/90",
    dot: "bg-amber-500",
    hover: "hover:border-amber-200",
  },
  blue: {
    text: "text-blue-700",
    bg: "bg-blue-50/90",
    dot: "bg-blue-500",
    hover: "hover:border-blue-200",
  },
  teal: {
    text: "text-teal-700",
    bg: "bg-teal-50/90",
    dot: "bg-teal-500",
    hover: "hover:border-teal-200",
  },
  purple: {
    text: "text-purple-700",
    bg: "bg-purple-50/90",
    dot: "bg-purple-500",
    hover: "hover:border-purple-200",
  },
  coral: {
    text: "text-orange-800",
    bg: "bg-orange-50/90",
    dot: "bg-orange-600",
    hover: "hover:border-orange-200",
  },
};

const getColor = (index: number): ColorKey => {
  const keys: ColorKey[] = ["amber", "blue", "teal", "purple", "coral"];
  return keys[index % keys.length];
};

export default function EventHomePage({
  lang,
  res,
  events,
  pastEvents,
  editorsPicks,
}: {
  lang: string;
  res: any[];
  events: any[];
  pastEvents: any[];
  editorsPicks: any[];
}) {
  const [heroIndex, setHeroIndex] = useState(0);

  const hasRes = res && res.length > 0;
  const heroData = hasRes ? res[heroIndex] : null;
  const sideCards = hasRes
    ? res
        .map((item: any, idx: number) => ({ ...item, _originalIndex: idx }))
        .filter((_, idx) => idx !== heroIndex)
    : [];

  return (
    <main className="bg-white">
      <div className="flex flex-col lg:flex-row w-full border-b border-slate-100 items-stretch lg:min-h-[85vh]">
        {/* SOL: Ana İçerik — sadece res varsa göster */}
        {hasRes && (
          <section className="w-full lg:w-[72%] border-r border-slate-100">
            <FeaturedContent
              lang={lang}
              heroData={heroData}
              sideCards={sideCards}
              THEMES={THEMES}
              getColor={getColor}
              setHeroIndex={setHeroIndex}
            />
          </section>
        )}

        {/* SAĞ: Etkinlikler — her zaman göster */}
        <aside
          className={`bg-slate-50/50 flex flex-col ${hasRes ? "w-full lg:w-[28%]" : "w-full"}`}
        >
          <div className="p-6 md:p-8 flex flex-col h-full">
            <EventsList events={events} pastEvents={pastEvents} lang={lang} />
          </div>
        </aside>
      </div>

      {/* Alt Bölüm */}
      {editorsPicks && editorsPicks.length > 0 && (
        <div className="px-4 w-full md:px-6 py-10">
          <SlimCard slimCards={editorsPicks} />
        </div>
      )}
    </main>
  );
}
