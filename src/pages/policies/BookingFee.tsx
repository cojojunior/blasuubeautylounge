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
          Refund Summary
        </h3>
        <ul className="space-y-2 text-sm text-elephant-muted">
          <li>
            <strong>Cancellation window:</strong>{" "}
            {policyConfig.cancellationWindowDays} days before the appointment
          </li>
          <li>
            <strong>Refundable amount:</strong> {policyConfig.refundablePercent}
            % of the booking fee
          </li>
          <li>
            <strong>Non-refundable amount:</strong>{" "}
            {policyConfig.nonRefundablePercent}% of the booking fee
          </li>
        </ul>
      </div>
    </PolicyLayout>
  );
}
