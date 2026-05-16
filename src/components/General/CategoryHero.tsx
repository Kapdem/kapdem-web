import Link from "next/link";
import React from "react";
import Loading from "./Loading";
import CountUp from "react-countup";

type Props = {
  articles: any[];
  formatDate: (dateStr: string) => string;
  loading: boolean;
  categoryTitles: Record<string, string>;
  category: string;
  dict: any;
};

export default function CategoryHero({
  articles,
  formatDate,
  loading,
  categoryTitles,
  category,
  dict,
}: Props) {
  const getRecentArticlesCount = () => {
    if (!articles || articles.length === 0) return 0;
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    return articles.filter((article) => {
      const publishedDate = new Date(article.publishedAt);
      return publishedDate >= thirtyDaysAgo;
    }).length;
  };
  const categoryTitle = categoryTitles[category] || `${category} Kategorisi`;

  return (
    <header className="relative bg-gradient-to-br from-[#0e2c54] via-[#0e2c54] to-[#1a365d] overflow-hidden mt-28">
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {loading ? (
            <Loading
              color="secondary"
              size="md"
              variant="bars"
              className="lg:col-span-2"
            />
          ) : (
            <div className="lg:col-span-2">
              <article className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white font-bold text-sm">
                    {dict?.category?.latestContent}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3 leading-snug">
                  {articles[0]?.title}
                </h3>
                <p className="text-blue-100 text-sm mb-4 line-clamp-3">
                  {articles[0]?.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-blue-200">
                  <span>
                    {articles[0]?.author?.firstName}{" "}
                    {articles[0]?.author?.lastName}
                  </span>
                  <span>{formatDate(articles[0]?.publishedAt)}</span>
                </div>
                <Link
                  href={`/${articles[0]?.slug}`}
                  className="inline-flex items-center underline  gap-2 mt-4 text-blue-500 hover:blue-red-400 font-extrabold text-sm  transition-colors"
                >
                  {dict?.category?.readMore}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </article>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 ">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
              <div className="text-3xl font-bold text-white mb-2">
                <CountUp end={articles?.length} duration={2} />
              </div>
              <div className="text-blue-200 text-xs">
                {dict?.category?.inthiscategory}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
              <div className="text-3xl font-bold text-white mb-2">
                <CountUp end={10} duration={2} />+
              </div>
              <div className="text-blue-200 text-xs">
                {dict?.category?.totalCategory}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
              <div className="text-3xl font-bold text-white mb-2">
                <CountUp end={articles?.length} duration={2} />+
              </div>
              <div className="text-blue-200 text-xs">
                {dict.category.totalContent}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
              <div className="text-3xl font-bold text-white mb-2">
                <CountUp end={getRecentArticlesCount()} duration={2} />
              </div>
              <div className="text-blue-200 text-xs">
                {dict?.category?.inlastMonth}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
