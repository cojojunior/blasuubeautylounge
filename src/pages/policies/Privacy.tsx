import { PolicyLayout } from "../../components/policy/PolicyLayout";

export function Privacy() {
  return (
    <PolicyLayout title="Privacy Policy">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        We respect your privacy and are committed to protecting your personal
        data.
      </p>

      <h3 className="font-semibold text-elephant mt-6 mb-2">
        Information We Collect
      </h3>
      <p className="mb-4 text-elephant-muted leading-relaxed">
        When you book an appointment, we collect your name, phone number, email
        address, and booking preferences. This information is stored securely in
        our database (Supabase) and is used solely to manage your appointments.
      </p>

      <h3 className="font-semibold text-elephant mt-6 mb-2">
        Payment Information
      </h3>
      <p className="mb-4 text-elephant-muted leading-relaxed">
        Payments are processed securely via our payment gateway partner, Moolre.
        We do not collect, store, or have access to your Mobile Money PINs or
        card details.
      </p>
    </PolicyLayout>
  );
}
