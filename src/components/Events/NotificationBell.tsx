import { Bell, TrendingUp } from "lucide-react";
import React from "react";

export default function NotificationBell() {
  return (
    <div className="fixed top-32 right-4 z-40 hidden lg:block">
      <div className="group relative">
        <div className="w-12 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-l-2xl shadow-2xl flex flex-col items-center justify-center cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-3xl">
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

          <Bell className="w-6 h-6 text-white mb-1 animate-pulse" />
        </div>

        {/* Expandable Content - Shows on Hover */}
        <div className="absolute top-0 right-12 w-80 bg-white/95 backdrop-blur-lg rounded-2xl border border-slate-200/60 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 overflow-hidden">
          {/* Enhanced background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 rounded-2xl"></div>

          <div className="relative z-10 p-6">
            <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-3 text-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span>Son Aktiviteler</span>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl hover:from-blue-100/80 hover:to-indigo-100/80 transition-all duration-300 group/item cursor-pointer transform hover:scale-102">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex-shrink-0 mt-1 group-hover/item:animate-pulse"></div>
                <div>
                  <span className="text-slate-800 font-medium leading-tight block">
                    Dijital Dönüşüm Konferansı
                  </span>
                  <span className="text-blue-600 font-semibold text-xs">45 yeni kayıt</span>
                  <div className="text-slate-500 text-xs mt-1">2 saat önce</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-xl hover:from-green-100/80 hover:to-emerald-100/80 transition-all duration-300 group/item cursor-pointer transform hover:scale-102">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex-shrink-0 mt-1 group-hover/item:animate-pulse"></div>
                <div>
                  <span className="text-slate-800 font-medium leading-tight block">
                    Sürdürülebilirlik Çalıştayı
                  </span>
                  <span className="text-green-600 font-semibold text-xs">Başvurular başladı</span>
                  <div className="text-slate-500 text-xs mt-1">5 saat önce</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-xl hover:from-purple-100/80 hover:to-pink-100/80 transition-all duration-300 group/item cursor-pointer transform hover:scale-102">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex-shrink-0 mt-1 group-hover/item:animate-pulse"></div>
                <div>
                  <span className="text-slate-800 font-medium leading-tight block">
                    AI Etik Paneli
                  </span>
                  <span className="text-purple-600 font-semibold text-xs">Canlı yayın açıldı</span>
                  <div className="text-slate-500 text-xs mt-1">1 gün önce</div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-4 pt-4 border-t border-slate-200/60">
              <button className="w-full px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white text-xs font-medium rounded-lg transition-all duration-200 transform hover:scale-105">
                Tüm Aktiviteleri Görüntüle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
