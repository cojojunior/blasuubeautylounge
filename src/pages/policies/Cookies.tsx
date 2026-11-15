import { PolicyLayout } from "../../components/policy/PolicyLayout";

export function Cookies() {
  return (
    <PolicyLayout title="Cookie Policy">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        We use cookies to ensure the website functions properly.
      </p>

      <h3 className="font-semibold text-elephant mt-6 mb-2">
        Essential Cookies
      </h3>
      <p className="mb-4 text-elephant-muted leading-relaxed">
        These are required for the website to operate. They allow us to remember
        your cookie preferences and process your bookings securely.
      </p>

      <h3 className="font-semibold text-elephant mt-6 mb-2">
        Optional Cookies
      </h3>
      <p className="mb-4 text-elephant-muted leading-relaxed">
        We do not currently use analytics or tracking cookies. If this changes,
        we will explicitly ask for your consent via our cookie banner before
        loading them.
      </p>
    </PolicyLayout>
  );
}
