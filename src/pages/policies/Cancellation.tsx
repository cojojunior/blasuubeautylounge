import { PolicyLayout } from "../../components/policy/PolicyLayout";
import { policyConfig } from "../../content/policies/bookingFee"; // Reusing the config

export function Cancellation() {
  return (
    <PolicyLayout title="Cancellation & Rescheduling Policy">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        We understand that life happens. However, because your booking secures a
        dedicated time slot and our team's undivided attention, we enforce a
        strict cancellation policy.
      </p>

      <h3 className="font-semibold text-elephant mt-6 mb-2">
        Cancellation Window
      </h3>
      <p className="mb-4 text-elephant-muted leading-relaxed">
        You must cancel at least{" "}
        <strong>{policyConfig.cancellationWindowDays} days</strong> prior to
        your appointment date to avoid losing your booking fee.
      </p>

      <h3 className="font-semibold text-elephant mt-6 mb-2">
        Late Cancellations & No-Shows
      </h3>
      <p className="mb-4 text-elephant-muted leading-relaxed">
        If you cancel within {policyConfig.cancellationWindowDays} days of your
        appointment, or if you do not show up, your{" "}
        {policyConfig.bookingFeePercentage}% booking fee is strictly forfeited.
      </p>

      <h3 className="font-semibold text-elephant mt-6 mb-2">Rescheduling</h3>
      <p className="mb-4 text-elephant-muted leading-relaxed">
        If you need to reschedule, you must do so at least{" "}
        {policyConfig.cancellationWindowDays} days before your original
        appointment. We will transfer your booking fee to the new date.
        Rescheduling within {policyConfig.cancellationWindowDays} days will
        result in the forfeiture of your fee.
      </p>
    </PolicyLayout>
  );
}
