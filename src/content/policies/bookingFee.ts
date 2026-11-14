export const policyConfig = {
  cancellationWindowDays: 15,
  refundablePercent: 0,
  nonRefundablePercent: 100,
  bookingFeePercentage: 25,
};

export const policies = {
  bookingFee: {
    content: `A booking fee equivalent to 25% of the service price is required to secure your appointment. This booking fee is strictly non-refundable. If you cancel at least 15 days before your appointment, your deposit can be transferred to a future booking, but it will not be refunded to your original payment method. Cancellations made within 15 days, no-shows, and late arrivals will forfeit the booking fee entirely.`,
  },
};
