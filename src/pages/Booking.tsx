import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { services } from "../content/services";
import { supabase } from "../lib/supabase";
import { businessConfig } from "../config/business";
import { useBookingForm } from "../hooks/useBookingForm";

import { BookingStepper } from "../components/booking/BookingStepper";
import { StepService } from "../components/booking/StepService";
import { StepDate } from "../components/booking/StepDate";
import { StepTime } from "../components/booking/StepTime";
import { StepReview } from "../components/booking/StepReview";
import { StepDetails } from "../components/booking/StepDetails";

export function Booking() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") || services[0].id;
  const initialDate = searchParams.get("date") || "";
  const initialTime = searchParams.get("time") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { step, formData, updateField, nextStep, prevStep, setStep } =
    useBookingForm(initialService, initialDate, initialTime);

  const selectedService =
    services.find((s) => s.id === formData.serviceId) || services[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) return alert("You must agree to the terms.");

    setIsSubmitting(true);

    try {
      const { data: isAvailable, error: checkError } = await supabase.rpc(
        "check_booking_availability",
        {
          p_date: formData.date,
          p_time: formData.time,
        },
      );

      if (checkError) throw checkError;

      if (!isAvailable) {
        alert(
          "Sorry, this time slot is already booked. Please select another time.",
        );
        setStep(3); // Send them back to Time selection
        setIsSubmitting(false);
        return;
      }

      const { data, error } = await supabase
        .from("appointments")
        .insert({
          service_id: selectedService.id,
          service_name: selectedService.name,
          appointment_date: formData.date,
          appointment_time: formData.time,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          total_price: selectedService.price,
          deposit_amount: selectedService.depositAmount,
          status: "pending",
        })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          alert("This slot was just taken. Please choose another time.");
          setStep(3);
          setIsSubmitting(false);
          return;
        }
        throw error;
      }

      const bookingRef = data.id.split("-")[0].toUpperCase();
      const text = `Hello Blasuu Lounge! I'd like to confirm my booking.%0A%0A*Ref:* ${bookingRef}%0A*Service:* ${selectedService.name}%0A*Date:* ${formData.date}%0A*Time:* ${formData.time}%0A*Name:* ${formData.name}%0A*Deposit Due:* GH₵${selectedService.depositAmount}%0A%0APlease send payment details to confirm.`;

      window.location.href = `https://wa.me/${businessConfig.whatsappNumber}?text=${text}`;
    } catch (error) {
      console.error("Booking error:", error);
      alert(
        "There was an error saving your booking. Please try again or contact us via WhatsApp.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 bg-white-soft min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white-pure p-8 rounded-3xl border border-elephant/10 shadow-lg">
          <BookingStepper currentStep={step} />

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <StepService
                selectedId={formData.serviceId}
                onChange={(val) => updateField("serviceId", val)}
                onNext={nextStep}
              />
            )}

            {step === 2 && (
              <StepDate
                date={formData.date}
                onDateChange={(val) => updateField("date", val)}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {step === 3 && (
              <StepTime
                time={formData.time}
                onTimeChange={(val) => updateField("time", val)}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {step === 4 && (
              <StepReview
                service={selectedService}
                date={formData.date}
                time={formData.time}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {step === 5 && (
              <StepDetails
                formData={formData}
                updateField={updateField}
                onPrev={prevStep}
                isSubmitting={isSubmitting}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
