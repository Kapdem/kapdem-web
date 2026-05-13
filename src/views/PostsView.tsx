import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";

import { Suspense } from "react";
import PostContent from "../components/PostContent";
import MailSubscription from "../components/MailSubscription";
import UserProfileCard from "../components/UserProfileCard";
import AuthorCard from "../components/AuthorCard";
import AuthorLatestPosts from "../components/AuthorLatestPosts";
import ScrollProgressBar from "../components/ScrollProgressBar";
import ViewCountTracker from "../components/ViewCountTracker";
import ExcerptDropdown from "../components/ExcerptDropdown";
import ReadingModeButton from "../components/ReadingModeButton";
import {
  SoundWaveLoader,
  ShareAndDownloadLoader,
} from "../components/ClientLoaders";

const categoryMapTR: Record<string, string> = {
  uncategorized: "Kategorisiz",
  "gorus-yazilari": "G\u00f6r\u00fc\u015f Yaz\u0131lar\u0131",
  yayinlar: "Yay\u0131nlar",
  "kuresel-politika-ve-uluslararasi-iliskiler":
    "K\u00fcresel Politika ve Uluslararas\u0131 \u0130li\u015fkiler",
  "kamu-politikalari": "Kamu Politikalar\u0131",
  "yonetim-tasarimi": "Y\u00f6netim Tasar\u0131m\u0131",
  "ekonomi-ve-kalkinma": "Ekonomi ve Kalk\u0131nma",
  "teknoloji-ve-inovasyon": "Teknoloji ve \u0130novasyon",
  goc: "G\u00f6\u00e7",
  tarih: "Tarih",
  "savunma-ve-guvenlik": "Savunma ve G\u00fcvenlik",
  "kultur-ve-sanat": "K\u00fclt\u00fcr ve Sanat",
  "kitap-incelemeleri": "Kitap \u0130ncelemeleri",
  roportajlar: "R\u00f6portajlar",
  etkinlikler: "Etkinlikler",
  "dijital-perspektif": "Dijital Perspektif",
  podcastler: "Podcastler",
  videolar: "Videolar",
  webinarlar: "Webinarlar",
  "ceviri-makaleler": "\u00c7eviri Makaleler",
  "siyasi-anilar": "Siyasi An\u0131lar",
  "editorun-sectikleri": "Edit\u00f6r\u00fcn Se\u00e7tikleri",
  duyurular: "Duyurular",
  "gecmis-etkinlikler": "Ge\u00e7mi\u015f Etkinlikler",
  "gelecek-etkinlikler": "Gelecek Etkinlikler",
  "one-cikan": "\u00d6ne \u00c7\u0131kan",
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

function translateCategories(
  categories: string[] | undefined,
  language: string,
): string {
  if (!categories || !Array.isArray(categories)) {
    return language === "en" ? "No Category" : "Kategori Yok";
  }
  const categoryMap = language === "en" ? categoryMapEN : categoryMapTR;
  return categories.map((cat) => categoryMap[cat] || cat).join(", ");
}

function formatDate(dateString: string | undefined, language: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const locale = language === "en" ? "en-US" : "tr-TR";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function renderLinkEmbed(link: string | undefined, height: number) {
  if (!link) return null;
  try {
    const l = link.trim();
    if (l.includes("spotify.com")) {
      const episodeMatch = l.match(/episode\/([a-zA-Z0-9]+)/);
      if (episodeMatch?.[1]) {
        return (
          <iframe
            src={`https://open.spotify.com/embed/episode/${episodeMatch[1]}`}
            width="100%"
            height={height}
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: "12px" }}
            className="shadow-lg"
          />
        );
      }
    }
    if (l.includes("youtube.com") || l.includes("youtu.be")) {
      const url = new URL(l);
      let videoId = "";
      if (url.hostname.includes("youtube.com")) {
        videoId = url.searchParams.get("v") || "";
      } else if (url.hostname.includes("youtu.be")) {
        videoId = url.pathname.slice(1).split("?")[0];
      }
      if (videoId) {
        return (
          <div
            className="relative w-full bg-zinc-100 rounded-2xl overflow-hidden shadow-lg"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title="YouTube video"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute top-0 left-0 w-full h-full border-0"
            />
          </div>
        );
      }
    }
  } catch (e) {
    console.error("Link parsing error:", e);
  }
  return null;
}

function PremiumNoticeMobile({ dict, preview }: any) {
  return (
    <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl border border-gray-200 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-3 bg-blue-100 rounded-full">
          <Lock className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          {dict?.premiumContentNoticeTitle}
        </h3>
        <p className="text-gray-600">
          {preview.message || dict?.premiumContentNoticeMessage}
        </p>
        <Link
          href="/membership"
          className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md font-semibold transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          {dict?.membershipPlans}
        </Link>
        <p className="text-sm text-gray-500 mt-2">
          {dict?.alreadyAMember}{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            {dict?.login}
          </Link>
        </p>
      </div>
    </div>
  );
}

function PremiumNoticeDesktop({ dict, preview }: any) {
  return (
    <div className="mb-8 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl border border-gray-200 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-4 bg-blue-100 rounded-full">
          <Lock className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">
          {dict?.premiumContentNoticeTitle}
        </h3>
        <p className="text-gray-600 text-lg max-w-lg mx-auto">
          {preview.message || dict?.premiumContentNoticeMessage}
        </p>
        <div className="flex gap-4 mt-2">
          <Link
            href="/membership"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md font-semibold transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            {dict?.viewMemberShip}
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 bg-transparent hover:bg-gray-100 text-blue-600 border border-blue-600 rounded-full shadow-sm font-semibold transition transform hover:scale-105 active:scale-95"
          >
            {dict?.login}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PostView({ post, dict, lang }) {
  const langData = post?.translations?.[lang] || post?.translations?.tr;

  const blogPost = {
    title: langData?.title || post?.title,
    slug: langData?.slug || post?.slug,
    summary: langData?.excerpt || post?.excerpt,
    excerpt: langData?.excerpt || post?.excerpt,
    content: langData?.content || post?.content,
    link: `/${lang}/${langData?.slug || post?.slug}`,
    id: post?._id,
    date: post?.publishedAt,
    formattedDate: formatDate(post?.publishedAt, lang) || post?.formattedDate,
    coverImage: post?.coverImage,
    author: post?.author,
    accessTier: post?.accessTier,
    categories: post?.categories || [],
    translations: post?.translations,
    audioFile: post?.audioFile,
    preview: post?.preview || {
      hasAccess: post?.accessTier === "FREE",
      message:
        lang === "tr"
          ? "Bu i\u00e7eri\u011fi okumak i\u00e7in \u00fcyelik gereklidir."
          : "Subscription is required to read this content.",
      previewContent: (
        langData?.content?.html || post?.content?.html
      )?.substring(0, 200),
    },
  };

  const categoryLabel = translateCategories(blogPost.categories, lang);
  const isPremiumLocked =
    blogPost.accessTier === "PAID" &&
    blogPost.preview &&
    !blogPost.preview.hasAccess;

  return (
    <>
      <ViewCountTracker postId={post?._id} />
      <ScrollProgressBar />

      <div className="relative w-full h-full">
        {blogPost.coverImage && blogPost.coverImage.trim() !== "" ? (
          <Image
            src={blogPost.coverImage}
            width={1920}
            height={1080}
            alt={blogPost?.title || "Blog Cover Image"}
            className="w-full lg:h-[700px] h-[500px] mt-28 md:mt-28 shadow-md aspect-video object-cover"
          />
        ) : (
          <div className="w-full h-[700px] mt-28 md:mt-28 shadow-md aspect-video object-cover bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-white text-center px-4">
              <p className="text-2xl md:text-4xl font-bold mb-2">
                {blogPost.title}
              </p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-end max-w-7xl w-full mx-auto mb-12">
          <p className="text-white text-md md:text-lg font-bold px-4 py-2 bg-red-700/60 p-3 rounded-full ml-3">
            {categoryLabel}
          </p>
          <p className="text-white text-3xl md:text-5xl font-bold px-4 py-2">
            {blogPost.title}
          </p>
          <div className="flex-row items-center gap-4 px-4 py-2">
            <p className="text-xl md:text-2xl font-bold text-white mb-2">
              {lang === "tr" ? "Yazar: " : "Author: "}{" "}
              {blogPost.author?.firstName} {blogPost.author?.lastName}
            </p>
            <p className="text-gray-300 text-md md:text-xl font-medium">
              {blogPost.formattedDate}
            </p>
          </div>
        </div>
      </div>

      {/* Mobilde kapak resminin hemen altında yazar kartı */}
      <div className="md:hidden max-w-7xl w-full mx-auto px-4 mt-12 z-10 relative">
        {blogPost.author && <AuthorCard author={blogPost.author} lang={lang} />}
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 my-3">
        <div className="md:hidden">
          <div className="flex gap-3 mb-6">
            <div className="relative group w-full">
              <ReadingModeButton slug={blogPost.slug} label={dict?.readMode} />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <SoundWaveLoader dict={dict} blogPost={blogPost} />
          </div>
          {post?.link && (
            <div className="mb-6 p-4">{renderLinkEmbed(post.link, 152)}</div>
          )}
          <div className="mt-8">
            <ExcerptDropdown
              excerpt={blogPost.excerpt}
              label={dict?.excerpt}
              variant="mobile"
            />
            <PostContent
              postData={blogPost}
              className="text-gray-700 text-base md:text-lg prose-2xl mb-8 text-justify"
            />
            {isPremiumLocked && (
              <PremiumNoticeMobile dict={dict} preview={blogPost.preview} />
            )}
            <div className="mb-6">
              <div className="mt-4 mb-2">
                <ShareAndDownloadLoader dict={dict} blogPost={blogPost} />
              </div>
            </div>
          </div>
          <UserProfileCard post={post} />
          {post?.author?._id && (
            <Suspense fallback={null}>
              <AuthorLatestPosts authorId={post.author._id} dict={dict} />
            </Suspense>
          )}
          <div className="mt-8">
            <MailSubscription dict={dict} lang={lang} />
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex gap-3 mb-6">
              <div className="relative group w-1/3">
                <ReadingModeButton
                  slug={blogPost.slug}
                  label={dict?.readMode}
                />
              </div>
            </div>
            <div className="mb-6">
              <SoundWaveLoader dict={dict} blogPost={blogPost} />
            </div>
            {post?.link && (
              <div className="mb-6">{renderLinkEmbed(post.link, 232)}</div>
            )}
            <ExcerptDropdown
              excerpt={blogPost.excerpt}
              label={dict?.excerpt}
              variant="desktop"
            />
            <PostContent
              postData={blogPost}
              className="text-gray-700 w-full mb-8 text-justify"
            />
            {isPremiumLocked && (
              <PremiumNoticeDesktop dict={dict} preview={blogPost.preview} />
            )}
            <div className="mb-6">
              <div className="mt-4 mb-2">
                <ShareAndDownloadLoader dict={dict} blogPost={blogPost} />
              </div>
            </div>
            <div className="mt-8">
              <MailSubscription dict={dict} lang={lang} />
            </div>
          </div>
          <div className="md:col-span-1">
            <UserProfileCard post={post} />
            {post?.author?._id && (
              <Suspense fallback={null}>
                <AuthorLatestPosts authorId={post.author._id} dict={dict} />
              </Suspense>
            )}
            <div className="mt-8">
              <MailSubscription dict={dict} lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
