import { useParams } from "react-router-dom";
import { policies, policyConfig } from "../content/policies";

export function PolicyPage() {
  const { policyName } = useParams();

  const policy =
    policyName === "terms"
      ? policies.terms
      : policyName === "privacy"
        ? policies.privacy
        : policyName === "cancellation"
          ? policies.cancellation
          : policies.bookingFee;

  return (
    <div className="py-20 bg-white-soft min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 bg-white-pure p-8 md:p-12 rounded-3xl border border-elephant/10 shadow-sm">
        <h1 className="text-3xl font-serif mb-6 text-elephant">
          {policy.title}
        </h1>
        <div className="prose prose-elephant text-elephant-muted">
          <p className="mb-4">{policy.content}</p>

          {policyName === "booking-fee" && (
            <div className="bg-burnt/5 p-6 rounded-xl border border-burnt/10 mt-8">
              <h3 className="font-medium text-elephant mb-2">Refund Summary</h3>
              <p className="text-sm">
                Cancellation window: {policyConfig.cancellationWindowDays} days
                before appointment.
                <br />
                Refundable: {policyConfig.refundablePercent}%<br />
                Non-refundable: {policyConfig.nonRefundablePercent}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
