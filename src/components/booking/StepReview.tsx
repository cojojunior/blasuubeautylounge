import { BookingSummary } from "./BookingSummary";
import { type Service } from "../../types/booking";
import { Button } from "../ui/Button";

interface StepReviewProps {
  service: Service;
  date: string;
  time: string;
  onNext: () => void;
  onPrev: () => void;
}

export function StepReview({
  service,
  date,
  time,
  onNext,
  onPrev,
}: StepReviewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-serif">Review Your Selection</h2>

      <BookingSummary service={service} date={date} time={time} />

      <p className="text-sm text-elephant-muted">
        Please review your appointment details above. If everything looks
        correct, proceed to enter your contact information.
      </p>

      <div className="flex gap-4 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="w-1/3">
          Back
        </Button>
        <Button type="button" onClick={onNext} className="w-2/3">
          Enter Details
        </Button>
      </div>
    </div>
  );
}
