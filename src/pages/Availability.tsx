import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { formatDateForDB, formatTimeDisplay } from "../lib/datetime"; // NEW

const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];
const HOLIDAYS = ["2026-12-25", "2026-12-26"]; // You can eventually pull this from your database

export function Availability() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [monthBookings, setMonthBookings] = useState<Record<string, string[]>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  const prevMonth = () => {
    const today = new Date();
    if (
      currentMonth.getMonth() > today.getMonth() ||
      currentMonth.getFullYear() > today.getFullYear()
    ) {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
      );
    }
  };

  // Fetch ALL bookings for the current month to color the calendar dots
  useEffect(() => {
    async function fetchMonthAvailability() {
      setIsLoading(true);
      try {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = formatDateForDB(new Date(year, month, 1)); // NEW
        const lastDay = formatDateForDB(new Date(year, month + 1, 0)); // NEW

        const { data, error } = await supabase
          .from("appointments")
          .select("appointment_date, appointment_time")
          .gte("appointment_date", firstDay)
          .lte("appointment_date", lastDay)
          .neq("status", "cancelled");

        if (error) throw error;

        const grouped: Record<string, string[]> = {};
        data.forEach((booking) => {
          if (!grouped[booking.appointment_date])
            grouped[booking.appointment_date] = [];
          grouped[booking.appointment_date].push(booking.appointment_time);
        });

        setMonthBookings(grouped);
      } catch (error) {
        console.error("Error fetching month availability:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMonthAvailability();
  }, [currentMonth]);

  // Fetch specific time slots when a user clicks a date
  useEffect(() => {
    const targetDate = formatDateForDB(selectedDate); // NEW
    setBookedSlots(monthBookings[targetDate] || []);
  }, [selectedDate, monthBookings]);

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-14"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      const dateString = formatDateForDB(dateObj); // NEW
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const isPast = dateObj < today;
      const isSelected = selectedDate.toDateString() === dateObj.toDateString();
      const isHoliday = HOLIDAYS.includes(dateString);

      const dayBookedSlots = monthBookings[dateString] || [];
      const isFullyBooked = dayBookedSlots.length >= times.length;
      const isPartiallyBooked = dayBookedSlots.length > 0 && !isFullyBooked;

      let statusDot = null;
      if (isHoliday) {
        statusDot = (
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 absolute bottom-2" />
        );
      } else if (isFullyBooked) {
        statusDot = (
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 absolute bottom-2" />
        );
      } else if (isPartiallyBooked) {
        statusDot = (
          <div className="w-1.5 h-1.5 rounded-full bg-gold absolute bottom-2" />
        );
      } else {
        statusDot = (
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 absolute bottom-2" />
        );
      }

      days.push(
        <button
          key={d}
          type="button"
          disabled={isPast || isHoliday}
          onClick={() => setSelectedDate(dateObj)}
          className={`relative h-14 w-full flex flex-col items-center justify-center rounded-full transition-all ${
            isPast || isHoliday
              ? "text-elephant-muted/30 cursor-not-allowed"
              : isSelected
                ? "bg-burnt text-white-pure shadow-md"
                : "text-elephant hover:bg-elephant/5"
          }`}>
          <span className="text-sm font-medium">{d}</span>
          {!isPast && statusDot}
        </button>,
      );
    }
    return days;
  };

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4 text-elephant">
            Live Availability
          </h1>
          <p className="text-elephant-muted">
            Select a date to see open time slots.
          </p>
        </div>

        {/* Calendar View */}
        <div className="bg-white-pure p-6 rounded-[2rem] border border-elephant/10 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-elephant">
              Select date
            </h2>
            <div className="flex items-center gap-2 bg-elephant/5 rounded-lg px-3 py-1.5">
              <button
                type="button"
                onClick={prevMonth}
                className="text-elephant hover:text-burnt">
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm font-medium text-elephant min-w-[100px] text-center">
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="text-elephant hover:text-burnt">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div
                key={i}
                className="text-xs font-semibold text-elephant-muted mb-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-2 gap-x-1">
            {renderCalendar()}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-elephant/10">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-elephant-muted">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gold" />
              <span className="text-xs text-elephant-muted">Filling Fast</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="text-xs text-elephant-muted">Fully Booked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs text-elephant-muted">
                Holiday/Closed
              </span>
            </div>
          </div>
        </div>

        {/* Selected Date Slots */}
        <div className="bg-white-pure p-8 rounded-[2rem] border border-elephant/10 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-elephant">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h2>
            {isLoading && (
              <Loader2 size={18} className="animate-spin text-burnt" />
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {times.map((time) => {
              const isBooked = bookedSlots.includes(time);
              // Use formatTimeDisplay here
              const displayTime = formatTimeDisplay(time);

              return (
                <div
                  key={time}
                  className={`py-3 rounded-xl border text-center text-sm font-medium ${
                    isBooked
                      ? "bg-elephant/5 text-elephant-muted border-transparent line-through opacity-60"
                      : "bg-white-pure border-elephant/20 text-elephant"
                  }`}>
                  {displayTime}
                  <span className="block text-[10px] mt-1 opacity-70">
                    {isBooked ? "Booked" : "Available"}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Link
              to={`/book?date=${formatDateForDB(selectedDate)}`} // NEW
              className="block w-full text-center bg-burnt hover:bg-burnt-dark text-white-pure py-4 rounded-xl font-medium transition-colors">
              Book an Appointment for this day
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
