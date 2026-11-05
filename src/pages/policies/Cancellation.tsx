export function Cancellation() {
  return (
    <div className="py-20 bg-white-soft min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 bg-white-pure p-8 md:p-12 rounded-3xl border border-elephant/10 shadow-sm">
        <h1 className="text-3xl font-serif mb-6 text-elephant">
          Cancellation Policy
        </h1>
        <p className="text-elephant-muted mb-4">
          We require at least 15 days notice prior to your appointment date to
          process any cancellation. If you cancel within 15 days, your booking
          fee is forfeited. Rescheduling carries your deposit over to the new
          date, provided it is done at least 15 days before the original
          appointment.
        </p>
      </div>
    </div>
  );
}
