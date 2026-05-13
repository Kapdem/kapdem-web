import "@/utils/ckeditor.css";
import "@/utils/revert.css";
import { getSpecialFileById } from "@/lib/data";
import type { Metadata } from "next";

import React from "react";
import {
  Calendar,
  User,
  Shield,
  ArrowLeft,
  Quote,
  Fingerprint,
} from "lucide-react";
import Link from "next/link";
import { getDictionary } from "../../dictionaries";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const res = await getSpecialFileById(awaitedParams.id);

  const title = res?.title || "Özel Dosya";
  const description =
    res?.excerpt || "KAPDEM özel dosya içeriklerini inceleyin.";
  const imageUrl =
    toAbsoluteUrl(res?.coverImage) || `${SITE_URL}/images/onlylogo.png`;
  const canonicalPath =
    awaitedParams.lang === "tr"
      ? `/ozel-dosyalar/${awaitedParams.id}`
      : `/${awaitedParams.lang}/ozel-dosyalar/${awaitedParams.id}`;

  return {
    title: `${title} | KAPDEM`,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} | KAPDEM`,
      description,
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
      description,
      images: [imageUrl],
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}) {
  const awaitedParams = await params;
  const dict = await getDictionary(awaitedParams.lang);
  const res = await getSpecialFileById(awaitedParams.id);

  if (!res) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {dict?.specialFileDetail?.notFound || "Dosya Bulunamadı"}
          </h1>
          <Link
            href={`/${awaitedParams.lang}/ozel-dosyalar`}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            {dict?.specialFileDetail?.backToFiles || "Özel Dosyalara Dön"}
          </Link>
        </div>
      </div>
    );
  }

  const authorName =
    typeof res.author === "string"
      ? res.author
      : `${res.author.firstName} ${res.author.lastName}`;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200 selection:bg-amber-500/30">
      {/* Arka Plan Dekoratif Işıklar */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            href={`/${awaitedParams.lang}/ozel-dosyalar`}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-400 transition-all duration-300 mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium tracking-wide">
              {dict?.specialFileDetail?.backToArchive || "ARŞİVE DÖN"}
            </span>
          </Link>

          {/* Header Section */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-md mb-6">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-amber-500 text-[10px] font-bold tracking-[0.2em] uppercase">
                {dict?.specialFileDetail?.confidentialLayer ||
                  "Gizli Veri Katmanı"}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight leading-[1.1]">
              {res.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-8 text-sm text-slate-500 border-b border-slate-800/50 pb-8">
              <div className="flex items-center gap-2.5 group">
                <div className="p-1.5 rounded-full bg-slate-800 group-hover:bg-amber-500/20 transition-colors">
                  <User className="w-4 h-4 group-hover:text-amber-500" />
                </div>
                <span className="group-hover:text-slate-300 transition-colors">
                  {authorName}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-full bg-slate-800">
                  <Calendar className="w-4 h-4" />
                </div>
                <span>
                  {new Date(res.publishedAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2.5 ml-auto opacity-50 hidden md:flex">
                <Fingerprint className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-tighter">
                  {dict?.specialFileDetail?.verifiedAccess ||
                    "Verified Access Level"}{" "}
                  {res.accessTier}
                </span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden rounded-3xl mb-16 shadow-2xl ring-1 ring-slate-800">
            <img
              src={res.coverImage || "/images/onlylogo.png"}
              alt={res.title}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-60" />
          </div>

          {/* --- ÖZET KISMI (YENİ TASARIM) --- */}
          <section className="relative mb-20">
            <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500 via-amber-500/20 to-transparent hidden md:block" />

            <div className="relative p-8 md:p-12 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Quote className="w-24 h-24 text-white" />
              </div>

              <h3 className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-amber-500/30"></span>
                {dict?.specialFileDetail?.summaryTitle || "Özet ve Analiz"}
              </h3>

              <p className="text-xl md:text-2xl text-slate-200 font-medium leading-[1.6] italic font-serif">
                "{res.excerpt}"
              </p>

              <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-between items-center">
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-amber-500/50" />
                  <div className="w-1 h-1 rounded-full bg-amber-500/30" />
                  <div className="w-1 h-1 rounded-full bg-amber-500/10" />
                </div>
              </div>
            </div>
          </section>

          {/* Content */}
          <div className="relative">
            <div className="prose prose-invert prose-amber max-w-none">
              <div
                className="ck-content text-slate-300 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{
                  __html: res.content.html
                    ? res.content.html.replace(
                        /https:\/\/www\.kapdem\.org\/wp-content\/uploads\//g,
                        "https://kapdem-org.s3.eu-north-1.amazonaws.com/"
                      )
                    : "",
                }}
              />
            </div>
          </div>

          {/* Gallery Images */}
          {res.galleryImages && res.galleryImages.length > 0 && (
            <div className="mt-24 border-t border-slate-800 pt-16">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  {dict?.specialFileDetail?.visualEvidence || "Görsel Kanıtlar"}
                </h2>
                <div className="h-[1px] flex-grow bg-slate-800"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {res.galleryImages.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="group relative h-[350px] overflow-hidden rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all duration-500 shadow-lg"
                  >
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <span className="text-xs font-mono text-amber-500 tracking-widest uppercase">
                        {dict?.specialFileDetail?.figureLabel || "Fig."}{" "}
                        {index + 1} //{" "}
                        {dict?.specialFileDetail?.embeddedProof ||
                          "Yerleşik Kanıt"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Access Tier Badge */}
          <div className="mt-24 text-center">
            <div className="inline-flex flex-col items-center gap-3">
              <div className="px-8 py-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-amber-500" />
                  <span className="text-slate-400 text-sm tracking-wide">
                    {dict?.specialFileDetail?.accessLevel ||
                      "Erişim Yetki Seviyesi:"}{" "}
                    <span className="font-bold text-white ml-1">
                      {res.accessTier}
                    </span>
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-slate-600 font-mono tracking-tighter uppercase">
                {dict?.specialFileDetail?.disclaimer ||
                  "Bu döküman sadece yetkili personel içindir. İzinsiz paylaşılması yasaktır."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
