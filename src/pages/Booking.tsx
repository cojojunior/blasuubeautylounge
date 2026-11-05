import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { services } from "../content/services";
import { supabase } from "../lib/supabase";
import { businessConfig } from "../config/business";
import { useBookingForm } from "../hooks/useBookingForm";

// Import our new separated components
import { StepService } from "../components/booking/StepService";
import { StepDate } from "../components/booking/StepDate";
import { StepDetails } from "../components/booking/StepDetails";

export function Booking() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") || services[0].id;
  const initialDate = searchParams.get("date") || "";
  const initialTime = searchParams.get("time") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use our custom hook to manage state
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
        setStep(2);
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
          setStep(2);
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
          <div className="flex justify-between mb-8 pb-4 border-b border-elephant/10">
            <span
              className={`text-sm font-medium ${step >= 1 ? "text-burnt" : "text-elephant-muted"}`}>
              1. Service
            </span>
            <span
              className={`text-sm font-medium ${step >= 2 ? "text-burnt" : "text-elephant-muted"}`}>
              2. Date & Time
            </span>
            <span
              className={`text-sm font-medium ${step >= 3 ? "text-burnt" : "text-elephant-muted"}`}>
              3. Details
            </span>
          </div>

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
                time={formData.time}
                onDateChange={(val) => updateField("date", val)}
                onTimeChange={(val) => updateField("time", val)}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {step === 3 && (
              <StepDetails
                service={selectedService}
                date={formData.date}
                time={formData.time}
                formData={formData}
                updateField={updateField}
                onSubmit={handleSubmit}
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
