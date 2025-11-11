import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Ticket } from 'lucide-react';
import './EventsCarousel.css';

// Sample events data - replace with your JSON import
const events = [
  {
    title: "Whimsical Wednesday with Improv Lore",
    excerpt: "Dive into the whimsical world of improvisation at our Wednesday Jams! Whether you're a novice to theatre, a maverick on stage, or just dipping your toes into the world of unscripted performance, this Jam is designed…",
    thumbnails: [
      {
        max_width: 800,
        url: "https://underline.center/uploads/default/optimized/1X/0f0621d837d3330dc2a5f1f13d7877c6dc2a6723_2_800x450.jpeg"
      }
    ],
    event_starts_at: "2025-11-05 20:00:00",
    event_ends_at: "2025-11-05 22:00:00",
    featured_link: "https://insider.in/whimsical-wednesdays-with-improv-lore/event",
  },
  {
    title: "Maestro Impro™️ by Improv Lore",
    excerpt: "Maestro Impro™️ is a beloved world-famous competitive elimination-style improv format that pits twelve brave improvisers against each other. They'll take on scenes, games, and challenges from the audience to build ne…",
    thumbnails: [
      {
        max_width: 800,
        url: "https://underline.center/uploads/default/optimized/1X/acbe7ea3ffed70f63464e1367d6ac19eddc76dac_2_800x450.jpeg"
      }
    ],
    event_starts_at: "2025-11-02 19:00:00",
    event_ends_at: "2025-11-02 21:00:00",
    featured_link: null,
    url: "https://www.district.in/events/maestro-impro-by-improv-lore-buy-tickets"
  },
  {
    title: "High CaliBur Show by Improv Lore",
    excerpt: "A classic good ol' improv show packed with riddles, tongue twisters, and some nostalgia. If you've been missing having a hearty laugh at an improv show, consider this your invite to enjoy the freshest stories in town…",
    thumbnails: [
      {
        max_width: 800,
        url: "https://underline.center/uploads/default/optimized/1X/51333740ebe290bc7bd1e7acf0efbd8e6a3101ca_2_800x438.jpeg"
      }
    ],
    event_starts_at: "2025-10-31 21:00:00",
    event_ends_at: "2025-10-31 22:00:00",
    featured_link: null,
    url: "https://www.district.in/events/high-calibur-show-by-improv-lore-buy-tickets"
  }
];

export default function EventsCarousel() {
  const [viewMode, setViewMode] = useState('carousel');
  const [currentSlide, setCurrentSlide] = useState(0);

  const getImage = (event) =>
    event?.thumbnails?.find((t) => t.max_width === 800)?.url || event.image_url;

  const formatDate = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const dateStr = s.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    const startTime = s.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    const endTime = e.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    return { dateStr, startTime, endTime };
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <div className="events-root min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Upcoming Events
          </h1>
          <p className="text-gray-600 text-lg">Discover amazing experiences happening soon</p>
        </div>

  {/* Toggle */}
  <div className="events-toggle flex justify-center gap-3 mb-8">
          <button
            onClick={() => setViewMode('carousel')}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
              viewMode === 'carousel'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Carousel View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            List View
          </button>
        </div>

        {/* Carousel View */}
        {viewMode === 'carousel' ? (
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {events.map((event, idx) => (
                  <div key={idx} className="w-full flex-shrink-0">
                    <EventCardLarge event={event} image={getImage(event)} formatDate={formatDate} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-purple-600" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {events.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentSlide
                      ? 'w-8 h-2 bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, idx) => (
              <EventCardSmall key={idx} event={event} image={getImage(event)} formatDate={formatDate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EventCardLarge({ event, image, formatDate }) {
  const { dateStr, startTime, endTime } = formatDate(event.event_starts_at, event.event_ends_at);
  const buyLink = event.featured_link || event.url;

  return (
    <div className="event-card event-card-large bg-white rounded-3xl overflow-hidden shadow-2xl">
      <div className="md:flex">
        {/* Image */}
        <div className="event-card-image md:w-1/2 relative overflow-hidden group">
          <img
            src={image}
            alt={event.title}
            className="w-full h-full object-cover min-h-[400px] group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
        </div>

  {/* Content */}
  <div className="event-card-content md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {event.title}
          </h2>

          <p
            className="text-gray-600 mb-6 leading-relaxed line-clamp-4"
            dangerouslySetInnerHTML={{ __html: event.excerpt }}
          />

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="font-medium">{dateStr}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Clock className="w-5 h-5 text-pink-600" />
              <span>{startTime} - {endTime}</span>
            </div>
          </div>

          {buyLink && (
            <a
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-button inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Ticket className="w-5 h-5" />
              Get Tickets
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function EventCardSmall({ event, image, formatDate }) {
  const { dateStr, startTime, endTime } = formatDate(event.event_starts_at, event.event_ends_at);
  const buyLink = event.featured_link || event.url;

  return (
    <div className="event-card event-card-small bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
      {/* Image */}
      <div className="event-card-image relative overflow-hidden group h-48">
        <img
          src={image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
      </div>

  {/* Content */}
  <div className="event-card-content p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {event.title}
        </h3>

        <p
          className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3 flex-1"
          dangerouslySetInnerHTML={{ __html: event.excerpt }}
        />

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span className="font-medium">{dateStr}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4 text-pink-600" />
            <span>{startTime} - {endTime}</span>
          </div>
        </div>

        {buyLink && (
          <a
            href={buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="buy-button inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm"
          >
            <Ticket className="w-4 h-4" />
            Get Tickets
          </a>
        )}
      </div>
    </div>
  );
}