"use client";
import React, { useState, useEffect } from "react";
import { getPostByCategory } from "@/lib/posts/data";
import Pagination from "@/components/Pagination/Pagination";
import ArticlesCard from "@/components/Cards/ArticlesCard";
import Loading from "@/components/General/Loading";
import CategoryHero from "@/components/General/CategoryHero";

type CategoryDict = {
  opinionPieces: string;
  publications: string;
  globalPoliticsAndInternationalRelations: string;
  publicPolicy: string;
  managementDesignReform: string;
  economyAndDevelopment: string;
  technologyAndInnovation: string;
  migration: string;
  history: string;
  defenseAndSecurity: string;
  cultureAndArts: string;
  bookReviews: string;
  interviews: string;
  events: string;
  digitalContents: string;
  podcastler: string;
  videos: string;
  webinars: string;
  translatedArticles: string;
  politicalMemoirs: string;
  editorPicks: string;
  announcements: string;
  pastEvents: string;
  upcomingEvents: string;
  featured: string;
  uncategorized: string;
  category: string;
  noContent: string;
};

type Props = {
  params: Promise<{
    category: string;
    lang: string;
  }>;
  dict: {
    category: CategoryDict;
    [key: string]: any;
  };
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export default function CategoryView({ params, dict }: Props) {
  const { category, lang } = React.use(params);
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getPostByCategory(category, limit, page);

      if (Array.isArray(res)) {
        setArticles(res);
        setHasMore(res.length === limit);
      } else {
        setArticles([]);
        setHasMore(false);
      }
      setLoading(false);
    };
    fetchData();
  }, [category, limit, page]);

  const categoryTitles: Record<string, string> = {
    "gorus-yazilari": `${dict.category.opinionPieces} ${dict.category.category}`,
    yayinlar: `${dict.category.publications}`,
    "kuresel-politika-ve-uluslararasi-iliskiler": `${dict.category.globalPoliticsAndInternationalRelations}`,
    "kamu-politikalari": `${dict.category.publicPolicy}`,
    "yonetim-tasarimi": `${dict.category.managementDesignReform}`,
    "ekonomi-ve-kalkinma": `${dict.category.economyAndDevelopment}`,
    "teknoloji-ve-inovasyon": `${dict.category.technologyAndInnovation}`,
    goc: `${dict.category.migration}`,
    podcastler: `${dict.category.podcastler}`,
    tarih: `${dict.category.history}`,
    "savunma-ve-guvenlik": `${dict.category.defenseAndSecurity}`,
    "kultur-ve-sanat": `${dict.category.cultureAndArts}`,
    "kitap-incelemeleri": `${dict.category.bookReviews}`,
    roportajlar: `${dict.category.interviews}`,
    etkinlikler: `${dict.category.events}`,
    "dijital-perspektif": `${dict.category.digitalContents}`,
    videolar: `${dict.category.videos}`,
    webinarlar: `${dict.category.webinars}`,
    "ceviri-makaleler": `${dict.category.translatedArticles}`,
    "siyasi-anilar": `${dict.category.politicalMemoirs}`,
    "editorun-sectikleri": `${dict.category.editorPicks}`,
    duyurular: `${dict.category.announcements}`,
    "gecmis-etkinlikler": `${dict.category.pastEvents}`,
    "gelecek-etkinlikler": `${dict.category.upcomingEvents}`,
    "one-cikan": `${dict.category.featured}`,
    uncategorized: `${dict.category.uncategorized}`,
  };

  return (
    <>
      {loading && (
        <Loading
          size="xl"
          text="Yükleniyor..."
          color="primary"
          variant="dots"
          fullScreen
        />
      )}
      <CategoryHero
        dict={dict}
        category={category}
        categoryTitles={categoryTitles}
        articles={articles}
        loading={loading}
        formatDate={formatDate}
      />

      <main className="min-h-screen bg-gray-50 my-24 max-w-7xl w-full mx-auto px-2 sm:px-4 md:px-6">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-8 pt-12">
            {categoryTitles[category]
              ? categoryTitles[category]
              : `${category} ${dict.category.category}`}
          </h1>
          {loading ? (
            <Loading
              size="xl"
              text="Yükleniyor..."
              color="primary"
              variant="pulse"
            />
          ) : (
            <>
              {category === "podcastler" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {articles.length === 0 ? (
                    <div className="col-span-3 text-center py-10">
                      {dict.category.noContent}
                    </div>
                  ) : (
                    articles.map((item: any) => (
                      <ArticlesCard
                        formatDate={formatDate}
                        article={item}
                        key={item._id}
                        lang={lang}
                      />
                    ))
                  )}
                </div>
              ) : category === "videolar" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {articles.length === 0 ? (
                    <div className="col-span-3 text-center py-10">
                      {dict.category.noContent}
                    </div>
                  ) : (
                    articles.map((item: any, index: number) => (
                      <ArticlesCard
                        formatDate={formatDate}
                        article={item}
                        key={item._id + index}
                        lang={lang}
                      />
                    ))
                  )}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {articles.length === 0 ? (
                      <div className="col-span-3 text-center py-10">
                        {dict.category.noContent}
                      </div>
                    ) : (
                      articles.map((article: any) => (
                        <ArticlesCard
                          key={article.slug}
                          article={article}
                          formatDate={formatDate}
                          lang={lang}
                        />
                      ))
                    )}
                  </div>
                  <Pagination
                    hasMore={hasMore}
                    loading={loading}
                    page={page}
                    setPage={setPage}
                    dict={dict}
                  />
                </>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}
