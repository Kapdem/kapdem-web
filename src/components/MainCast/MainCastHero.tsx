import React from "react";
import Image from "next/image";

type Props = {
  dict: any;
};

export default function MainCastHero({ dict }: Props) {
  return (
    <div className="relative w-full max-w-full bg-gradient-to-br from-[#0e2c54] via-[#0e2c54] to-[#1a365d] overflow-hidden pt-16">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full translate-y-24 -translate-x-24"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-center">
          {/* Logo ve Başlık */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                  <Image
                    src="/images/ana-kadro-pictures/kapdem-logo.png"
                    alt="KAPDEM Logo"
                    width={64}
                    height={64}
                    className="w-12 h-12 sm:w-16 sm:h-16"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                  {dict?.mainCastHero?.title || "Ana Kadromuz"}
                </h1>
                <div className="h-1 w-12 sm:w-20 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* İstatistik Kartı */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-8 text-center border border-white/20">
              <div className="text-lg md:text-lg font-bold text-white mb-2">
                {dict?.mainCastHero?.statsText || ""}
              </div>
              <div className="text-blue-200 text-sm">KAPDEM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
