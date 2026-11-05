export function Privacy() {
  return (
    <div className="py-20 bg-white-soft min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 bg-white-pure p-8 md:p-12 rounded-3xl border border-elephant/10 shadow-sm">
        <h1 className="text-3xl font-serif mb-6 text-elephant">
          Privacy Policy
        </h1>
        <p className="text-elephant-muted mb-4">
          We collect your name, phone number, and email to manage your booking.
          We do not sell your data. Your information is stored securely using
          Supabase. Payment details are handled entirely by Paystack.
        </p>
      </div>
    </div>
  );
}
