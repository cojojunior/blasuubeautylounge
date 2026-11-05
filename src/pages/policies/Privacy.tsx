import { PolicyLayout } from "../../components/policy/PolicyLayout";

export function Privacy() {
  return (
    <PolicyLayout title="Privacy Policy">
      <p className="mb-4 text-elephant-muted leading-relaxed">
        We collect your name, phone number, and email to manage your booking. We
        do not sell your data. Your information is stored securely using
        Supabase. Payment details are handled entirely by Paystack.
      </p>
    </PolicyLayout>
  );
}
