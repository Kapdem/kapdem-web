import Link from "next/link";
import React from "react";

type Props = {};

export default function JoinUsSection({}: Props) {
  return (
    <section className="py-10 sm:py-16 md:py-20 px-2 sm:px-4 bg-gradient-to-r from-[#002C54] to-blue-600">
      <div className="container mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
          Ekibimize Katılmak İster misiniz?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-4 sm:mb-8 leading-relaxed">
          KAPDEM'de yetenekli ve tutkulu insanlarla birlikte çalışma fırsatı
          yakalayın. Akademik kariyerinizi geliştirin ve topluma katkıda
          bulunun.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
          <Link
            href="/membership"
            className="px-6 sm:px-8 py-2 sm:py-4 bg-white text-[#002C54] rounded-2xl font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Üyelik Başvurusu
          </Link>
          <Link
            href="/sendpaper"
            className="px-6 sm:px-8 py-2 sm:py-4 border-2 border-white text-white rounded-2xl font-bold hover:bg-white hover:text-[#002C54] transition-all duration-200 transform hover:scale-105"
          >
            Makale Gönder
          </Link>
        </div>
      </div>
    </section>
  );
}
