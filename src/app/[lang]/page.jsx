import { Suspense } from "react";
import PaperCard from "../../components/PaperCard";
import NewsLetter from "../../components/NewsLetter";
import PodcastSections from "../../components/PodcastSections";
import Events from "../../components/Events";
import HeroSlider from "../../components/HeroSlider";
import {
  findPastEvents,
  getEditorsPicks,
  getFeaturedPosts,
  getPostByCategory,
  getPosts,
} from "../../lib/posts/data";
import VideoSection from "@/components/VideoSection";
import { getUpcomingEvents } from "@/lib/data";

async function HeroSection({ lang }) {
  const [dict, rawLatestPosts] = await Promise.all([
    getDictionary(lang),
    getPosts(lang),
  ]);

  const latestPosts = Array.isArray(rawLatestPosts)
    ? [...rawLatestPosts].sort(
        (a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0),
      )
    : [];

  return <HeroSlider dict={dict} latestPosts={latestPosts} />;
}

async function EditorSection({ lang }) {
  const res = await getFeaturedPosts(lang);
  const events = await getUpcomingEvents();
  const pastEvents = await findPastEvents();
  const slicePastEvents = pastEvents.slice(0, 4);
  const editorsPicks = await getEditorsPicks(lang);

  return (
    <div className="w-full max-w-full space-y-12 mx-auto px-4 sm:px-6 lg:px-8">
      <EventHomePage
        lang={lang}
        res={res}
        events={events.data}
        pastEvents={slicePastEvents}
        editorsPicks={editorsPicks}
      />
    </div>
  );
}

async function MainCardsSection({ lang }) {
  const dict = await getDictionary(lang);

  const categoryRequests = [
    { key: "kamu", category: "kamu-politikalari", limit: 3 },
    { key: "gorus", category: "gorus-yazilari", limit: 3 },
    { key: "yonetim", category: "yonetim-tasarimi", limit: 3 },
    {
      key: "kuresel",
      category: "kuresel-politika-ve-uluslararasi-iliskiler",
      limit: 3,
    },
    { key: "editorChoices", category: "editorun-sectikleri", limit: 3 },
    { key: "ekonomi", category: "ekonomi-ve-kalkinma", limit: 3 },
    { key: "teknoloji", category: "teknoloji-ve-inovasyon", limit: 3 },
    { key: "roportajlar", category: "roportajlar", limit: 6 },
  ];

  const categoryResults = await Promise.allSettled(
    categoryRequests.map((item) =>
      getPostByCategory(item.category, item.limit, 1, lang),
    ),
  );

  const categoryData = categoryResults.reduce((acc, result, index) => {
    const key = categoryRequests[index].key;
    acc[key] =
      result.status === "fulfilled" && Array.isArray(result.value)
        ? result.value
        : [];
    return acc;
  }, {});

  return (
    <PaperCard
      dict={dict}
      lang={lang}
      res={categoryData.kamu}
      res2={categoryData.gorus}
      res3={categoryData.yonetim}
      res4={categoryData.kuresel}
      // res5={categoryData.editorChoices}
      res9={categoryData.ekonomi}
      res10={categoryData.teknoloji}
      roportajlar={categoryData.roportajlar}
    />
  );
}

async function EventsSection({ lang }) {
  const [dict, upcomingEvents] = await Promise.all([
    getDictionary(lang),
    getUpcomingEvents(),
  ]);
  return <Events dict={dict} eventsData={upcomingEvents?.data || []} />;
}

async function VideoSectionWrapper({ lang }) {
  const dict = await getDictionary(lang);
  return <VideoSection dict={dict} />;
}

async function NewsLetterSection({ lang }) {
  const dict = await getDictionary(lang);
  return <NewsLetter dict={dict} />;
}

import { getDictionary } from "./dictionaries";
import HomePopup from "@/components/General/HomePopup";
import EventHomePage from "@/components/HomePageFreeSpace/EventHomePage";

export default async function Page({ params }) {
  const { lang } = await params;
  const labels = {
    tr: {
      showEvents: "Yaklaşan Etkinlikleri Görüntüle",
      upcoming: "Yaklaşan Etkinlikler",
      noEvents: "Yaklaşan etkinlik bulunamadı.",
      loading: "Yükleniyor...",
      location: "Yer:",
      close: "Kapat",
    },
    en: {
      showEvents: "View Upcoming Events",
      upcoming: "Upcoming Events",
      noEvents: "No upcoming events found.",
      loading: "Loading...",
      location: "Location:",
      close: "Close",
    },
  };

  return (
    <>
      <HomePopup lang={lang} labels={labels} />
      <div className="max-w-full w-full mx-auto space-y-12 mt-24">
        {/* HeroSlider: sadece getPosts bekler, çok hızlı görünür */}
        <Suspense
          fallback={
            <div className="h-96 animate-pulse bg-gray-100 rounded-xl" />
          }
        >
          <HeroSection lang={lang} />
        </Suspense>

        {/* Editör seçkileri */}
        <Suspense
          fallback={
            <div className="h-64 animate-pulse bg-gray-100 rounded-xl" />
          }
        >
          <EditorSection lang={lang} />
        </Suspense>

        {/* Ana kategoriler: en ağır kısım, arka planda yüklenir */}
        <Suspense fallback={<div className="h-96 animate-pulse" />}>
          <MainCardsSection lang={lang} />
        </Suspense>

        {/* Video */}
        <div className="my-6">
          <Suspense
            fallback={
              <div className="h-48 animate-pulse bg-gray-100 rounded-xl" />
            }
          >
            <VideoSectionWrapper lang={lang} />
          </Suspense>
        </div>

        <div className="mt-12">
          <Suspense fallback={null}>
            <NewsLetterSection lang={lang} />
          </Suspense>
        </div>

        {/* Etkinlikler */}
        <Suspense
          fallback={
            <div className="h-48 animate-pulse bg-gray-100 rounded-xl" />
          }
        >
          <EventsSection lang={lang} />
        </Suspense>
      </div>
    </>
  );
}
