import { Calendar, ChevronRight, Filter, Search, TrendingUp } from "lucide-react";
import React from "react";

type Props = {
  readonly selectedStatus: any;
  readonly setSelectedStatus: any;
  readonly setShowFilters: any;
  readonly showFilters: any;
  readonly searchTerm: any;
  readonly setSearchTerm: any;
  readonly setSelectedCategory: any;
  readonly filteredEvents: any;
  readonly setSelectedType: any;
  readonly selectedCategory: any;
  readonly selectedType: any;
  readonly categories: any;
  readonly types: any;
  readonly statuses: any;
};

export default function EventsHeroSection({
  setSelectedStatus,
  setShowFilters,
  showFilters,
  searchTerm,
  setSearchTerm,
  filteredEvents,
  setSelectedCategory,
  selectedStatus,
  setSelectedType,
  selectedCategory,
  selectedType,
  categories,
  types,
  statuses,
}: Props) {
  return (
    <div className="relative pt-24 pb-16 px-4 md:px-6 lg:pr-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-10 left-1/4 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s", animationDuration: "3s" }}></div>
            <div
              className="absolute top-20 right-1/3 w-3 h-3 bg-indigo-400/40 rounded-full animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "4s" }}></div>
            <div
              className="absolute top-32 left-1/3 w-2 h-2 bg-purple-400/50 rounded-full animate-bounce"
              style={{ animationDelay: "1.5s", animationDuration: "2.5s" }}></div>
          </div>

          <div className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-white rounded-full px-8 py-4 mb-12 shadow-2xl relative overflow-hidden group">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <Calendar className="w-6 h-6 animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase relative z-10">
              KAPDEM Etkinlikleri
            </span>
          </div>

          <div className="mb-8">
            <div className="text-lg md:text-xl text-slate-500 font-medium mb-4 tracking-wide">
              <span className="inline-block animate-pulse">🏛️</span> Kamu Politikası, Devlet
              Yönetimi ve Toplumsal Gelişim Merkezi
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-slate-600 to-slate-800 mx-auto rounded-full"></div>
          </div>

          <span className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight relative">
            <span className="relative inline-block">
              <span className="absolute inset-0 text-slate-300 transform translate-x-2 translate-y-2 -z-10">
                KAPDEM Etkinlikleri
              </span>
              <span className="relative z-10 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-4xl bg-clip-text text-transparent">
                KAPDEM Etkinlikleri
              </span>
            </span>
          </span>

          <div className="relative max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8 relative group">
              <span className="relative inline-block">
                Kamu Araştırmaları ve Politika Merkezi olarak düzenlediğimiz konferans, seminer,
                çalıştay ve panellerde
              </span>
              <br className="hidden md:block" />
              <span className="relative inline-block group-hover:scale-105 transition-transform duration-300">
                <span className="font-bold text-slate-700 relative">
                  uzmanlarla bir araya gelin
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-400 to-slate-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </span>
              </span>{" "}
              ,{" "}
              <span className="relative inline-block group-hover:scale-105 transition-transform duration-300">
                <span className="font-bold text-slate-700 relative">
                  bilgi paylaşın
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-500 to-slate-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                </span>
              </span>{" "}
              ve{" "}
              <span className="relative inline-block group-hover:scale-105 transition-transform duration-300">
                <span className="font-bold text-slate-700 relative">
                  akademik network kurun
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-600 to-slate-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></span>
                </span>
              </span>
              .
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-8">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Etkinlik ara... (başlık, açıklama, konuşmacı, etiket)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white/90 backdrop-blur-sm border-2 border-slate-200 rounded-2xl text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            />
            {searchTerm && (
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-800 text-white rounded-xl shadow-lg">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-bold">{filteredEvents.length} sonuç</span>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Quick Filter Buttons */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button
              onClick={() => setSelectedStatus("upcoming")}
              className="group px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-800 text-white rounded-2xl hover:from-slate-700 hover:to-slate-900 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">Yaklaşan Etkinlikler</span>
            </button>
            <button
              onClick={() => setSelectedCategory("Teknoloji")}
              className="group px-6 py-3 bg-white text-slate-700 rounded-2xl border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">Teknoloji</span>
            </button>
            <button
              onClick={() => setSearchTerm("ücretsiz")}
              className="group px-6 py-3 bg-white text-slate-700 rounded-2xl border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">Ücretsiz Etkinlikler</span>
            </button>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedType("all");
                setSelectedStatus("all");
              }}
              className="group px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">Temizle</span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all duration-200">
              <Filter className="w-4 h-4" />
              <span>Filtreler</span>
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-200 ${
                  showFilters ? "rotate-90" : ""
                }`}
              />
            </button>

            <div className="text-slate-600 text-sm">{filteredEvents.length} etkinlik bulundu</div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white rounded-lg border border-slate-200 mb-6 shadow-sm">
              <div>
                <label className="block text-slate-700 text-sm font-medium mb-2">Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600">
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "Tüm Kategoriler" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 text-sm font-medium mb-2">Tip</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600">
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type === "all"
                        ? "Tüm Tipler"
                        : type === "conference"
                        ? "Konferans"
                        : type === "seminar"
                        ? "Seminer"
                        : type === "workshop"
                        ? "Çalıştay"
                        : type === "panel"
                        ? "Panel"
                        : type === "webinar"
                        ? "Webinar"
                        : type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 text-sm font-medium mb-2">Durum</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600">
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "all"
                        ? "Tüm Durumlar"
                        : status === "upcoming"
                        ? "Yaklaşan"
                        : status === "ongoing"
                        ? "Devam Eden"
                        : status === "completed"
                        ? "Tamamlanan"
                        : status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
