import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const getNext7Days = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
};

const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

export function Availability() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const days = getNext7Days();

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    async function fetchBookings() {
      setIsLoading(true);
      try {
        const targetDate = formatDate(selectedDate);

        const { data, error } = await supabase
          .from("appointments")
          .select("appointment_time")
          .eq("appointment_date", targetDate)
          .neq("status", "cancelled");

        if (error) throw error;

        const times = data.map((b) => b.appointment_time);
        setBookedSlots(times);
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, [selectedDate]);

  return (
    <div className="py-20 bg-white-soft min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-elephant">
            Live Availability
          </h1>
          <p className="text-elephant-muted">
            Select a date to see open time slots.
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {days.map((day, index) => {
            const isSelected = formatDate(day) === formatDate(selectedDate);
            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-20 h-24 rounded-2xl border transition-all ${
                  isSelected
                    ? "bg-burnt text-white-pure border-burnt shadow-md"
                    : "bg-white-pure text-elephant border-elephant/10 hover:border-burnt/50"
                }`}>
                <span className="text-xs uppercase tracking-wider font-medium opacity-80">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-2xl font-serif mt-1">
                  {day.getDate()}
                </span>
              </button>
            );
          })}
        </div>

        <div className="bg-white-pure p-8 rounded-3xl border border-elephant/10 shadow-sm">
          <h2 className="text-xl font-serif mb-6">
            Slots for{" "}
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h2>

          {isLoading ? (
            <p className="text-elephant-muted text-center py-8">
              Checking availability...
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {times.map((time) => {
                const [hour, minute] = time.split(":");
                const displayHour =
                  parseInt(hour) > 12 ? parseInt(hour) - 12 : hour;
                const ampm = parseInt(hour) >= 12 ? "PM" : "AM";
                const displayTime = `${displayHour}:${minute} ${ampm}`;

                const isBooked = bookedSlots.includes(time);

                return isBooked ? (
                  <div
                    key={time}
                    className="p-4 rounded-xl border border-elephant/5 bg-elephant/5 text-center cursor-not-allowed">
                    <p className="text-sm font-medium text-elephant-muted line-through">
                      {displayTime}
                    </p>
                    <p className="text-xs text-elephant-muted mt-1">Booked</p>
                  </div>
                ) : (
                  <Link
                    key={time}
                    to={`/book?date=${formatDate(selectedDate)}&time=${time}`}
                    className="p-4 rounded-xl border border-burnt/20 bg-burnt/5 text-center hover:bg-burnt hover:text-white-pure transition-colors group">
                    <p className="text-sm font-medium text-burnt group-hover:text-white-pure">
                      {displayTime}
                    </p>
                    <p className="text-xs text-burnt/70 group-hover:text-white-pure/80 mt-1">
                      Available
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
