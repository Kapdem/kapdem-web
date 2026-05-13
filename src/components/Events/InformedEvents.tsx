import { Award, Bell, TrendingUp, Users } from "lucide-react";
import React from "react";

type Props = {};

export default function InformedEvents({}: Props) {
  return (
    <div className="px-4 md:px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 rounded-3xl border-2 border-slate-200/60 p-16 text-center mb-12 overflow-hidden group">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23475569' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
          </div>

          <div className="absolute top-8 left-8 w-4 h-4 bg-slate-400/30 rounded-full animate-pulse"></div>
          <div
            className="absolute top-12 right-12 w-3 h-3 bg-slate-500/40 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}></div>
          <div
            className="absolute bottom-12 left-12 w-2 h-2 bg-slate-600/50 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-slate-800 text-white rounded-2xl mb-8 shadow-2xl relative overflow-hidden group/badge">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000"></div>

              <span className="text-2xl animate-bounce relative z-10">🏛️</span>
              <span className="font-bold text-lg tracking-wide relative z-10">
                Kamu Politikası, Devlet Yönetimi ve Toplumsal Gelişim Merkezi
              </span>
            </div>

            {/* 3D Title Effect */}
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 relative">
              <span className="absolute inset-0 text-slate-400/40 transform translate-x-2 translate-y-2 -z-10">
                Etkinliklerimizden Haberdar Olun
              </span>
              <span className="relative z-10 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Etkinliklerimizden Haberdar Olun
              </span>
            </h3>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold text-slate-700">
                KAPDEM&apos;in düzenlediği konferans, panel ve seminerler
              </span>{" "}
              hakkında güncel bilgileri almak için e-posta listemize katılın.
              <br className="hidden md:block" />
              Alanında uzman konuşmacılarımız ve değerli içeriklerimizden ilk sizin haberiniz olsun.
            </p>

            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="E-posta adresinizi girin"
                    className="w-full px-8 py-5 bg-white border-2 border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                  />
                </div>
                <button className="group px-10 py-5 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 hover:from-slate-900 hover:via-slate-800 hover:to-slate-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="flex items-center gap-3 relative z-10">
                    <Bell className="w-6 h-6 group-hover:animate-bounce" />
                    <span className="text-lg">Bildirim Al</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="group flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Award className="w-8 h-8 text-slate-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-left">
                  <div className="text-slate-800 font-bold text-lg group-hover:text-slate-700 transition-colors duration-300">
                    Kaliteli İçerik
                  </div>
                  <div className="text-slate-500 text-sm">Uzman konuşmacılar ve akademisyenler</div>
                </div>
              </div>

              <div className="group flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Users className="w-8 h-8 text-slate-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-left">
                  <div className="text-slate-800 font-bold text-lg group-hover:text-slate-700 transition-colors duration-300">
                    Networking
                  </div>
                  <div className="text-slate-500 text-sm">Değerli bağlantılar ve iş birlikleri</div>
                </div>
              </div>

              <div className="group flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <TrendingUp className="w-8 h-8 text-slate-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-left">
                  <div className="text-slate-800 font-bold text-lg group-hover:text-slate-700 transition-colors duration-300">
                    Sürekli Gelişim
                  </div>
                  <div className="text-slate-500 text-sm">Mesleki ve akademik gelişim</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
