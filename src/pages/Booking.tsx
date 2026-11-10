import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { services } from "../content";
import { supabase } from "../lib/supabase";
import { businessConfig } from "../config/business";
import { Button } from "../components/ui/Button";
import { ChevronDown, Bell } from "lucide-react";

const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

const getNext7Days = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
};

export function Booking() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") || services[0].id;

  // State
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedServiceId, setSelectedServiceId] =
    useState<string>(initialService);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Customer Details
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    agreeTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  const days = getNext7Days();
  const selectedService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  // Fetch booked slots for selected date
  useEffect(() => {
    async function fetchBookings() {
      const targetDate = formatDate(selectedDate);
      const { data, error } = await supabase
        .from("appointments")
        .select("appointment_time")
        .eq("appointment_date", targetDate)
        .neq("status", "cancelled");

      if (!error && data) {
        setBookedSlots(data.map((b) => b.appointment_time));
      }
    }
    fetchBookings();
    setSelectedTime(""); // Reset time when date changes
  }, [selectedDate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) return alert("You must agree to the terms.");
    setIsSubmitting(true);

    try {
      const { data: isAvailable, error: checkError } = await supabase.rpc(
        "check_booking_availability",
        { p_date: formatDate(selectedDate), p_time: selectedTime },
      );

      if (checkError) throw checkError;
      if (!isAvailable) {
        alert("This slot was just taken. Please choose another time.");
        setIsSubmitting(false);
        return;
      }

      const { data, error } = await supabase
        .from("appointments")
        .insert({
          service_id: selectedService.id,
          service_name: selectedService.name,
          appointment_date: formatDate(selectedDate),
          appointment_time: selectedTime,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          total_price: selectedService.price,
          deposit_amount: selectedService.depositAmount,
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      const bookingRef = data.id.split("-")[0].toUpperCase();
      const text = `Hello Blasuu Lounge! I'd like to confirm my booking.%0A%0A*Ref:* ${bookingRef}%0A*Service:* ${selectedService.name}%0A*Date:* ${formatDate(selectedDate)}%0A*Time:* ${selectedTime}%0A*Name:* ${formData.name}%0A*Deposit Due:* GH₵${selectedService.depositAmount}%0A%0APlease send payment details to confirm.`;

      window.location.href = `https://wa.me/${businessConfig.whatsappNumber}?text=${text}`;
    } catch (error) {
      console.error(error);
      alert("Error saving booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-soft py-10 px-4 flex justify-center">
      <div className="w-full max-w-md bg-white-pure rounded-[2.5rem] shadow-xl border border-elephant/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-elephant/5 text-elephant">
            &larr;
          </button>
          <h1 className="font-semibold text-elephant">Book Appointment</h1>
          <div className="w-8 h-8"></div> {/* Spacer */}
        </div>

        <div className="p-6">
          {/* Service Selector (Replaces the Doctor Card) */}
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-elephant/10 shadow-sm mb-6">
            <div className="w-12 h-12 rounded-full bg-burnt/10 flex items-center justify-center text-burnt font-serif text-xl">
              B
            </div>
            <div className="flex-1">
              <select
                className="w-full font-semibold text-elephant bg-transparent outline-none appearance-none cursor-pointer"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-elephant-muted mt-1">
                GH₵ {selectedService.price.toFixed(2)} •{" "}
                {selectedService.durationMinutes} mins
              </p>
            </div>
            <ChevronDown size={16} className="text-elephant-muted" />
          </div>

          {/* Date Selector */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-sm text-elephant">Select Date</h2>
            <span className="text-xs text-elephant-muted">
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-4">
            {days.map((day, i) => {
              const isSelected = formatDate(day) === formatDate(selectedDate);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(day)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-20 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-burnt text-white-pure border-burnt shadow-md"
                      : "bg-white-pure text-elephant border-elephant/10 hover:border-burnt/30"
                  }`}>
                  <span
                    className={`text-[10px] uppercase font-medium ${isSelected ? "text-white-pure/80" : "text-elephant-muted"}`}>
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span className="text-lg font-semibold mt-1">
                    {day.getDate()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Time Slots */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-sm text-elephant">
              Available Slots
            </h2>
            <span className="text-xs text-elephant-muted">
              {times.length - bookedSlots.length} open
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {times.map((time) => {
              const isBooked = bookedSlots.includes(time);
              const isSelected = selectedTime === time;
              const [hour, minute] = time.split(":");
              const displayHour =
                parseInt(hour) > 12 ? parseInt(hour) - 12 : hour;
              const ampm = parseInt(hour) >= 12 ? "PM" : "AM";

              return (
                <button
                  key={time}
                  disabled={isBooked}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                    isBooked
                      ? "bg-elephant/5 text-elephant-muted border-transparent cursor-not-allowed opacity-50"
                      : isSelected
                        ? "bg-burnt/10 border-burnt text-burnt"
                        : "bg-white-pure border-elephant/10 text-elephant hover:border-burnt/30"
                  }`}>
                  {displayHour}:{minute} {ampm}
                </button>
              );
            })}
          </div>

          {/* Reminder Toggle (Visual only) */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-elephant/10 mb-6">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-burnt" />
              <span className="text-sm text-elephant">
                Remind me 1 hour before
              </span>
            </div>
            <div className="w-10 h-6 bg-burnt rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white-pure rounded-full"></div>
            </div>
          </div>

          {/* Confirm / Details Flow */}
          {!showDetailsForm ? (
            <Button
              className="w-full py-4 rounded-xl shadow-lg shadow-burnt/20"
              disabled={!selectedTime}
              onClick={() => setShowDetailsForm(true)}>
              Confirm Booking &rarr;
            </Button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 animate-fade-in pt-4 border-t border-elephant/10">
              <h3 className="font-semibold text-elephant mb-2">Your Details</h3>
              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft text-sm"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft text-sm"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft text-sm"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <label className="flex items-start gap-3 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1"
                  onChange={(e) =>
                    setFormData({ ...formData, agreeTerms: e.target.checked })
                  }
                />
                <span className="text-xs text-elephant-muted">
                  I agree to the Terms & Conditions and non-refundable deposit
                  policy.
                </span>
              </label>

              <div className="flex gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDetailsForm(false)}
                  className="w-1/3">
                  Back
                </Button>
                <Button type="submit" className="w-2/3" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Confirm via WhatsApp"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
