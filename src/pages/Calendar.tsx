import React, { useEffect, useState } from "react";
import { addMonths, subMonths, format, addDays, isSameDay } from "date-fns";
import ChevronRightIcon from '../assets/icons/chevron-right.svg?react';
import { useApiStore } from "../store/apiStore";

const Calendar: React.FC = () => {
  const { fetchEvents } = useApiStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events = [
    { id: 1, title: "Event 1", date: "2025-09-10", description: "Description for Event 1", color: "blue" },
    { id: 2, title: "Event 2", date: "2025-09-10", description: "Description for Event 2", color: "blue" },
    { id: 3, title: "Event 3", date: "2025-09-10", description: "Description for Event 3", color: "blue" },
    { id: 4, title: "Event 4", date: "2025-09-15", description: "Description for Event 4", color: "green" },
    { id: 5, title: "Event 5", date: "2025-09-20", description: "Description for Event 5", color: "red" },
  ];

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const getEventsForDay = (day: Date) => {
    return events.filter((e) => {
      const eventDate = new Date(e.date);
      return (
        day.getFullYear() === eventDate.getFullYear() &&
        day.getMonth() === eventDate.getMonth() &&
        day.getDate() === eventDate.getDate()
      );
    });
  };

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

        {/* Selected date description */}
        <div className="w-full md:w-1/2">
          {selectedDate && selectedEvents.length > 0 ? (
            <div className="p-4 border rounded bg-gray-50">
              <h2 className="font-bold mb-2">Events on {format(selectedDate, "PPP")}</h2>
              {selectedEvents.map((event, idx) => (
                <div key={idx} className="mb-4 border-b pb-2">
                  <h3 className="font-semibold" style={{ color: event.color }}>
                    {event.title}
                  </h3>
                  <p>{event.description || "No description"}</p>
                  <p className="text-sm text-gray-500">Date: {format(new Date(event.date), "PPP")}</p>
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
