import React from "react";
import Image from "next/image";
import { ChevronRight, Clock, Users } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { getPosts } from "@/lib/posts/data";
import Link from "next/link";

const ResearchCard = async ({
  dict,
  lang,
  publishedAt,
  title,
  coverImage,
  author,
  content,
  slug,
  excerpt,
  accessTier,
  href,
  translations,
}) => {
  // Dil desteğine göre içeriği al
  const langData = translations?.[lang] || translations?.tr || {};
  const displayTitle = langData?.title || title;
  const displayContent = langData?.content || content;
  const displayExcerpt = langData?.excerpt || excerpt;
  const displaySlug = langData?.slug || slug;

  const normalizeText = (value) => {
    if (typeof value === "string") return value;

    if (value && typeof value === "object") {
      if (typeof value.text === "string") return value.text;
      if (typeof value.html === "string")
        return value.html.replace(/<[^>]+>/g, " ");
      if (typeof value.content === "string") return value.content;
    }

    return "";
  };

  const calculateReadTime = (content, fallbackText = "") => {
    const wordsPerMinute = 200;
    const text = normalizeText(content) || normalizeText(fallbackText);

    if (!text) return 1;

    const words = text
      .replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    return Math.max(Math.ceil(words / wordsPerMinute), 1);
  };

  const formattedDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const locale = lang === "en" ? "en-US" : "tr-TR";
    return new Date(dateString).toLocaleDateString(locale, options);
  };

  const imageSrc =
    coverImage && coverImage.trim() !== "" ? coverImage : "/images/3.jpg";

  return (
    <article className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 hover:border-slate-300/50 hover:-translate-y-1 flex flex-col h-full min-h-[450px]">
      {/* Image Container */}
      <div className="relative overflow-hidden flex-shrink-0">
        <div className="aspect-w-16 aspect-h-9">
          <Image
            src={imageSrc}
            alt={title || "Kapdem"}
            width={400}
            height={224}
            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Reading Time */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/20 text-white backdrop-blur-sm">
            <Clock className="w-3 h-3 mr-1" />
            {calculateReadTime(displayContent, displayExcerpt)} dk
          </span>
        </div>

        {/* Access Tier Badge */}
        {accessTier && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/95 text-slate-700 backdrop-blur-sm shadow-sm border border-white/20">
              {accessTier === "PREMIUM" ? "Premium" : dict?.free || "Ücretsiz"}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3 flex-shrink-0">
          <time className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formattedDate(publishedAt)}
          </time>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight flex-shrink-0">
          <Link
            href={href || `/${lang}/${displaySlug}`}
            className="hover:text-blue-600 transition-colors duration-200 group-hover:text-blue-600"
            aria-label={`${displayTitle} yazısını oku`}
          >
            {displayTitle}
          </Link>
        </h3>

        {/* Content Preview */}
        <div className="mb-4 flex-grow">
          {displayContent?.text ? (
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
              {displayContent.text}
            </p>
          ) : displayExcerpt ? (
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
              {displayExcerpt}
            </p>
          ) : (
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-400 rounded-full animate-spin"></div>
              <div>{dict?.contentLoading || "İçerik yükleniyor..."}</div>
            </div>
          )}
        </div>

        {/* Author & Read More - Always at bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-slate-900 text-sm truncate">
                {typeof author === "object" && author !== null
                  ? `${author.firstName || ""} ${author.lastName || ""}`.trim()
                  : author || "KAPDEM"}
              </p>
              <p className="text-slate-500 text-xs truncate">
                {author?.title || dict?.author || "Yazar"}
              </p>
            </div>
          </div>

          <Link
            href={href || `/${lang}/${displaySlug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group-hover:gap-2"
            aria-label={`${displayTitle} devamını oku`}
          >
            {dict?.readMore || "Devamı"}
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

const PaperCard = async ({
  res3,
  res4,
  // res5,
  res9,
  res10,
  roportajlar,
  dict,
  lang,
}) => {
  const safeArray = (value) => (Array.isArray(value) ? value : []);

  const sortByDate = (posts) => {
    const validPosts = safeArray(posts);
    return validPosts.sort((a, b) => {
      const dateA = new Date(a?.publishedAt || a?.createdAt || 0);
      const dateB = new Date(b?.publishedAt || b?.createdAt || 0);
      return dateB - dateA;
    });
  };

  const sections = [
    {
      key: "yonetim",
      title: dict?.navbar.publications.items.publication2,
      link: "/category/yonetim-tasarimi",
      linkLabel: dict?.seeAll,
      items: sortByDate(res3),
    },
    {
      key: "kuresel",
      title: dict?.navbar.publications.items.publication3,
      link: "/category/kuresel-politika-ve-uluslararasi-iliskiler",
      linkLabel: dict?.seeAll,
      items: sortByDate(res4),
    },
    // {
    //   key: "editor",
    //   title: dict?.editorPicks || dict?.seeeditorPicks,
    //   link: "/category/editorun-sectikleri",
    //   linkLabel: dict?.seeeditorPicks || dict?.seeAll,
    //   items: sortByDate(res5),
    // },

    {
      key: "ekonomi",
      title: dict?.navbar.publications.items.publication4,
      link: "/category/ekonomi-ve-kalkinma",
      linkLabel: dict?.seeAll,
      items: sortByDate(res9),
    },
    {
      key: "roportajlar",
      title:
        dict?.category?.interviews ||
        dict?.navbar.publications.items.publication12,
      link: "/category/roportajlar",
      linkLabel: dict?.seeAll,
      items: sortByDate(roportajlar),
    },
    {
      key: "teknoloji",
      title: dict?.navbar.publications.items.publication5,
      link: "/category/teknoloji-ve-inovasyon",
      linkLabel: dict?.seeAll,
      items: sortByDate(res10),
    },
  ];

  const resss = await getPosts();

  const renderSection = ({ key, title, link, linkLabel, items }) => (
    <div className="my-12" key={key}>
      <SectionHeader title={title} linkLabel={linkLabel} link={link} />
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {items.slice(0, 3).map((article, index) => (
            <ResearchCard
              key={`${key}-${index}`}
              dict={dict}
              lang={lang}
              {...article}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 py-6">
          {dict?.noContent || "Henüz içerik bulunmuyor."}
        </p>
      )}
    </div>
  );

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {renderSection(sections[0])}
      </div>

      <div className="w-full my-12">
        {/* <Donation
          dict={dict}
          lang={lang}
          title={dict?.donate}
          description={dict?.SubscribeKapdem}
          buttonText={dict?.subs}
          buttonLink="/membership"
        /> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {sections.slice(1).map(renderSection)}
      </div>

      {/* <MemberShipBanner dict={dict} /> */}
    </section>
  );
};

export default PaperCard;
