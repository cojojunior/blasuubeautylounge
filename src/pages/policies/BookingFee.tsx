import { PolicyLayout } from "../../components/policy/PolicyLayout";
import { policyConfig } from "../../content/policies/bookingFee";

export function BookingFee() {
  return (
    <PolicyLayout title="Booking Fee & Refund Policy">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        A booking fee is required to secure your appointment.{" "}
        {policyConfig.refundablePercent}% of your booking fee is refundable only
        if you cancel at least {policyConfig.cancellationWindowDays} days before
        your appointment date. The remaining {policyConfig.nonRefundablePercent}
        % is non-refundable and covers administrative and reservation costs.
        Cancellations made within {policyConfig.cancellationWindowDays}
        days of the appointment, no-shows, and late arrivals are not refundable.
      </p>

      <div className="bg-burnt/5 p-6 rounded-xl border border-burnt/10 mt-8">
        <h3 className="font-medium text-elephant mb-2">Refund Summary</h3>
        <p className="text-sm text-elephant-muted">
          Cancellation window: {policyConfig.cancellationWindowDays} days before
          appointment.
          <br />
          Refundable amount: {policyConfig.refundablePercent}%<br />
          Non-refundable amount: {policyConfig.nonRefundablePercent}%
        </p>
      </div>
    </PolicyLayout>
  );
}
