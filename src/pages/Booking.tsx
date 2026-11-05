import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { services } from "../content/services";
import { policies } from "../content/policies/bookingFee";
import { Button } from "../components/ui/Button";
import { businessConfig } from "../config/business";
import { supabase } from "../lib/supabase";

export function Booking() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") || services[0].id;

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    serviceId: initialService,
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
    agreeTerms: false,
  });

  const selectedService =
    services.find((s) => s.id === formData.serviceId) || services[0];
  const balance = selectedService.price - selectedService.depositAmount;

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) return alert("You must agree to the terms.");

    setIsSubmitting(true);

    try {
      // 1. Check Availability (Double Booking Prevention)
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
        setStep(2); // Send them back to date/time selection
        setIsSubmitting(false);
        return;
      }

      // 2. Save to Database
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
        // Catch database constraint errors if two people book at the exact same millisecond
        if (error.code === "23505") {
          alert("This slot was just taken. Please choose another time.");
          setStep(2);
          setIsSubmitting(false);
          return;
        }
        throw error;
      }

      // 3. Generate the WhatsApp message with the real Booking Reference (ID)
      const bookingRef = data.id.split("-")[0].toUpperCase(); // Short reference

      const text = `Hello Blasuu Lounge! I'd like to confirm my booking.%0A%0A*Ref:* ${bookingRef}%0A*Service:* ${selectedService.name}%0A*Date:* ${formData.date}%0A*Time:* ${formData.time}%0A*Name:* ${formData.name}%0A*Deposit Due:* GH₵${selectedService.depositAmount}%0A%0APlease send payment details to confirm.`;

      // 4. Redirect to WhatsApp
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
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-serif">Select Service</h2>
                <select
                  className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft focus:ring-burnt focus:border-burnt"
                  value={formData.serviceId}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceId: e.target.value })
                  }>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} - GH₵{s.price}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-full mt-4">
                  Continue to Date
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-serif">Choose Date & Time</h2>
                <div>
                  <label className="block text-sm mb-2 text-elephant-muted">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-elephant-muted">
                    Time
                  </label>
                  <select
                    required
                    className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }>
                    <option value="">Select a time...</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                  </select>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrev}
                    className="w-1/3">
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-2/3"
                    disabled={!formData.date || !formData.time}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-serif">Your Details</h2>

                <div className="bg-white-soft p-4 rounded-lg border border-elephant/10 mb-6">
                  <p className="font-medium text-sm mb-1">
                    {selectedService.name}
                  </p>
                  <p className="text-sm text-elephant-muted">
                    {formData.date} at {formData.time}
                  </p>
                  <div className="mt-3 pt-3 border-t border-elephant/10 flex justify-between text-sm">
                    <span>Total Price:</span>
                    <span className="font-medium">
                      GH₵{selectedService.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-burnt font-medium mt-1">
                    <span>Required Deposit:</span>
                    <span>GH₵{selectedService.depositAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-elephant-muted mt-1">
                    <span>Balance Due at Salon:</span>
                    <span>GH₵{balance.toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="bg-burnt/5 p-4 rounded-lg border border-burnt/20 text-sm">
                  <p className="font-medium text-elephant mb-2">
                    Non-Refundable Notice
                  </p>
                  <p className="text-elephant-muted mb-3">
                    {policies.bookingFee.content}
                  </p>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-1"
                      checked={formData.agreeTerms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          agreeTerms: e.target.checked,
                        })
                      }
                    />
                    <span className="text-xs">
                      I accept the Terms & Conditions, Booking Fee Policy, and
                      Cancellation Policy.
                    </span>
                  </label>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrev}
                    className="w-1/3"
                    disabled={isSubmitting}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-2/3"
                    disabled={isSubmitting}>
                    {isSubmitting
                      ? "Checking Availability..."
                      : "Confirm via WhatsApp"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
