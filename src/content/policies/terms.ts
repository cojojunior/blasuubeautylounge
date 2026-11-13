export const fullTermsPolicy = {
  version: "1.0.0",
  lastUpdated: "November 2026",
  sections: [
    {
      id: "booking-fee",
      title: "1. Booking Fee & Refund Policy",
      content: [
        "A booking fee is required to secure your appointment. 60% of your booking fee is refundable only if you cancel at least 15 days before your appointment date. The remaining 40% is non-refundable and covers administrative and reservation costs.",
        "Cancellations made within 15 days of the appointment, no-shows, and late arrivals are not refundable. Refunds for the 60% refundable portion will be processed via your original payment method (Paystack) within 5-10 business days upon approval by management.",
      ],
    },
    {
      id: "cancellation",
      title: "2. Cancellation & Rescheduling Policy",
      content: [
        "We require at least 15 days notice prior to your appointment date to process any cancellation.",
        "If you cancel within 15 days, your booking fee is forfeited. Rescheduling carries your deposit over to the new date, provided it is done at least 15 days before the original appointment.",
        "Please arrive 10 minutes early. Lateness may result in a shortened service time to respect the next client's booking.",
      ],
    },
    {
      id: "privacy",
      title: "3. Privacy Policy",
      content: [
        "We collect your name, phone number, and email to manage your booking. We do not sell your data.",
        "Your information is stored securely using Supabase. Payment details are handled entirely by Paystack; we do not store card details on our servers.",
        "By using this website, you consent to the collection and use of your information as described in this policy.",
      ],
    },
    {
      id: "cookies",
      title: "4. Cookie Policy",
      content: [
        "We use essential cookies to ensure the website functions properly, such as remembering your cookie consent preferences.",
        "Optional analytics cookies are only loaded if you explicitly consent via our cookie banner.",
      ],
    },
    {
      id: "general",
      title: "5. General Terms",
      content: [
        "By booking an appointment at Blasuu Beauty Lounge, you agree to these terms.",
        "Payments are processed securely via Paystack. All bookings require a deposit to confirm the slot.",
        "Blasuu Beauty Lounge reserves the right to refuse service or cancel appointments in exceptional circumstances.",
      ],
    },
  ],
};
