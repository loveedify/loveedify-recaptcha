'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, CalendarDays } from 'lucide-react';
import type { CenterEvent } from '@/lib/supabase';

type Props = {
  events: CenterEvent[];
};

const CATEGORY_STYLES: Record<string, { dot: string; badge: string; label: string }> = {
  school_event: { dot: 'bg-forest-500', badge: 'bg-forest-50 text-forest-600', label: 'School Event' },
  holiday: { dot: 'bg-golden-500', badge: 'bg-golden-50 text-golden-600', label: 'Holiday' },
  parent_event: { dot: 'bg-sage-500', badge: 'bg-sage-100 text-sage-700', label: 'Parent Event' },
  field_trip: { dot: 'bg-teal-500', badge: 'bg-teal-50 text-teal-700', label: 'Field Trip' },
  closed: { dot: 'bg-red-400', badge: 'bg-red-50 text-red-600', label: 'Center Closed' },
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

export default function EventsCalendar({ events }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startDayOfWeek = firstOfMonth.getDay();

  const monthLabel = firstOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
    setSelectedDay(null);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
    setSelectedDay(null);
  }

  function eventsOnDay(day: number) {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((e) => e.event_date === dateStr);
  }

  const eventsThisMonth = events.filter((e) => {
    const d = new Date(e.event_date + 'T00:00:00');
    return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
  });

  const selectedEvents = selectedDay !== null ? eventsOnDay(selectedDay) : eventsThisMonth;
  const selectedLabel = selectedDay !== null
    ? new Date(viewYear, viewMonth, selectedDay).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : monthLabel;

  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl border border-cream-100 shadow-soft overflow-hidden">
        {/* Month navigation */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-100">
          <button
            onClick={prevMonth}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-cream hover:bg-forest-50 hover:text-forest-500 text-muted-gray transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="font-poppins font-600 text-forest-500 text-base">{monthLabel}</h3>
          <button
            onClick={nextMonth}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-cream hover:bg-forest-50 hover:text-forest-500 text-muted-gray transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-cream-100">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-2.5 text-center text-xs font-inter font-medium text-muted-gray uppercase tracking-wide">
              {day}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {/* Empty cells for offset */}
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-16 sm:h-20 border-r border-b border-cream-100/60 last:border-r-0 bg-cream/30" />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const dayEvents = eventsOnDay(day);
            const hasEvents = dayEvents.length > 0;
            const isClosed = dayEvents.some((e) => e.category === 'closed');
            const isSelected = selectedDay === day;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className={`h-16 sm:h-20 border-r border-b border-cream-100/60 last:border-r-0 flex flex-col items-center pt-2 px-1 transition-colors relative
                  ${isClosed ? 'bg-red-50/40' : ''}
                  ${isSelected ? 'bg-forest-50 ring-2 ring-inset ring-forest-400' : 'hover:bg-cream/60'}
                `}
              >
                <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-inter font-medium transition-colors
                  ${isToday(day) ? 'bg-golden-500 text-white font-600' : isSelected ? 'text-forest-500' : 'text-charcoal'}
                `}>
                  {day}
                </span>
                {/* Event dots */}
                {hasEvents && (
                  <div className="flex gap-0.5 mt-1 flex-wrap justify-center max-w-full">
                    {dayEvents.slice(0, 3).map((e, idx) => (
                      <span
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full ${CATEGORY_STYLES[e.category]?.dot ?? 'bg-forest-500'}`}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[9px] text-muted-gray font-inter">+{dayEvents.length - 3}</span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="px-5 py-3 border-t border-cream-100 flex flex-wrap gap-x-4 gap-y-1.5">
          {Object.entries(CATEGORY_STYLES).map(([key, style]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${style.dot}`} />
              <span className="text-xs font-inter text-muted-gray">{style.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Events list panel */}
      <div className="bg-white rounded-2xl border border-cream-100 shadow-soft flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-cream-100 flex items-center justify-between">
          <div>
            <h3 className="font-poppins font-600 text-forest-500 text-sm">
              {selectedDay !== null ? 'Events on' : 'Events in'}
            </h3>
            <p className="font-poppins font-700 text-forest-500 text-base leading-tight">{selectedLabel}</p>
          </div>
          {selectedDay !== null && (
            <button
              onClick={() => setSelectedDay(null)}
              className="text-xs font-inter text-muted-gray hover:text-forest-500 transition-colors underline"
            >
              View all
            </button>
          )}
        </div>

        <div className="overflow-y-auto flex-1 p-4 space-y-3">
          {selectedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarDays className="w-10 h-10 text-muted-gray opacity-30 mb-3" />
              <p className="font-inter text-sm text-muted-gray">
                {selectedDay !== null ? 'No events on this day.' : 'No events this month.'}
              </p>
            </div>
          ) : (
            selectedEvents
              .sort((a, b) => {
                if (a.event_date !== b.event_date) return a.event_date.localeCompare(b.event_date);
                if (a.start_time && b.start_time) return a.start_time.localeCompare(b.start_time);
                return 0;
              })
              .map((ev) => {
                const style = CATEGORY_STYLES[ev.category] ?? CATEGORY_STYLES.school_event;
                const eventDate = new Date(ev.event_date + 'T00:00:00');
                return (
                  <div key={ev.id} className="flex gap-3">
                    {/* Date block (only when viewing full month) */}
                    {selectedDay === null && (
                      <div className="flex-shrink-0 w-11 text-center pt-0.5">
                        <p className="font-poppins font-700 text-forest-500 text-xl leading-none">{eventDate.getDate()}</p>
                        <p className="font-inter text-xs text-muted-gray uppercase">
                          {eventDate.toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                      </div>
                    )}
                    <div className={`flex-1 rounded-xl p-3.5 border-l-4 bg-cream ${
                      ev.category === 'holiday' ? 'border-golden-400' :
                      ev.category === 'closed' ? 'border-red-400' :
                      ev.category === 'field_trip' ? 'border-teal-400' :
                      ev.category === 'parent_event' ? 'border-sage-400' :
                      'border-forest-400'
                    }`}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-poppins font-600 text-forest-500 text-sm leading-snug">{ev.title}</h4>
                        <span className={`flex-shrink-0 text-xs font-inter font-medium px-2 py-0.5 rounded-full ${style.badge}`}>
                          {style.label}
                        </span>
                      </div>
                      {!ev.all_day && ev.start_time && (
                        <div className="flex items-center gap-1 text-muted-gray mb-1">
                          <Clock className="w-3 h-3" />
                          <span className="font-inter text-xs">
                            {formatTime(ev.start_time)}{ev.end_time ? ` – ${formatTime(ev.end_time)}` : ''}
                          </span>
                        </div>
                      )}
                      {ev.location && (
                        <div className="flex items-center gap-1 text-muted-gray mb-1">
                          <MapPin className="w-3 h-3" />
                          <span className="font-inter text-xs">{ev.location}</span>
                        </div>
                      )}
                      {ev.description && (
                        <p className="font-inter text-xs text-muted-gray leading-relaxed mt-1">{ev.description}</p>
                      )}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}
