import React from "react";
import Image from "next/image";
import { CheckCircle, Zap, Users } from "lucide-react";
import { getDictionary } from "../dictionaries";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function AboutUsPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const aboutUs = dict.aboutUsPage;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0e2c54] via-[#0e2c54] to-[#1a365d] overflow-hidden mt-28">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <Image
                  src="/images/onlylogo.png"
                  alt="KAPDEM Logo"
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
            </div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
                {aboutUs?.hero?.title || "KAPDEM"}
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full"></div>
            </div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            {aboutUs?.hero?.subtitle || "Hakkımızda"}
          </h2>
          <p className="text-xl text-blue-100 mb-6 leading-relaxed max-w-2xl">
            {aboutUs?.hero?.description ||
              "KAPDEM, toplumsal fayda ve bilimsel gelişim için çalışan, bağımsız ve yenilikçi bir platformdur. Misyonumuz; bilgi paylaşımını, dayanışmayı ve toplumsal gelişimi desteklemektir."}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto  gap-12">
          {/* Main Info */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 md:mb-0">
            {/* Geniş ana görsel */}
            <div className="w-full mb-8">
              <Image
                src="/images/kapdem-logo-2.png"
                alt="KAPDEM Etkinlik"
                width={800}
                height={350}
                className="rounded-2xl object-cover w-full max-h-[350px] bg-gray-900"
                priority
              />
            </div>
            <h3 className="text-2xl font-bold text-[#0e2c54] mb-4">
              {aboutUs?.whatIsKapdem?.title || "KAPDEM Nedir ?"}
            </h3>
            <p className="text-gray-700 mb-6 text-base md:text-lg text-justify">
              {aboutUs?.whatIsKapdem?.description}
            </p>
            <h3 className="text-2xl font-bold text-[#0e2c54] mb-4 uppercase">
              {aboutUs?.publishingPrinciple?.title ||
                "KAPDEM Yayın ilkesi ve Yasal Sorumluluk"}
            </h3>
            <p className="text-gray-700 mb-6 text-base md:text-lg text-justify">
              {aboutUs?.publishingPrinciple?.description}
            </p>
          </div>
          {/* Side Info - Neden/SSS */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0e2c54] to-[#1a365d]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            {aboutUs?.cta?.title || "Bize Katılın"}
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {aboutUs?.cta?.description ||
              "Türkiye'nin önde gelen kamu politikası ve toplumsal gelişim platformuna siz de katılın. Birlikte daha güçlü yarınlar için çalışalım."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#0e2c54] hover:bg-gray-300 px-8 py-4 rounded-xl font-semibold transition-colors">
              {aboutUs?.cta?.buttons?.join || "Üye Ol"}
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#0e2c54] transition-colors">
              {aboutUs?.cta?.buttons?.learnMore || "Daha Fazla Bilgi"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
