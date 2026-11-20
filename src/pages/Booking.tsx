import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { allServices as services } from "../content";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import { ChevronLeft, ChevronRight, Loader2, Check } from "lucide-react";
import { PolicyModal } from "../components/booking/PolicyModal";
import { formatDateForDB } from "../lib/datetime";
import { generateBookingMessage, getWhatsAppLink } from "../lib/whatsapp";
import { formatCurrency } from "../lib/currency";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../config/site";

const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

export function Booking() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service");

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    initialService ? [initialService] : [services[0].id],
  );

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

  const selectedServices = services.filter((s) =>
    selectedServiceIds.includes(s.id),
  );

  const totalPrice = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0,
  );
  const requiredDeposit = Math.round(totalPrice * 0.25);
  const combinedServiceNames = selectedServices.map((s) => s.name).join(" + ");
  const totalDuration = selectedServices.reduce(
    (sum, service) => sum + service.durationMinutes,
    0,
  );

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((sId) => sId !== id);
      }
      return [...prev, id];
    });
  };

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

      // 1. Save booking as pending payment
      const { data, error } = await supabase
        .from("appointments")
        .insert({
          service_id: selectedServiceIds.join(", "),
          service_name: combinedServiceNames,
          appointment_date: dateString,
          appointment_time: selectedTime,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          total_price: totalPrice,
          deposit_amount: requiredDeposit,
          status: "pending_payment",
        })
        .select()
        .single();

      if (error) throw error;

      const bookingRef = data.id;

      // 2. Generate Moolre payment link
      const { data: moolreData, error: moolreError } =
        await supabase.functions.invoke("create-moolre-link", {
          body: {
            amount: requiredDeposit,
            email: formData.email,
            reference: bookingRef,
            callbackUrl: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/moolre-webhook`,
            redirectUrl: `${window.location.origin}/booking-confirmation?ref=${bookingRef}`,
          },
        });

      if (moolreError || !moolreData?.url) {
        // Fallback: If Moolre fails, let them book via WhatsApp anyway
        const message = generateBookingMessage(
          bookingRef.split("-")[0].toUpperCase(),
          combinedServiceNames,
          dateString,
          selectedTime,
          formData.name,
          requiredDeposit,
        );
        window.location.href = getWhatsAppLink(message);
        return;
      }

      // 3. Redirect to Moolre Checkout
      window.location.href = moolreData.url;
    } catch (error) {
      console.error(error);
      alert("Error saving booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-pure flex justify-center">
      <Seo
        title="Book an Appointment"
        description="Secure your slot at Blasuu Beauty Lounge. Select your preferred date and time, and confirm your booking in seconds."
        url={`${siteConfig.url}/book`}
      />
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
          <div className="mb-8">
            <p className="text-xs text-elephant-muted uppercase tracking-wider mb-3">
              Select Services (You can choose multiple)
            </p>
            <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {services.map((service) => {
                const isSelected = selectedServiceIds.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "bg-burnt/5 border-burnt"
                        : "bg-white-pure border-elephant/10 hover:border-burnt/30"
                    }`}>
                    <div>
                      <p className="font-medium text-sm text-elephant">
                        {service.name}
                      </p>
                      <p className="text-xs text-elephant-muted">
                        {formatCurrency(service.price)} •{" "}
                        {service.durationMinutes} mins
                      </p>
                      {service.note && (
                        <p className="text-[10px] text-burnt mt-1">
                          {service.note}
                        </p>
                      )}
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? "bg-burnt border-burnt text-white-pure"
                          : "border-elephant/20"
                      }`}>
                      {isSelected && <Check size={14} />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-white-soft rounded-xl border border-elephant/10 flex justify-between text-sm">
              <span className="text-elephant-muted">Selected Total:</span>
              <span className="font-medium text-elephant">
                {formatCurrency(totalPrice)} ({totalDuration} mins)
              </span>
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
                disabled={
                  !selectedTime ||
                  isLoadingSlots ||
                  selectedServiceIds.length === 0
                }
                onClick={() => setShowDetailsForm(true)}>
                Confirm Selection
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

              <div className="bg-white-soft p-4 rounded-xl border border-elephant/10 mb-6 text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-elephant-muted">
                    Total Service Price:
                  </span>
                  <span className="font-medium text-elephant">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-burnt font-medium">
                  <span>Required Booking Fee (25%):</span>
                  <span>{formatCurrency(requiredDeposit)}</span>
                </div>
                <div className="flex justify-between text-elephant-muted mt-1">
                  <span>Balance Due at Salon:</span>
                  <span>{formatCurrency(totalPrice - requiredDeposit)}</span>
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