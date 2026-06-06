import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Props = {
  slimCards: any[];
  lang?: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const categoryLabels: Record<string, string> = {
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

const categoryLabelsEN: Record<string, string> = {
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

const UI_LABELS = {
  tr: { heading: "Editörün Seçtikleri", general: "Genel" },
  en: { heading: "Editor's Picks", general: "General" },
};

export default function SlimCard({ slimCards, lang = "tr" }: Props) {
  const L = lang === "en" ? "en" : "tr";
  const labels = UI_LABELS[L];
  const categoryMap = L === "en" ? categoryLabelsEN : categoryLabels;

  return (
    <div className="w-full max-w-full mx-auto px-4 py-8 md:py-12">
      {/* Başlık Alanı */}
      <div className="flex items-center justify-between mb-6 md:mb-10 group/header">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-black text-slate-500 tracking-tight">
            {labels.heading}
          </h2>
        </div>
        <div className="h-[2px] flex-1 bg-slate-800 ml-8 hidden md:block relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500 translate-x-[-100%] group-hover/header:translate-x-0 transition-transform duration-700"></div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-5"
      >
        {slimCards.map((item, i) => (
          <Link href={`/${item.slug}`} key={item._id || i}>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-3 md:gap-5 p-3 md:p-4 rounded-[20px] md:rounded-[32px] bg-[#0f172a] hover:bg-[#1e293b] border border-white/5 hover:border-blue-500/30 transition-all duration-300 cursor-pointer group shadow-2xl"
            >
              {/* Görsel Alanı - Daha yumuşak köşeler ve glow efekti */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-28 flex-shrink-0 overflow-hidden rounded-[16px] md:rounded-[24px] z-10">
                <Image
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  src={item.coverImage || "https://via.placeholder.com/400x300"}
                  alt={item.title}
                  sizes="150px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Metin Alanı */}
              <div className="flex-1 min-w-0 z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-bold uppercase tracking-wider border border-blue-500/20">
                    {item.categories && item.categories.length > 0
                      ? categoryMap[item.categories[0]] ||
                        item.categories[0].replace(/-/g, " ")
                      : labels.general}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base md:text-xl font-semibold leading-tight text-slate-100 group-hover:text-white transition-colors mb-1 md:mb-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                  <div className="w-4 h-[1px] bg-slate-600 group-hover:w-8 group-hover:bg-blue-500 transition-all duration-300 hidden md:block"></div>
                  <p className="text-[9px] md:text-[11px] font-medium text-slate-400 tracking-wider md:uppercase md:tracking-widest">
                    {item.author?.firstName} {item.author?.lastName}
                    <span> {" | "}</span>
                    {new Date(item.publishedAt).toLocaleDateString(
                      L === "en" ? "en-US" : "tr-TR",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>

              {/* Minimalist Ok İkonu */}
              <div className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:right-8 transition-all duration-300">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-blue-400"
                >
                  <path
                    d="M7 17l9.2-9.2M17 17V7H7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Arka Plan Glow Efekti (Hover'da çıkar) */}
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity rounded-full"></div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
