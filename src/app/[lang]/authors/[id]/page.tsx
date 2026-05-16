import { getAuthorById } from "@/lib/data";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, FileText, Calendar, Tag } from "lucide-react";

const S3_URL = process.env.NEXT_PUBLIC_S3_URL || "";

type Props = {
  params: { id: string; lang: string };
};

// URL Kontrol fonksiyonu
const getImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url; // Zaten tam URL ise aynen döndür
  }
  return `${S3_URL}${url}`; // Değilse S3_URL ekle
};

export default async function page({ params }: Props) {
  const awaitedParams = await params;
  const { id, lang } = awaitedParams;
  const author = await getAuthorById(id);

  if (!author || !author._id) {
    notFound();
  }

  const { firstName, lastName, email, profilePicture, postCount, posts } =
    author;

  const authorName = `${firstName} ${lastName}`;
  const initials = `${firstName?.[0] || ""}${
    lastName?.[0] || ""
  }`.toUpperCase();

  const translations = {
    tr: {
      postsBy: "tarafından yazılan içerikler",
      email: "E-posta",
      totalPosts: "Toplam İçerik",
      noPosts: "Henüz içerik yayınlanmamış.",
      publishedOn: "Yayınlandı:",
      readMore: "Devamını Oku",
    },
    en: {
      postsBy: "Posts by",
      email: "Email",
      totalPosts: "Total Posts",
      noPosts: "No posts published yet.",
      publishedOn: "Published on:",
      readMore: "Read More",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-12 mt-28">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Author Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture */}
            <div className="relative flex-shrink-0">
              {profilePicture ? (
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg ring-4 ring-blue-50">
                  <Image
                    src={getImageUrl(profilePicture)}
                    alt={authorName}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-4 border-blue-100 shadow-lg ring-4 ring-blue-50">
                  <span className="text-5xl font-bold text-white">
                    {initials}
                  </span>
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {authorName}
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                {/* Email */}
                {/* <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-blue-600 transition-colors font-medium"
                  >
                    {email}
                  </a>
                </div> */}

                {/* Post count */}
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">
                    {postCount} {t.totalPosts}
                  </span>
                </div>
              </div>

              {/* <div className="text-lg text-gray-600 font-medium">
                {postCount} {t.postsBy} {firstName}
              </div> */}
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {lang === "en"
              ? `${t.postsBy} ${firstName}`
              : `${firstName} ${t.postsBy}`}
          </h2>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => {
                const postTitle =
                  post.translations?.[lang]?.title || post.title;
                const postExcerpt =
                  post.translations?.[lang]?.excerpt || post.excerpt;

                return (
                  <Link
                    key={post._id}
                    href={`/${lang}/${post.slug}`}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                  >
                    {/* Cover Image */}
                    {post.coverImage && (
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        <Image
                          src={getImageUrl(post.coverImage)}
                          alt={postTitle}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {post.accessTier && post.accessTier !== "FREE" && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            {post.accessTier}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      {/* Categories */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories
                            .slice(0, 2)
                            .map((category: string, idx: number) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold"
                              >
                                <Tag className="w-3 h-3" />
                                {category}
                              </span>
                            ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {postTitle}
                      </h3>

                      {/* Excerpt */}
                      {postExcerpt && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {postExcerpt}
                        </p>
                      )}

                      {/* Publish Date */}
                      {post.publishedAt && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-100">
                          <Calendar className="w-4 h-4" />
                          <time>
                            {new Date(post.publishedAt).toLocaleDateString(
                              lang === "tr" ? "tr-TR" : "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t.noPosts}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
