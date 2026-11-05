import { PolicyLayout } from "../../components/policy/PolicyLayout";
import { refundPolicy } from "../../content/policies/refund";

export function Refund() {
  return (
    <PolicyLayout title="Refund Policy">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        {refundPolicy.content}
      </p>
    </PolicyLayout>
  );
}
