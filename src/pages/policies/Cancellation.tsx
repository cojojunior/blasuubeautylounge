import { PolicyLayout } from "../../components/policy/PolicyLayout";
import { cancellationPolicy } from "../../content/policies/cancellation";

export function Cancellation() {
  return (
    <PolicyLayout title="Cancellation Policy">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        {cancellationPolicy.content}
      </p>
    </PolicyLayout>
  );
}
