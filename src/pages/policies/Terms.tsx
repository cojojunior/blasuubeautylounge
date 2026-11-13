import { Link } from "react-router-dom";
import { PolicyLayout } from "../../components/policy/PolicyLayout";
import { fullTermsPolicy } from "../../content/policies/terms";

export function Terms() {
  return (
    <PolicyLayout title="Terms & Conditions">
      <div className="mb-10 text-sm text-elephant-muted">
        <p>Last Updated: {fullTermsPolicy.lastUpdated}</p>
        <p className="mt-2">
          Please read these terms carefully before booking an appointment with
          Blasuu Beauty Lounge.
        </p>
      </div>

      <div className="space-y-12">
        {fullTermsPolicy.sections.map((section) => (
          <div key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-serif font-semibold text-elephant mb-4">
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.content.map((paragraph, index) => (
                <p key={index} className="text-elephant-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Links to individual policy pages if they need more details */}
            {section.id === "booking-fee" && (
              <Link
                to="/policies/booking-fee"
                className="inline-block mt-2 text-sm text-burnt hover:underline">
                View full Booking Fee Policy
              </Link>
            )}
            {section.id === "cancellation" && (
              <Link
                to="/policies/cancellation"
                className="inline-block mt-2 text-sm text-burnt hover:underline">
                View full Cancellation Policy
              </Link>
            )}
            {section.id === "privacy" && (
              <Link
                to="/policies/privacy"
                className="inline-block mt-2 text-sm text-burnt hover:underline">
                View full Privacy Policy
              </Link>
            )}
            {section.id === "cookies" && (
              <Link
                to="/policies/cookies"
                className="inline-block mt-2 text-sm text-burnt hover:underline">
                View full Cookie Policy
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-elephant/10">
        <p className="text-sm text-elephant-muted">
          If you have any questions about these Terms & Conditions, please
          contact us at{" "}
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
