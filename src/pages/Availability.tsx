import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { AvailabilityCalendar } from "../components/calendar/AvailabilityCalendar";

const getNext7Days = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
};

export function Availability() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const days = getNext7Days();

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

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
        setBookedSlots(data.map((b) => b.appointment_time));
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

        {isLoading ? (
          <div className="text-center py-20 text-elephant-muted">
            Checking availability...
          </div>
        ) : (
          <AvailabilityCalendar
            selectedDate={selectedDate}
            bookedSlots={bookedSlots}
          />
        )}
      </div>
    </div>
  );
}
