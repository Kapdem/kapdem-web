import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventDetails } from "../../../../lib/posts/data";
import EventDetailClient from "./EventDetailClient";
import { getDictionary } from "../../dictionaries";

export const revalidate = 0; // Disable caching for this page

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://kapdem.org";

const toAbsoluteUrl = (value?: string) => {
  if (!value) return undefined;
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  const base = SITE_URL.replace(/\/+$/, "");
  const path = value.replace(/^\/+/, "");
  return `${base}/${path}`;
};

export default async function page({ params }) {
  const awaitedParams = await params;
  const event = await getEventDetails(awaitedParams.slug);
  const dict = await getDictionary(awaitedParams.lang);

  if (!event || !event._id) {
    notFound();
  }

  return (
    <EventDetailClient event={event} dict={dict} lang={awaitedParams.lang} />
  );
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const awaitedParams = await params;
  const event = await getEventDetails(awaitedParams.slug);

  const title =
    event?.translations?.tr?.title || event?.title || "Etkinlik Detayları";
  const excerpt =
    event?.translations?.tr?.excerpt ||
    event?.excerpt ||
    "Etkinlik detaylarını görüntüleyin ve katılın.";
  const imageUrl =
    toAbsoluteUrl(event?.coverImage) || `${SITE_URL}/images/kapdem-logo-2.png`;
  const canonicalPath =
    awaitedParams.lang === "tr"
      ? `/etkinlikler/${awaitedParams.slug}`
      : `/${awaitedParams.lang}/etkinlikler/${awaitedParams.slug}`;

  return {
    title: `${title} | KAPDEM`,
    description: excerpt,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} | KAPDEM`,
      description: excerpt,
      url: canonicalPath,
      type: "article",
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | KAPDEM`,
      description: excerpt,
      images: [imageUrl],
    },
  };
}
