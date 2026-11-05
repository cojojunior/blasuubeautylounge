import { useState } from "react";
import { type BookingFormData } from "../types/booking";

export function useBookingForm(
  initialService: string,
  initialDate: string,
  initialTime: string,
) {
  // Jump to step 4 if date and time are provided
  const [step, setStep] = useState(initialDate && initialTime ? 4 : 1);

  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: initialService,
    date: initialDate,
    time: initialTime,
    name: "",
    email: "",
    phone: "",
    notes: "",
    agreeTerms: false,
  });

  const updateField = (field: keyof BookingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return {
    step,
    formData,
    updateField,
    nextStep,
    prevStep,
    setStep,
  };
}
