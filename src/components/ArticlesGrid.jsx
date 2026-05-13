import React from "react";
import Image from "next/image";

const ArticlesGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 my-4 px-4 sm:px-0">
      {/* Large Left Card */}
      <div className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-lg h-[280px] sm:h-[350px] lg:h-[500px]">
        <Image
          src="/images/IMAGE-1170x780.png"
          alt="AI-Powered Financial Planning"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 sm:p-6 flex flex-col justify-end text-white">
          <p className="text-xs sm:text-sm text-blue-200 font-medium drop-shadow-lg">
            Ekonomi ve Kalkınma | Öne Çıkan
          </p>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold drop-shadow-lg text-shadow-lg leading-tight">
            Satranç Tahtasında Ekonomi: Türkiye Ekonomisine "Şah" Tehdidi
          </h2>
          <p className="mt-2 text-xs sm:text-sm drop-shadow-lg">
            Dr. M. Coşkun Cangöz
          </p>
        </div>
      </div>

      {/* Right Column Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Card 1 */}
        <div className="relative rounded-xl overflow-hidden shadow-lg h-[200px] sm:h-[180px] lg:h-[240px] transition-transform duration-300 hover:scale-105 cursor-pointer">
          <Image
            src="/images/DDk.jpg"
            alt="AI-Powered Personal Assistants"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 sm:p-4 text-white flex flex-col justify-end">
            <p className="text-xs text-blue-200 font-medium drop-shadow-lg">
              Kamu Politikaları
            </p>
            <h3 className="text-xs sm:text-sm font-semibold drop-shadow-lg text-shadow-md line-clamp-3 overflow-hidden leading-tight">
              Cumhurbaşkanlığı Devlet Denetleme Kurulu'na Verilen "Görevden
              Uzaklaştırma" Yetkisi Üzerine Değerlendirme
            </h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative rounded-xl overflow-hidden shadow-lg h-[200px] sm:h-[180px] lg:h-[240px] transition-transform duration-300 hover:scale-105 cursor-pointer">
          <Image
            src="/images/GORSEL-1.jpg"
            alt="Retail Landscape AI Payments"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 sm:p-4 text-white flex flex-col justify-end">
            <p className="text-xs text-blue-200 font-medium drop-shadow-lg">
              KAMU POLİTİKALARI | Öne Çıkan
            </p>
            <h3 className="text-xs sm:text-sm font-semibold drop-shadow-lg text-shadow-md line-clamp-3 overflow-hidden leading-tight">
              İmar Hakkı Aktarımı: Kamulaştırma Parası Ödemekten Kurtulmanın
              Yöntemi Mi?
            </h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative rounded-xl overflow-hidden shadow-lg h-[200px] sm:h-[180px] lg:h-[240px] transition-transform duration-300 hover:scale-105 cursor-pointer">
          <Image
            src="/images/IRAK-TURKMEN-GORSEL-1.jpg"
            alt="Work and Wellness"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 sm:p-4 text-white flex flex-col justify-end">
            <p className="text-xs text-blue-200 font-medium drop-shadow-lg">
              Röpörtajlar | 1h ago
            </p>
            <h3 className="text-xs sm:text-sm font-semibold drop-shadow-lg text-shadow-md line-clamp-3 overflow-hidden leading-tight">
              Geri Gönderme Tehdidi Altındaki Türkmenlerle Röportaj Serisi Bölüm
              1: Türkiye'deki Türkmenlerin Kimlik ve Hayatta Kalma Mücadelesi
            </h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative rounded-xl overflow-hidden shadow-lg h-[200px] sm:h-[180px] lg:h-[240px] transition-transform duration-300 hover:scale-105 cursor-pointer">
          <Image
            src="/images/Henry-Kissinger-Tansu-Ciller-Daryal-Batibay-1170x874.jpg"
            alt="Importance of Sleep"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 sm:p-4 text-white flex flex-col justify-end">
            <p className="text-xs text-blue-200 font-medium drop-shadow-lg">
              EDİTÖRÜN SEÇTİKLERİ | Siyasi Anılar
            </p>
            <h3 className="text-xs sm:text-sm font-semibold drop-shadow-lg text-shadow-md line-clamp-2 overflow-hidden leading-tight">
              Henry A. Kissinger'ın Ardından: İki Özel Türkiye Anısı
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesGrid;
