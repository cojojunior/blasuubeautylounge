import { Link } from "react-router-dom";
import { PolicyLayout } from "../../components/policy/PolicyLayout";
import { policyConfig } from "../../content/policies/bookingFee";

export function Terms() {
  return (
    <PolicyLayout title="Terms & Conditions">
      <div className="mb-10 text-sm text-elephant-muted">
        <p>Last Updated: November 2026</p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-serif font-semibold text-elephant mb-4">
            1. Booking & Payments
          </h2>
          <p className="text-elephant-muted leading-relaxed">
            By booking an appointment, you agree to pay a non-refundable booking
            fee of {policyConfig.bookingFeePercentage}%. This fee secures your
            slot and is processed securely via Moolre. The remaining balance is
            due at the salon.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-elephant mb-4">
            2. Cancellations
          </h2>
          <p className="text-elephant-muted leading-relaxed">
            Cancellations or rescheduling must be made at least{" "}
            {policyConfig.cancellationWindowDays} days prior to your
            appointment. Failure to do so results in the forfeiture of your
            booking fee.
            <Link
              to="/policies/cancellation"
              className="block mt-2 text-burnt hover:underline text-sm">
              View full Cancellation Policy
            </Link>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-elephant mb-4">
            3. Privacy & Data
          </h2>
          <p className="text-elephant-muted leading-relaxed">
            Your data is collected solely for managing your booking and is
            handled in accordance with our Privacy Policy.
            <Link
              to="/policies/privacy"
              className="block mt-2 text-burnt hover:underline text-sm">
              View full Privacy Policy
            </Link>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-elephant mb-4">
            4. Late Arrivals
          </h2>
          <p className="text-elephant-muted leading-relaxed">
            Please arrive 10 minutes early. Late arrivals may result in a
            shortened service time to respect the next client's booking.
          </p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-elephant/10">
        <p className="text-sm text-elephant-muted">
          If you have any questions, please contact us at{" "}
          <a
            href="mailto:blasuugroup@gmail.com"
            className="text-burnt hover:underline">
            blasuugroup@gmail.com
          </a>
          .
        </p>
      </div>
    </PolicyLayout>
  );
}
