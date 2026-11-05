import { PolicyLayout } from "../../components/policy/PolicyLayout";
import { cookiesPolicy } from "../../content/policies/cookies";

export function Cookies() {
  return (
    <PolicyLayout title="Cookie Policy">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        {cookiesPolicy.content}
      </p>
    </PolicyLayout>
  );
}
