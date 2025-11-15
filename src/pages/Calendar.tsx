import React, { useEffect, useState } from "react";
import { addMonths, subMonths, format, addDays, isSameDay } from "date-fns";
import ChevronRightIcon from "../assets/icons/chevron-right.svg?react";
import { useApiStore } from "../store/apiStore";
import Schedule from "../components/calendar/Schedule";
import { useTranslation } from "react-i18next";

const Calendar: React.FC = () => {
  const { t } = useTranslation();
  const { fetchEvents, events, eventSingle, fetchEventSingle } = useApiStore();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [eventModal, setEventModal] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // 🔥 FIXED — mark all days inside event range
  const getEventsForDay = (day: Date) => {
    return events.filter((e) => {
      const start = new Date(e.start_date);
      const end = new Date(e.end_date);
      return day >= start && day <= end;
    });
  };

  const openEventModal = (id: number) => {
    setEventModal(id);
    fetchEventSingle(id);
  };

  // Calendar range
  const monthStart = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const monthEnd = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  const allDates: Date[] = [];
  let day = new Date(monthStart);
  while (day <= monthEnd) {
    allDates.push(new Date(day));
    day = addDays(day, 1);
  }

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : [];
  const today = new Date();

  const monthKey = format(currentMonth, "MMMM").toLowerCase();
  const year = format(currentMonth, "yyyy");

  return (
    <div className="w-full h-full p-4 mb-10">
      {/* Header */}
      <div className="flex gap-2 w-full md:w-1/2 justify-between mb-4">
        <h2 className="text-xl font-bold">
          {t(`months.${monthKey}`)} {year}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded cursor-pointer"
          >
            <ChevronRightIcon className="text-primary rotate-180 w-4 h-4" />
          </button>

          <button
            onClick={handleNextMonth}
            className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded cursor-pointer"
          >
            <ChevronRightIcon className="text-primary w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body layout: calendar + sidebar */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Calendar */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-wrap w-fit gap-2">
            {allDates.map((day) => {
              const dayEvents = getEventsForDay(day);
              const isToday = isSameDay(day, today);
              const isSelected =
                selectedDate && isSameDay(day, selectedDate);

              return (
                <div
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    h-20 aspect-square flex flex-col items-center justify-center cursor-pointer border rounded relative
                    ${isToday ? "border-red-500" : "border-gray-300"}
                    ${isSelected ? "bg-blue-100" : "bg-white"}
                  `}
                >
                  <span className="font-bold">{format(day, "d")}</span>

                  {/* Event count badge */}
                  {dayEvents.length > 0 && (
                    <div className="w-6 h-6 flex items-center justify-center rounded-full text-white absolute top-1 right-1 bg-primary text-xs">
                      {dayEvents.length}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Modal */}
        {eventModal !== null && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="w-[70%] min-w-[300px] bg-white rounded-lg h-1/2">
              <div className="w-full h-2/12 border-b px-5 flex justify-between items-center">
                <span className="title">{eventSingle?.title}</span>
                <button
                  onClick={() => setEventModal(null)}
                  className="hover:text-primary cursor-pointer"
                >
                  {t("close")}
                </button>
              </div>

              <div className="overflow-y-auto h-10/12">
                <div
                  dangerouslySetInnerHTML={{
                    __html: eventSingle?.description || "",
                  }}
                  className="p-5 break-words"
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Right side — selected day events */}
        <div className="w-full md:w-1/2">
          {selectedDate && selectedEvents.length > 0 ? (
            <div className="p-4 border rounded bg-gray-50 text-gray-500">
              <h2 className="text-xl font-extrabold">
                {t("events")}{" "}
                {`${t(
                  "months." +
                    format(selectedDate, "MMMM").toLowerCase()
                )} ${format(selectedDate, "d, yyyy")}`}
              </h2>

              {selectedEvents.map((event, idx) => (
                <Schedule
                  key={idx}
                  onClick={() => openEventModal(event.id)}
                  isLast={idx === selectedEvents.length - 1}
                  description={event.description}
                  startDate={event.start_date}
                  endDate={event.end_date}
                  title={event.title}
                  color={event.color}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 border rounded bg-gray-50 text-gray-500 flex">
              <span className="text-xl font-extrabold">
                {t("events_not_found")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
