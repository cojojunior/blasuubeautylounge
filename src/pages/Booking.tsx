import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { allServices as services } from "../content";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { PolicyModal } from "../components/booking/PolicyModal";
import { formatDateForDB } from "../lib/datetime";
import { generateBookingMessage, getWhatsAppLink } from "../lib/whatsapp";
import { formatCurrency } from "../lib/currency";

const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

export function Booking() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") || services[0].id;

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedServiceId, setSelectedServiceId] =
    useState<string>(initialService);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    agreeTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const selectedService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const isPast = dateObj < today;
      const isSelected =
        selectedDate?.toDateString() === dateObj.toDateString();

      days.push(
        <button
          key={d}
          type="button"
          disabled={isPast}
          onClick={() => {
            setSelectedDate(dateObj);
            setSelectedTime("");
            setShowDetailsForm(false);
          }}
          className={`h-12 w-12 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-all ${
            isPast
              ? "text-elephant-muted/30 cursor-not-allowed"
              : isSelected
                ? "bg-burnt text-white-pure shadow-md"
                : "text-elephant hover:bg-elephant/5"
          }`}>
          {d}
        </button>,
      );
    }
    return days;
  };

  useEffect(() => {
    if (!selectedDate) return;

    async function fetchBookings() {
      setIsLoadingSlots(true);
      const targetDate = formatDateForDB(selectedDate!);

      const { data, error } = await supabase
        .from("appointments")
        .select("appointment_time")
        .eq("appointment_date", targetDate)
        .neq("status", "cancelled");

      if (!error && data) {
        setBookedSlots(data.map((b) => b.appointment_time));
      } else {
        setBookedSlots([]);
      }
      setIsLoadingSlots(false);
    }
    fetchBookings();
  }, [selectedDate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) return alert("You must agree to the terms.");
    if (!selectedDate) return;

    setIsSubmitting(true);

    try {
      const dateString = formatDateForDB(selectedDate);

      const { data: isAvailable, error: checkError } = await supabase.rpc(
        "check_booking_availability",
        { p_date: dateString, p_time: selectedTime },
      );

      if (checkError) throw checkError;

      if (!isAvailable) {
        alert("Sorry, this slot was just taken. Please choose another time.");
        setIsSubmitting(false);
        setSelectedTime("");
        return;
      }

      const { data, error } = await supabase
        .from("appointments")
        .insert({
          service_id: selectedService.id,
          service_name: selectedService.name,
          appointment_date: dateString,
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
      const message = generateBookingMessage(
        bookingRef,
        selectedService.name,
        dateString,
        selectedTime,
        formData.name,
        selectedService.depositAmount,
      );

      window.location.href = getWhatsAppLink(message);
    } catch (error) {
      console.error(error);
      alert("Error saving booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-pure flex justify-center">
      <div className="w-full max-w-lg bg-white-pure relative flex flex-col">
        <div className="sticky top-0 bg-white-pure z-20 px-6 py-4 border-b border-elephant/10 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="p-2 -ml-2 rounded-full hover:bg-elephant/5 text-elephant">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-semibold text-elephant">Book Appointment</h1>
          <div className="w-8"></div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-burnt/10 flex items-center justify-center text-burnt font-bold text-xl">
              B
            </div>
            <div className="flex-1">
              <p className="text-xs text-elephant-muted uppercase tracking-wider mb-1">
                Selected Service
              </p>
              <select
                className="w-full font-semibold text-lg text-elephant bg-transparent outline-none appearance-none cursor-pointer"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-elephant-muted mt-1">
                {formatCurrency(selectedService.price)} •{" "}
                {selectedService.durationMinutes} mins
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-elephant/10 mb-8"></div>

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-elephant">
                Select date
              </h2>
              <p className="text-sm text-elephant-muted mt-1">
                Add your appointment date
              </p>
            </div>
            <button
              onClick={() => setShowMonthPicker(!showMonthPicker)}
              className="flex items-center gap-1 text-sm font-medium text-elephant bg-elephant/5 px-3 py-2 rounded-lg">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </button>
          </div>

          {showMonthPicker && (
            <div className="bg-white-pure border border-elephant/10 rounded-2xl p-4 mb-6 shadow-lg absolute z-30 right-6 w-64">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear() - 1,
                        currentMonth.getMonth(),
                        1,
                      ),
                    )
                  }
                  className="p-1">
                  <ChevronLeft size={16} />
                </button>
                <span className="font-semibold text-elephant">
                  {currentMonth.getFullYear()}
                </span>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear() + 1,
                        currentMonth.getMonth(),
                        1,
                      ),
                    )
                  }
                  className="p-1">
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentMonth(
                        new Date(currentMonth.getFullYear(), i, 1),
                      );
                      setShowMonthPicker(false);
                    }}
                    className={`py-2 rounded-lg text-sm ${
                      currentMonth.getMonth() === i
                        ? "bg-burnt text-white-pure"
                        : "hover:bg-elephant/5 text-elephant"
                    }`}>
                    {new Date(0, i).toLocaleString("en-US", { month: "short" })}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div
                key={i}
                className="text-xs font-semibold text-elephant-muted">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-2 gap-x-1 mb-8">
            {renderCalendar()}
          </div>

          {selectedDate && (
            <div className="animate-fade-in">
              <div className="h-px w-full bg-elephant/10 mb-8"></div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-elephant">
                  Select time
                </h2>
                {isLoadingSlots && (
                  <Loader2 size={16} className="animate-spin text-burnt" />
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8">
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
                      type="button"
                      disabled={isBooked || isLoadingSlots}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                        isBooked
                          ? "bg-elephant/5 text-elephant-muted border-transparent cursor-not-allowed line-through opacity-60"
                          : isSelected
                            ? "bg-elephant text-white-pure border-elephant shadow-md"
                            : "bg-white-pure border-elephant/20 text-elephant hover:border-elephant"
                      }`}>
                      {displayHour}:{minute} {ampm}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {!showDetailsForm ? (
            <div className="mt-auto pt-4">
              <Button
                className="w-full py-4 rounded-xl text-lg shadow-lg"
                disabled={!selectedTime || isLoadingSlots}
                onClick={() => setShowDetailsForm(true)}>
                Confirm Booking
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 animate-fade-in pt-6 border-t border-elephant/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-xl text-elephant">
                  Your Details
                </h3>
                <div className="text-xs text-burnt font-medium bg-burnt/10 px-3 py-1.5 rounded-lg text-right">
                  {selectedDate!.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  <br />
                  at {selectedTime}
                </div>
              </div>

              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full p-4 border border-elephant/20 rounded-xl bg-white-soft text-sm outline-none focus:border-burnt"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                className="w-full p-4 border border-elephant/20 rounded-xl bg-white-soft text-sm outline-none focus:border-burnt"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full p-4 border border-elephant/20 rounded-xl bg-white-soft text-sm outline-none focus:border-burnt"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <label className="flex items-start gap-3 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-5 h-5 cursor-pointer accent-burnt"
                  checked={formData.agreeTerms}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setIsPolicyModalOpen(true);
                    } else {
                      setFormData({ ...formData, agreeTerms: false });
                    }
                  }}
                />
                <span className="text-xs text-elephant-muted leading-relaxed">
                  I have read and agree to the{" "}
                  <strong className="text-elephant">Terms & Conditions</strong>{" "}
                  and{" "}
                  <strong className="text-elephant">Cancellation Policy</strong>
                  .
                </span>
              </label>

              <div className="flex gap-2 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDetailsForm(false)}
                  className="w-1/3 py-4">
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-2/3 py-4"
                  disabled={isSubmitting || !formData.agreeTerms}>
                  {isSubmitting ? "Saving..." : "Book via WhatsApp"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      <PolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        onAgree={() => setFormData({ ...formData, agreeTerms: true })}
      />
    </div>
  );
}
