"use client";

import Image from "next/image";
import React from "react";

export default function MailSubscription({ dict, lang = "tr" }) {
  return (
    <div className="mx-auto w-full">
      <div className="relative isolate overflow-hidden bg-[#002c54] px-4 py-8 sm:px-6 shadow-xl border border-white/10">
        <div className="flex flex-col items-center relative z-10">
          {/* Logo - Boyutu mobilde biraz daha optimize edildi */}
          <div className="mb-4 transition-transform hover:scale-105 duration-300">
            <Image
              src={"/images/kapdem-logo-2.png"}
              alt="KAPDEM"
              className="h-auto w-[140px] sm:w-[160px]"
              width={160}
              height={32}
              priority
            />
          </div>

          {/* Açıklama Metni - Okunabilirlik için line-height ve max-width ayarlandı */}
          <p className="mx-auto mb-6 max-w-[280px] sm:max-w-md text-center text-[13px] sm:text-sm leading-relaxed text-gray-300/90">
            {dict?.dontspam ||
              "Bültenlerimizden haberdar olmak için e-posta adresinizi girin."}
          </p>

          {/* Form Yapısı - Mobilde alt alta, sm ekranda yan yana */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row w-full max-w-md gap-3 sm:gap-2"
          >
            <label htmlFor="email-address" className="sr-only">
              {dict?.writeMail || "Mail Adresiniz"}
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full flex-auto rounded-lg border-0 bg-white/10 px-4 py-2.5 text-white shadow-sm ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-inset focus:ring-white/50 text-sm placeholder:text-gray-400 outline-none transition-all"
              placeholder={dict?.writeMail || "E-posta adresinizi girin"}
            />

            <button
              type="submit"
              className="w-full sm:w-auto flex-none rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#002c54] shadow-md hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
            >
              {dict?.subscribe || "Abone ol"}
            </button>
          </form>
        </div>

        {/* Arkaplan Efekti - Daha yumuşak ve performanslı */}
        <div className="absolute left-1/2 top-1/2 -z-0 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-full h-full bg-blue-400/10 blur-[80px] rounded-full"></div>
        </div>

        {/* Orijinal SVG Efektini korumak istersen (Opasite düşürüldü) */}
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 opacity-10"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#gradient)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient
              id="gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#003366" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
