import { PolicyLayout } from "../../components/policy/PolicyLayout";
import { policyConfig, policies } from "../../content/policies/bookingFee";

export function BookingFee() {
  return (
    <PolicyLayout title="Booking Fee & Refund Policy">
      <p className="mb-6 text-elephant-muted leading-relaxed">
        {policies.bookingFee.content}
      </p>

      <div className="bg-burnt/5 p-6 rounded-xl border border-burnt/10 mt-8">
        <h3 className="font-medium text-elephant mb-3 text-lg font-serif">
          Fee Summary
        </h3>
        <ul className="space-y-2 text-sm text-elephant-muted">
          <li>
            <strong>Booking Fee Amount:</strong>{" "}
            {policyConfig.bookingFeePercentage}% of the service price
          </li>
          <li>
            <strong>Refundable Amount:</strong> {policyConfig.refundablePercent}
            % (Non-refundable)
          </li>
          <li>
            <strong>Cancellation Window:</strong>{" "}
            {policyConfig.cancellationWindowDays} days before the appointment
          </li>
        </ul>
      </div>
    </PolicyLayout>
  );
}
