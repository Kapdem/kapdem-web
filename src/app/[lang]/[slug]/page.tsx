import React, { Suspense } from "react";
import type { Metadata } from "next";
import PostsView from "../../../views/PostsView";
import { getPostByAuthorPosts, getPostDetails } from "../../../lib/posts/data";
import { getDictionary } from "../dictionaries";
import LatestBlogs from "../../../components/LatestBlogs";

type Props = {
  params: {
    slug: string;
    lang: string;
  };
};

const SITE_URL = "https://kapdem.org";

const stripHtml = (value?: string) =>
  (value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (value: string, maxLength: number) => {
  if (value.length <= maxLength) return value;
  return value.slice(0, maxLength - 1).trim() + "…";
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;
  const { slug, lang } = awaitedParams;
  const post = await getPostDetails(slug);

  const metadataBase = new URL(SITE_URL);

  const title = stripHtml(post?.title) || "KAPDEM";
  const descriptionSource =
    stripHtml(post?.excerpt) ||
    "Kamu politikası, dijital dönüşüm ve toplumsal gelişim içerikleri.";
  const description = truncate(descriptionSource, 140);
  const canonicalPath = lang === "tr" ? `/${slug}` : `/${lang}/${slug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const coverImage: string | null = post?.coverImage ?? null;
  const ogImages = coverImage
    ? [{ url: coverImage, width: 1200, height: 630, alt: title }]
    : [];

  return {
    metadataBase,
    title: `${title} | KAPDEM`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | KAPDEM`,
      description,
      url: canonicalUrl,
      siteName: "KAPDEM",
      images: ogImages,
      locale: lang === "tr" ? "tr_TR" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | KAPDEM`,
      description,
      images: coverImage ? [coverImage] : [],
    },
  };
}

export default async function page({ params }: Props) {
  const awaitedParams = await params;
  const { slug, lang } = awaitedParams;

  // Sadece bu iki istek beklenir — sayfa bu kadar hızlı açılır
  const [res, dict] = await Promise.all([
    getPostDetails(slug),
    getDictionary(lang),
  ]);

  const publishedAt = res?.publishedAt ? new Date(res.publishedAt) : null;

  const postWithIsoDate = {
    ...res,
    publishedAt: publishedAt ? publishedAt.toISOString() : null,
    formattedDate: publishedAt
      ? publishedAt.toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
  };

  return (
    <div>
      {/* Ana makale: sadece getPostDetails bekler → hızlı */}
      <PostsView dict={dict} post={postWithIsoDate} lang={lang} />
    </div>
  );
}
