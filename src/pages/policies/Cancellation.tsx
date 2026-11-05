import { PolicyLayout } from "../../components/policy/PolicyLayout";

export function Cancellation() {
  return (
    <PolicyLayout title="Cancellation Policy">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        We require at least 15 days notice prior to your appointment date to
        process any cancellation. If you cancel within 15 days, your booking fee
        is forfeited. Rescheduling carries your deposit over to the new date,
        provided it is done at least 15 days before the original appointment.
      </p>
    </PolicyLayout>
  );
}
