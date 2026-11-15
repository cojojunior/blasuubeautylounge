import { PolicyLayout } from "../../components/policy/PolicyLayout";
import { policyConfig } from "../../content/policies/bookingFee";

export function Refund() {
  return (
    <PolicyLayout title="Refund Policy">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        The booking fee ({policyConfig.bookingFeePercentage}% of the service
        price) is strictly non-refundable and non-transferable.
      </p>

      <p className="mb-4 text-elephant-muted leading-relaxed">
        Once a payment is made via our online payment gateway (Moolre), it is
        processed as a reservation fee. We do not issue refunds to the original
        payment method for cancellations, no-shows, or change of mind.
      </p>

      <p className="mb-4 text-elephant-muted leading-relaxed">
        In the extremely rare event that Blasuu Beauty Lounge must cancel your
        appointment due to an emergency, we will offer you the choice of a full
        refund or a priority reschedule.
      </p>
    </PolicyLayout>
  );
}
