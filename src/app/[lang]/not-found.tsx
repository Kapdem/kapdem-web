import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#002c54] via-[#003d73] to-[#001a33] text-white px-4 py-20 text-center">
      <div className="mb-8">
        <Image
          src="/images/onlylogo.png"
          alt="KAPDEM"
          width={100}
          height={100}
          priority
        />
      </div>

      <div className="text-[120px] md:text-[160px] font-black leading-none bg-gradient-to-r from-white to-[#b61e24] bg-clip-text text-transparent">
        404
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3">
        Sayfa Bulunamadı
      </h1>

      <p className="text-base md:text-lg text-gray-300 max-w-xl mb-10 leading-relaxed">
        Aradığınız sayfa mevcut değil ya da kaldırılmış olabilir. Linki kontrol
        edip tekrar deneyin veya ana sayfaya dönün.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/tr"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#b61e24] hover:bg-[#d42329] text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
        >
          Ana Sayfaya Dön
        </Link>
        <Link
          href="/tr/yayinlar"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-200"
        >
          Yayınlara Göz At
        </Link>
      </div>
    </div>
  );
}
