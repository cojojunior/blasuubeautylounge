import { type Service } from "../../types/booking";

interface BookingSummaryProps {
  service: Service;
  date: string;
  time: string;
}

export function BookingSummary({ service, date, time }: BookingSummaryProps) {
  const balance = service.price - service.depositAmount;

  return (
    <div className="bg-white-soft p-4 rounded-lg border border-elephant/10 mb-6">
      <p className="font-medium text-sm mb-1">{service.name}</p>
      <p className="text-sm text-elephant-muted">
        {date} at {time}
      </p>
      <div className="mt-3 pt-3 border-t border-elephant/10 flex justify-between text-sm">
        <span>Total Price:</span>
        <span className="font-medium">GH₵{service.price.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-burnt font-medium mt-1">
        <span>Required Deposit:</span>
        <span>GH₵{service.depositAmount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-elephant-muted mt-1">
        <span>Balance Due at Salon:</span>
        <span>GH₵{balance.toFixed(2)}</span>
      </div>
    </div>
  );
}
