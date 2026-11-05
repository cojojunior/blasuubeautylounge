import { PolicyLayout } from "../../components/policy/PolicyLayout";
import { privacyPolicy } from "../../content/policies/privacy";

export function Privacy() {
  return (
    <PolicyLayout title="Privacy Policy">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        {privacyPolicy.content}
      </p>
    </PolicyLayout>
  );
}
