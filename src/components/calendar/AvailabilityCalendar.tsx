import { SlotButton } from "./SlotButton";
import { SlotLegend } from "./SlotLegend";

interface AvailabilityCalendarProps {
  selectedDate: Date;
  bookedSlots: string[];
}

const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

export function AvailabilityCalendar({
  selectedDate,
  bookedSlots,
}: AvailabilityCalendarProps) {
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const targetDate = formatDate(selectedDate);

  return (
    <div className="bg-white-pure p-8 rounded-3xl border border-elephant/10 shadow-sm">
      <h2 className="text-xl font-serif mb-6">
        Slots for{" "}
        {selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {times.map((time) => (
          <SlotButton
            key={time}
            time={time}
            isBooked={bookedSlots.includes(time)}
            date={targetDate}
          />
        ))}
      </div>

      <SlotLegend />
    </div>
  );
}
