import { PolicyLayout } from "../../components/policy/PolicyLayout";

export function Terms() {
  return (
    <PolicyLayout title="Terms & Conditions">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        By booking an appointment at Blasuu Beauty Lounge, you agree to these
        terms. Payments are processed securely via Paystack. We do not store
        card details. All bookings require a deposit to confirm the slot. Please
        arrive 10 minutes early. Lateness may result in a shortened service time
        to respect the next client's booking.
      </p>
    </PolicyLayout>
  );
}
