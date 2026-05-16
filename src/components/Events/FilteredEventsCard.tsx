import {
  Bookmark,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Play,
  Share2,
  Star,
  User,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  formatDate: (date: string) => string;
  filteredEvents: any;
  getStatusColor: any;
  getTypeIcon: (type: string) => React.ReactNode;
};

export default function FilteredEventsCard({
  formatDate,
  filteredEvents,
  getStatusColor,
  getTypeIcon,
}: Props) {
  return (
    <div className="px-4 md:px-6 lg:pr-20 pb-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Tüm Etkinlikler</h2>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Etkinlik Bulunamadı</h3>
            <p className="text-slate-500">Arama kriterlerinize uygun etkinlik bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-slate-400 transition-all duration-300 shadow-sm hover:shadow-md h-[580px] flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Status and Featured Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        event.status
                      )}`}>
                      {event.status === "upcoming"
                        ? "Yaklaşan"
                        : event.status === "ongoing"
                        ? "Devam Eden"
                        : event.status === "completed"
                        ? "Tamamlanan"
                        : event.status}
                    </div>
                    {event.featured && (
                      <div className="px-2 py-1 bg-yellow-500 text-white rounded text-xs font-medium">
                        <Star className="w-3 h-3 inline" />
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-2 bg-white/90 text-slate-700 rounded hover:bg-white transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/90 text-slate-700 rounded hover:bg-white transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Type and Category */}
                  <div className="flex items-center gap-3 mb-2 flex-shrink-0">
                    <div className="flex items-center gap-1 text-slate-600 text-xs">
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
                    <div className="text-slate-500 text-xs">{event.category}</div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-800 mb-2 flex-shrink-0 group-hover:text-slate-600 transition-colors duration-200">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-3 h-16 flex-shrink-0">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 gap-2 mb-3 text-xs text-slate-500 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 flex-shrink-0" />
                      <span>
                        {event.participants}
                        {event.maxParticipants && ` / ${event.maxParticipants}`} katılımcı
                      </span>
                    </div>
                  </div>

                  {/* Speaker */}
                  <div className="flex items-center gap-2 mb-3 p-2 bg-slate-50 rounded-lg flex-shrink-0">
                    <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-slate-800 text-xs font-medium truncate">
                        {event.speaker}
                      </div>
                      <div className="text-slate-500 text-xs truncate">{event.speakerTitle}</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3 h-12 overflow-hidden flex-shrink-0">
                    {event.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded h-fit">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Spacer */}
                  <div className="flex-grow"></div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-shrink-0">
                    {event.status === "upcoming" && (
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-all duration-200 text-sm">
                        <span>Kayıt Ol</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                    {event.status === "completed" && (
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-200 border border-slate-300 text-sm">
                        <span>Kayıtları İzle</span>
                        <Play className="w-3 h-3" />
                      </button>
                    )}
                    {event.liveStreamUrl && event.status === "upcoming" && (
                      <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-200 border border-red-300">
                        <Video className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
