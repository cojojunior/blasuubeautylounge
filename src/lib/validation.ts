import { z } from "zod";

export const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  agreeTerms: z.literal(true, {
    message: "You must agree to the terms",
  }),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
