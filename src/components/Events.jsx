import React from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Mic,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./SectionHeader";

function EventCard({ event, dict }) {
  const imageSrc =
    event.coverImage && event.coverImage.trim() !== ""
      ? event.coverImage
      : "/images/3.jpg";

  const formattedDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("tr-TR", options);
  };

  const eventSlug = event.translations?.tr.slug || event.id || event._id;
  const eventHref = event.href || `/etkinlikler/${eventSlug}`;

  return (
    <article className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 hover:border-slate-300/50 hover:-translate-y-1 flex flex-col h-full min-h-[450px]">
      {/* Image Container */}
      <div className="relative overflow-hidden flex-shrink-0">
        <div className="aspect-w-16 aspect-h-9">
          <Image
            src={imageSrc}
            alt={event.title || "Kapdem"}
            width={400}
            height={224}
            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Category Badge */}
        {event.category && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/95 text-slate-700 backdrop-blur-sm shadow-sm border border-white/20">
              {event.category}
            </span>
          </div>
        )}

        {/* Price Badge */}
        {event.price && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 backdrop-blur-sm">
              {event.price}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3 flex-shrink-0 flex-wrap">
          <Link
            href={eventHref}
            className="text-2xl md:text-lg font-bold text-black"
            aria-label={`${event.translations?.tr?.title} etkinliğini görüntüle`}
          >
            {event.translations?.tr?.title}
          </Link>
          {/* Fallback for event title */}
          {event.date && (
            <time className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formattedDate(event.date) || event.date}
            </time>
          )}
          {event.time && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {event.time}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {event.location}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight flex-shrink-0">
          <Link
            href={eventHref}
            className="hover:text-blue-600 transition-colors duration-200 group-hover:text-blue-600"
            aria-label={`${event.title} etkinliğini görüntüle`}
          >
            {event.title}
          </Link>
        </h3>

        {/* Description */}
        <div className="mb-4 flex-grow">
          {event.translations?.tr?.excerpt || event.description ? (
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
              {event.translations.tr.excerpt}
            </p>
          ) : (
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-400 rounded-full animate-spin"></div>
              <div>{dict?.contentLoading || "İçerik yükleniyor..."}</div>
            </div>
          )}
        </div>

        {/* Event Details & Read More - Always at bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            {event.participants && (
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {event.participants} {dict?.participant || "Katılımcı"}
              </span>
            )}
            {event.speakers && (
              <span className="flex items-center gap-1">
                <Mic className="w-4 h-4" />
                {event.speakers} {dict?.speaker || "Konuşmacı"}
              </span>
            )}
            {event.duration && !event.participants && !event.speakers && (
              <span>{event.duration}</span>
            )}
          </div>

          <Link
            href={eventHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group-hover:gap-2"
            aria-label={`${event.title} devamını oku`}
          >
            {dict?.readMore || "Devamı"}
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Events({ eventsData = [], dict }) {
  // Tarihe göre sıralama (en yeni önce)
  const sortedEvents = Array.isArray(eventsData)
    ? [...eventsData].sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.createdAt || a.date || 0);
        const dateB = new Date(b.publishedAt || b.createdAt || b.date || 0);
        return dateB - dateA; // En yeni önce
      })
    : [];

  // Eğer event yoksa hiçbir şey render etme
  if (!sortedEvents || sortedEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={dict?.upcomingEvents || "Yaklaşan Etkinlikler"}
          linkLabel={dict?.seeAll || "Tümünü Gör"}
          link="/etkinlikler"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {sortedEvents.slice(0, 3).map((event, index) => (
            <EventCard
              key={event.id || event._id || index}
              event={event}
              dict={dict}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
