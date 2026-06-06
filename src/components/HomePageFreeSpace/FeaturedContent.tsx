import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type ThemeType = {
  text: string;
  bg: string;
  dot: string;
  hover: string;
};

type FeaturedContentProps = {
  lang: string;
  heroData: any;
  sideCards: any[];
  THEMES: Record<string, ThemeType>;
  getColor: (index: number) => string;
  setHeroIndex?: (idx: number) => void;
};

const categoryMapTR: Record<string, string> = {
  uncategorized: "Kategorisiz",
  "gorus-yazilari": "Görüş Yazıları",
  yayinlar: "Yayınlar",
  "kuresel-politika-ve-uluslararasi-iliskiler":
    "Küresel Politika ve Uluslararası İlişkiler",
  "kamu-politikalari": "Kamu Politikaları",
  "yonetim-tasarimi": "Yönetim Tasarımı",
  "ekonomi-ve-kalkinma": "Ekonomi ve Kalkınma",
  "teknoloji-ve-inovasyon": "Teknoloji ve İnovasyon",
  goc: "Göç",
  tarih: "Tarih",
  "savunma-ve-guvenlik": "Savunma ve Güvenlik",
  "kultur-ve-sanat": "Kültür ve Sanat",
  "kitap-incelemeleri": "Kitap İncelemeleri",
  roportajlar: "Röportajlar",
  etkinlikler: "Etkinlikler",
  "dijital-perspektif": "Dijital Perspektif",
  podcastler: "Podcastler",
  videolar: "Videolar",
  webinarlar: "Webinarlar",
  "ceviri-makaleler": "Çeviri Makaleler",
  "siyasi-anilar": "Siyasi Anılar",
  "editorun-sectikleri": "Editörün Seçtikleri",
  duyurular: "Duyurular",
  "gecmis-etkinlikler": "Geçmiş Etkinlikler",
  "gelecek-etkinlikler": "Gelecek Etkinlikler",
  "one-cikan": "Öne Çıkan",
};

const categoryMapEN: Record<string, string> = {
  uncategorized: "Uncategorized",
  "gorus-yazilari": "Opinion Articles",
  yayinlar: "Publications",
  "kuresel-politika-ve-uluslararasi-iliskiler":
    "Global Politics and International Relations",
  "kamu-politikalari": "Public Policy",
  "yonetim-tasarimi": "Governance Design",
  "ekonomi-ve-kalkinma": "Economy and Development",
  "teknoloji-ve-inovasyon": "Technology and Innovation",
  goc: "Migration",
  tarih: "History",
  "savunma-ve-guvenlik": "Defense and Security",
  "kultur-ve-sanat": "Culture and Arts",
  "kitap-incelemeleri": "Book Reviews",
  roportajlar: "Interviews",
  etkinlikler: "Events",
  "dijital-perspektif": "Digital Perspective",
  podcastler: "Podcasts",
  videolar: "Videos",
  webinarlar: "Webinars",
  "ceviri-makaleler": "Translated Articles",
  "siyasi-anilar": "Political Memoirs",
  "editorun-sectikleri": "Editor's Picks",
  duyurular: "Announcements",
  "gecmis-etkinlikler": "Past Events",
  "gelecek-etkinlikler": "Upcoming Events",
  "one-cikan": "Featured",
};

const normalizeCategoryLabel = (category: unknown, lang: string) => {
  const rawCategory =
    typeof category === "string"
      ? category
      : typeof category === "object" && category !== null
        ? (category as { name?: string; slug?: string }).name ||
          (category as { name?: string; slug?: string }).slug ||
          ""
        : "";

  if (!rawCategory) return lang === "en" ? "Agenda" : "Gündem";

  const categoryMap = lang === "en" ? categoryMapEN : categoryMapTR;

  if (categoryMap[rawCategory]) {
    return categoryMap[rawCategory];
  }

  return rawCategory
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
};

const UI_LABELS = {
  tr: {
    featured: "Öne Çıkarılanlar",
    kicker: "Öne Çıkan",
    author: "Yazar:",
  },
  en: {
    featured: "Featured",
    kicker: "Featured",
    author: "Author:",
  },
};

export default function FeaturedContent({
  lang,
  heroData,
  sideCards,
  THEMES,
  getColor,
  setHeroIndex,
}: FeaturedContentProps) {
  const labels = lang === "en" ? UI_LABELS.en : UI_LABELS.tr;

  return (
    <div>
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 flex flex-col">
        {/* Üst Başlık - Mobilde daha kompakt */}
        <div className="flex items-center mb-8 md:mb-12 border-b border-slate-100 pb-4">
          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-black border-b-2 border-black pb-4 -mb-[18px]">
            {labels.featured}
          </span>
        </div>

        {/* Ana Grid Yapısı */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start lg:min-h-[760px]">
          {/* SOL: Hero (Mobilde en üstte, tam genişlik) */}
          <div className="lg:col-span-8 w-full lg:h-full">
            <AnimatePresence mode="wait">
              <Link href={`/${heroData.slug}`}>
                <motion.div
                  key={heroData._originalIndex || 0}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer relative rounded-[24px] md:rounded-[40px] overflow-hidden aspect-[1/1] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-auto lg:h-full w-full shadow-xl"
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={
                        heroData.coverImage ||
                        "https://via.placeholder.com/1200x800"
                      }
                      alt={heroData.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                  </div>

                  <div className="relative z-10 p-5 md:p-10 h-full flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="w-8 md:w-12 h-[1px] md:h-[2px] bg-white/40" />
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/90">
                          {heroData.kicker || labels.kicker}
                        </span>
                      </div>
                      <span className="text-4xl md:text-7xl font-black italic text-white/10 group-hover:text-white/20 transition-colors select-none">
                        01
                      </span>
                    </div>

                    <div className="max-w-full">
                      <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4 md:mb-8">
                        {heroData.title}
                      </h2>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-4">
                          <span className="px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest backdrop-blur-md bg-white/10 border border-white/20">
                            {labels.author} {heroData.author?.firstName || ""}{" "}
                            {heroData.author?.lastName || ""}
                          </span>
                        </div>
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-xl flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            className="md:w-6 md:h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path d="M5 12h14m-7-7 7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatePresence>
          </div>

          {/* SAĞ: Yan Kartlar (Mobilde tek sütun, tablet 2x2, masaüstünde dikey liste) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full lg:h-full lg:grid-cols-1 lg:grid-rows-4">
            {sideCards.slice(0, 4).map((card, i) => {
              const theme = THEMES[getColor(i + 1)];
              return (
                <motion.div
                  key={card._originalIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    setHeroIndex && setHeroIndex(card._originalIndex);
                  }}
                  className={`p-3 md:p-4 w-full rounded-[20px] md:rounded-[28px] border border-slate-100 transition-all duration-300 cursor-pointer group hover:bg-slate-50 active:scale-[0.98] lg:h-full ${theme.hover}`}
                >
                  <div className="flex h-full items-center gap-3 md:gap-4">
                    <div className="relative w-20 sm:w-24 md:w-28 shrink-0 overflow-hidden rounded-[16px] aspect-square bg-slate-100">
                      <img
                        src={card.coverImage || "/images/kapdem.jpg"}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 self-center">
                      <h3 className="text-sm sm:text-[15px] md:text-lg font-bold leading-snug text-slate-800 group-hover:text-black transition-colors">
                        {card.title}
                      </h3>
                      <span className="text-[10px] md:text-[11px] text-slate-400 font-medium italic line-clamp-1">
                        {labels.author} {card.author?.firstName || ""}{" "}
                        {card.author?.lastName || ""}
                      </span>
                      <span className="text-[10px] md:text-[11px] text-slate-400 font-medium italic line-clamp-1">
                        {new Date(card.publishedAt).toLocaleDateString(lang, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
