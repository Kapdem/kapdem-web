import { ArrowRight, Calendar, Clock, MapPin, Star, User, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  featuredEvents: any;
  hoveredCard: string | null;
  setHoveredCard: (id: string | null) => void;
  getTypeIcon: (type: string) => React.ReactNode;
  formatDate: (date: string) => string;
};

export default function FeaturedEvents({
  featuredEvents,
  getTypeIcon,
  hoveredCard,
  formatDate,
  setHoveredCard,
}: Props) {
  return (
    <div className="px-4 md:px-6 lg:pr-20 mb-20">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 relative">
          {/* Floating decorative elements */}
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400/40 rounded-full animate-pulse"></div>
          <div
            className="absolute top-4 right-1/3 w-1 h-1 bg-orange-400/50 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}></div>

          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-white rounded-2xl mb-8 shadow-2xl relative overflow-hidden group">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Star className="w-6 h-6 animate-pulse relative z-10" />
            <span className="font-bold text-lg tracking-wide relative z-10">
              Öne Çıkan Etkinlikler
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 relative">
            <span className="absolute inset-0 text-slate-300 transform translate-x-1 translate-y-1 -z-10">
              Akademik ve Araştırma Odaklı Etkinlikler
            </span>
            <span className="relative z-10 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              Akademik ve Araştırma Odaklı Etkinlikler
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed relative group">
            <span className="relative inline-block group-hover:scale-105 transition-transform duration-300">
              <span className="font-semibold text-slate-700 relative">
                KAPDEM&apos;in düzenlediği özel konferans ve seminerler
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-400 to-slate-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </span>
            </span>{" "}
            ile bilimsel araştırmaları yakından takip edin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredEvents.slice(0, 2).map((event, index) => (
            <div
              key={event.id}
              onMouseEnter={() => setHoveredCard(event.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-slate-400 transition-all duration-300 shadow-sm hover:shadow-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                {/* Price Badge */}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    {getTypeIcon(event.type)}
                    <span className="font-medium">
                      {event.type === "conference"
                        ? "Konferans"
                        : event.type === "seminar"
                        ? "Seminer"
                        : event.type === "workshop"
                        ? "Çalıştay"
                        : event.type === "panel"
                        ? "Panel"
                        : event.type === "webinar"
                        ? "Webinar"
                        : event.type}
                    </span>
                  </div>
                  <div className="text-slate-500 text-sm">{event.category}</div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-600 transition-colors duration-200">
                  {event.title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.maxParticipants! - event.participants} kota kaldı</span>
                  </div>
                </div>

                {/* Speaker */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-slate-800 font-medium">{event.speaker}</div>
                    <div className="text-slate-500 text-sm">{event.speakerTitle}</div>
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-all duration-200 flex items-center justify-center gap-2">
                  <span>Kayıt Ol</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
