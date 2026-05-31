import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { ka, enUS } from "date-fns/locale";
import ChevronRightIcon from "../assets/icons/chevron-right.svg?react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GoogleEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  htmlLink: string;
  colorId?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY as string;
const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID as string;

// Google event colour mapping (colorId → hex)
const EVENT_COLORS: Record<string, string> = {
  "1": "#7986CB", // Lavender
  "2": "#33B679", // Sage
  "3": "#8E24AA", // Grape
  "4": "#E67C73", // Flamingo
  "5": "#F6BF26", // Banana
  "6": "#F4511E", // Tangerine
  "7": "#039BE5", // Peacock
  "8": "#616161", // Graphite
  "9": "#3F51B5", // Blueberry
  "10": "#0B8043", // Basil
  "11": "#D50000", // Tomato
};
const DEFAULT_COLOR = "#4e9a8f"; // brand primary

// ─── Helpers ──────────────────────────────────────────────────────────────────

function eventColor(event: GoogleEvent): string {
  return event.colorId ? (EVENT_COLORS[event.colorId] ?? DEFAULT_COLOR) : DEFAULT_COLOR;
}

function eventStart(event: GoogleEvent): Date {
  const raw = event.start.dateTime ?? event.start.date ?? "";
  return parseISO(raw);
}

function eventEnd(event: GoogleEvent): Date {
  const raw = event.end.dateTime ?? event.end.date ?? "";
  return parseISO(raw);
}

function isAllDay(event: GoogleEvent): boolean {
  return !event.start.dateTime;
}

function formatEventTime(event: GoogleEvent, locale: Locale): string {
  if (isAllDay(event)) return "";
  return `${format(eventStart(event), "HH:mm", { locale })} – ${format(
    eventEnd(event),
    "HH:mm",
    { locale }
  )}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

const GoogleCalendar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "ka" ? ka : enUS;

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<GoogleEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<GoogleEvent | null>(null);

  // ── Fetch events for the current month (+ a buffer) ──────────────────────
  const fetchEvents = useCallback(async (month: Date) => {
    if (!API_KEY || API_KEY === "YOUR_GOOGLE_API_KEY") {
      setError("google_calendar_not_configured");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const timeMin = startOfMonth(month).toISOString();
      const timeMax = endOfMonth(month).toISOString();
      const url = new URL(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          CALENDAR_ID
        )}/events`
      );
      url.searchParams.set("key", API_KEY);
      url.searchParams.set("timeMin", timeMin);
      url.searchParams.set("timeMax", timeMax);
      url.searchParams.set("singleEvents", "true");
      url.searchParams.set("orderBy", "startTime");
      url.searchParams.set("maxResults", "250");

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEvents((data.items as GoogleEvent[]) ?? []);
    } catch (err) {
      console.error(err);
      setError("error_occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents(currentMonth);
  }, [currentMonth, fetchEvents]);

  // ── Calendar grid helpers ─────────────────────────────────────────────────
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  // Include days from surrounding weeks so the grid is always complete
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const gridDays = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const getEventsForDay = (day: Date) =>
    events.filter((e) => {
      const start = eventStart(e);
      const end = eventEnd(e);
      return day >= start && day <= end;
    });

  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  const weekDayLabels =
    i18n.language === "ka"
      ? ["ორ", "სა", "ოთ", "ხუ", "პა", "შა", "კვ"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-6xl mx-auto p-4 mb-10">
      {/* ── Page title ── */}
      <h2 className="title mb-6">{t("google_calendar")}</h2>

      {/* ── Not configured banner ── */}
      {error === "google_calendar_not_configured" && (
        <div className="mb-6 rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-800 text-sm">
          <strong>Google Calendar not configured.</strong> Set{" "}
          <code>VITE_GOOGLE_CALENDAR_API_KEY</code> and{" "}
          <code>VITE_GOOGLE_CALENDAR_ID</code> in your <code>.env</code> file.
        </div>
      )}

      {error && error !== "google_calendar_not_configured" && (
        <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700 text-sm">
          {t(error)}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ═══════════════════════════════════════════════════════════════════
            LEFT — Calendar grid
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="flex-1">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-primary">
              {format(currentMonth, "LLLL yyyy", { locale })}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
                className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronRightIcon className="rotate-180 w-4 h-4 text-primary" />
              </button>
              <button
                onClick={() => setCurrentMonth(new Date())}
                className="px-3 h-9 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
              >
                {i18n.language === "ka" ? "დღეს" : "Today"}
              </button>
              <button
                onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
                className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
                aria-label="Next month"
              >
                <ChevronRightIcon className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>

          {/* Week-day headers */}
          <div className="grid grid-cols-7 mb-1">
            {weekDayLabels.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-semibold text-gray-500 py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
            {gridDays.map((day) => {
              const dayEvents = getEventsForDay(day);
              const isToday = isSameDay(day, new Date());
              const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;
              const inMonth = isSameMonth(day, currentMonth);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDay(day)}
                  className={`
                    relative bg-white min-h-[72px] p-1 text-left flex flex-col transition
                    ${!inMonth ? "opacity-40" : ""}
                    ${isSelected ? "ring-2 ring-inset ring-primary" : "hover:bg-gray-50"}
                    cursor-pointer
                  `}
                >
                  {/* Day number */}
                  <span
                    className={`
                      text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full mb-1
                      ${isToday ? "bg-primary text-white" : "text-gray-700"}
                    `}
                  >
                    {format(day, "d")}
                  </span>

                  {/* Event dots / labels (show up to 3) */}
                  <div className="flex flex-col gap-px w-full overflow-hidden">
                    {dayEvents.slice(0, 3).map((ev) => (
                      <span
                        key={ev.id}
                        className="text-[10px] leading-tight rounded px-1 truncate text-white"
                        style={{ backgroundColor: eventColor(ev) }}
                      >
                        {ev.summary}
                      </span>
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[10px] text-gray-500 pl-1">
                        +{dayEvents.length - 3}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {loading && (
            <p className="text-center text-sm text-gray-400 mt-4">
              {t("tts.loading")}
            </p>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            RIGHT — Selected-day event list
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="w-full lg:w-80 flex flex-col gap-3">
          <h3 className="font-bold text-primary">
            {selectedDay
              ? format(selectedDay, "d LLLL yyyy", { locale })
              : t("events")}
          </h3>

          {selectedDayEvents.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
              {t("events_not_found")}
            </div>
          ) : (
            selectedDayEvents.map((ev) => (
              <div
                key={ev.id}
                className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              >
                {/* Colour strip */}
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: eventColor(ev) }}
                />
                <div className="p-3">
                  <p className="font-semibold text-sm text-gray-800 leading-snug">
                    {ev.summary}
                  </p>
                  {!isAllDay(ev) && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {formatEventTime(ev, locale)}
                    </p>
                  )}
                  {ev.location && (
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      📍 {ev.location}
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    {ev.description && (
                      <button
                        onClick={() => setSelectedEvent(ev)}
                        className="text-xs font-medium text-primary hover:underline cursor-pointer"
                      >
                        {t("details")}
                      </button>
                    )}
                    <a
                      href={ev.htmlLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-gray-500 hover:underline"
                    >
                      Google →
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          Event detail modal
      ═══════════════════════════════════════════════════════════════════════ */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header strip */}
            <div
              className="h-2"
              style={{ backgroundColor: eventColor(selectedEvent) }}
            />
            <div className="flex items-start justify-between px-5 pt-4 pb-2 border-b">
              <div>
                <h3 className="font-bold text-lg text-gray-900 leading-snug">
                  {selectedEvent.summary}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {isAllDay(selectedEvent)
                    ? format(eventStart(selectedEvent), "d LLLL yyyy", { locale })
                    : `${format(eventStart(selectedEvent), "d LLLL yyyy · HH:mm", {
                        locale,
                      })} – ${format(eventEnd(selectedEvent), "HH:mm", {
                        locale,
                      })}`}
                </p>
                {selectedEvent.location && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    📍 {selectedEvent.location}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="ml-4 text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer flex-shrink-0"
                aria-label={t("close")}
              >
                ✕
              </button>
            </div>

            <div className="px-5 py-4 max-h-80 overflow-y-auto">
              {selectedEvent.description ? (
                <div
                  className="prose prose-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                />
              ) : (
                <p className="text-sm text-gray-400">{t("events_not_found")}</p>
              )}
            </div>

            <div className="px-5 pb-4 flex justify-between items-center">
              <a
                href={selectedEvent.htmlLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                {i18n.language === "ka"
                  ? "Google Calendar-ში გახსნა →"
                  : "Open in Google Calendar →"}
              </a>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-lg transition cursor-pointer"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleCalendar;
