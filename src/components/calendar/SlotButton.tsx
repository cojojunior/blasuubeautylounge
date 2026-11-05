import { Link } from "react-router-dom";

interface SlotButtonProps {
  time: string;
  isBooked: boolean;
  date: string;
}

export function SlotButton({ time, isBooked, date }: SlotButtonProps) {
  const [hour, minute] = time.split(":");
  const displayHour = parseInt(hour) > 12 ? parseInt(hour) - 12 : hour;
  const ampm = parseInt(hour) >= 12 ? "PM" : "AM";
  const displayTime = `${displayHour}:${minute} ${ampm}`;

  if (isBooked) {
    return (
      <div className="p-4 rounded-xl border border-elephant/5 bg-elephant/5 text-center cursor-not-allowed">
        <p className="text-sm font-medium text-elephant-muted line-through">
          {displayTime}
        </p>
        <p className="text-xs text-elephant-muted mt-1">Booked</p>
      </div>
    );
  }

  return (
    <Link
      to={`/book?date=${date}&time=${time}`}
      className="p-4 rounded-xl border border-burnt/20 bg-burnt/5 text-center hover:bg-burnt hover:text-white-pure transition-colors group">
      <p className="text-sm font-medium text-burnt group-hover:text-white-pure">
        {displayTime}
      </p>
      <p className="text-xs text-burnt/70 group-hover:text-white-pure/80 mt-1">
        Available
      </p>
    </Link>
  );
}
