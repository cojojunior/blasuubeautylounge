import { PolicyLayout } from "../../components/policy/PolicyLayout";
import { termsPolicy } from "../../content/policies/terms";

export function Terms() {
  return (
    <PolicyLayout title="Terms & Conditions">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        {termsPolicy.content}
      </p>
    </PolicyLayout>
  );
}
