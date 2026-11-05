export function BookingFee() {
  return (
    <div className="py-20 bg-white-soft min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 bg-white-pure p-8 md:p-12 rounded-3xl border border-elephant/10 shadow-sm">
        <h1 className="text-3xl font-serif mb-6 text-elephant">
          Booking Fee & Refund Policy
        </h1>
        <p className="text-elephant-muted mb-4">
          A booking fee is required to secure your appointment. 60% of your
          booking fee is refundable only if you cancel at least 15 days before
          your appointment date. The remaining 40% is non-refundable and covers
          administrative and reservation costs. Cancellations made within 15
          days of the appointment, no-shows, and late arrivals are not
          refundable.
        </p>
      </div>
    </div>
  );
}
