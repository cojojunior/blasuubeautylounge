import { BookingSummary } from "./BookingSummary";
import { DepositNotice } from "./DepositNotice";
import { ConsentBlock } from "./ConsentBlock";
import { Button } from "../ui/Button";
import { type Service, type BookingFormData } from "../../types/booking";

interface StepDetailsProps {
  service: Service;
  date: string;
  time: string;
  formData: BookingFormData;
  updateField: (field: keyof BookingFormData, value: any) => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

export function StepDetails({
  service,
  date,
  time,
  formData,
  updateField,
  onPrev,
  isSubmitting,
}: StepDetailsProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-serif">Your Details</h2>

      <BookingSummary service={service} date={date} time={time} />

      <div className="grid grid-cols-1 gap-4">
        <input
          required
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft"
          onChange={(e) => updateField("name", e.target.value)}
        />
        <input
          required
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft"
          onChange={(e) => updateField("phone", e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft"
          onChange={(e) => updateField("email", e.target.value)}
        />
      </div>

      <DepositNotice />
      <ConsentBlock
        checked={formData.agreeTerms}
        onChange={(val) => updateField("agreeTerms", val)}
      />

      <div className="flex gap-4 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="w-1/3"
          disabled={isSubmitting}>
          Back
        </Button>
        <Button type="submit" className="w-2/3" disabled={isSubmitting}>
          {isSubmitting ? "Checking Availability..." : "Confirm via WhatsApp"}
        </Button>
      </div>
    </div>
  );
}
