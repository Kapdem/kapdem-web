"use client";
import React from "react";
import Link from "next/link";
import { Heart, CreditCard, Sparkles } from "lucide-react";

export default function Donation({ dict, lang }) {
  return (
    <div className="relative w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="text-center space-y-4">
          {/* Main heading */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {dict?.donation?.title || "Geleceği Birlikte"}
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                {dict?.donation?.titleHighlight || "İnşa Edelim"}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
              {dict?.donation?.description ||
                "KAPDEM'e destek olarak araştırma ve geliştirme projelerimizin devamlılığını sağlayın. Her katkı, daha güçlü bir gelecek için önemli."}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto py-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-slate-400 text-sm">
                {dict?.donation?.stats?.supporters || "Destekçi"}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">50+</div>
              <div className="text-slate-400 text-sm">
                {dict?.donation?.stats?.projects || "Proje"}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">3+</div>
              <div className="text-slate-400 text-sm">
                {dict?.donation?.stats?.experience || "Yıllık Deneyim"}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href={`/${lang}/donate`}
              className="group relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
            >
              <Heart className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-white text-base font-semibold">
                {dict?.donation?.buttons?.donate || "Bağış Yap"}
              </span>
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            </Link>

            <Link
              href={`/${lang}/membership`}
              className="group relative w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300 border-2 border-white/20 hover:border-white/30 hover:scale-105"
            >
              <CreditCard className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-white text-base font-semibold">
                {dict?.donation?.buttons?.membership || "Üyelik Sistemi"}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
