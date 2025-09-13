import React, { useEffect, useState } from "react";
import { addMonths, subMonths, format, addDays, isSameDay } from "date-fns";
import ChevronRightIcon from '../assets/icons/chevron-right.svg?react';
import { useApiStore } from "../store/apiStore";

const Calendar: React.FC = () => {
  const { fetchEvents, events, eventSingle, fetchEventSingle } = useApiStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [eventModal, setEventModal] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, events]);

  const getEventsForDay = (day: Date) => {
    return events.filter((e) => {
      const eventDate = new Date(e.start_date);
      return (
        day.getFullYear() === eventDate.getFullYear() &&
        day.getMonth() === eventDate.getMonth() &&
        day.getDate() === eventDate.getDate()
      );
    });
  };

  const openEventModal = (id: number) => {
    setEventModal(id);
    fetchEventSingle(id);
  }

  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

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

  return (
    <div className="w-full h-full p-4 mb-10">
      {/* Header */}
      <div className="flex gap-2 w-full md:w-1/2 justify-between mb-4">
        <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
        <div className="flex gap-2">
          <button onClick={handlePrevMonth} className="w-10 h-10 flex items-center justify-center cursor-pointer bg-gray-200 rounded">
            <ChevronRightIcon className="text-primary mb-1 rotate-180 w-4 h-4 fill-primary" />
          </button>
          <button onClick={handleNextMonth} className="w-10 h-10 flex items-center justify-center cursor-pointer bg-gray-200 rounded">
            <ChevronRightIcon className="text-primary mb-1 w-4 h-4 fill-primary" />
          </button>
        </div>
      </div>

      {/* Layout: Calendar + Description */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Calendar */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-wrap gap-2">
            {allDates.map((day) => {
              const dayEvents = getEventsForDay(day);
              const isToday = isSameDay(day, today);
              const isSelected = selectedDate && isSameDay(day, selectedDate);

              return (
                <div
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    h-20 aspect-square flex flex-col items-center justify-center cursor-pointer border rounded
                    ${isToday ? "border-red-500" : "border-gray-300"}
                    ${isSelected ? "bg-blue-100" : "bg-white"}
                    relative
                  `}
                >
                  <span className="font-bold">{format(day, "d")}</span>
                  {dayEvents.length > 0 && (
                    <div
                      className="w-6 h-6 flex items-center justify-center text-white rounded-full absolute top-1 right-1 bg-primary text-xs"
                    >
                      {dayEvents.length}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {eventModal !== null &&
          <div className="fixed w-dvw flex items-center justify-center z-50 h-dvh top-0 left-0 bg-black/40">
            <div className="w-[70%] min-w-[300px] bg-white rounded-lg h-1/2">
              <div className="w-full border-b flex justify-between p-5">
                <span className="title">{eventSingle?.title}</span>
                <button className="cursor-pointer hover:text-primary" onClick={() => setEventModal(null)}>დახურვა</button>
              </div>
              <div dangerouslySetInnerHTML={{ __html: eventSingle?.description || '' }} className="p-5 w-full break-words"></div>
            </div>
          </div>
        }

        {/* Selected date description */}
        <div className="w-full md:w-1/2">
          {selectedDate && selectedEvents.length > 0 ? (
            <div className="p-4 border rounded bg-gray-50">
              <h2 className="font-bold mb-2">Events on {format(selectedDate, "PPP")}</h2>
              {selectedEvents.map((event, idx) => (
                <div key={idx} className="mb-4 border-b pb-2 cursor-pointer" onClick={() => openEventModal(event.id)}>
                  <h3 className="font-semibold" style={{ color: event.color }}>
                    {event.title}
                  </h3>
                  <div dangerouslySetInnerHTML={{ __html: event.description || '' }} className="w-full break-words"></div>
                  <p className="text-sm text-gray-500">Date: {format(new Date(event.start_date), "PPP")}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 border rounded bg-gray-50 text-gray-500">
              Select a day to see events
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
