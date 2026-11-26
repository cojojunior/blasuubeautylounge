import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import {
  CheckCircle,
  XCircle,
  Trash2,
  MessageCircle,
  Plus,
  Check,
  Loader2,
} from "lucide-react";
import { formatCurrency } from "../lib/currency";
import {
  formatDateDisplay,
  formatTimeDisplay,
  formatDateForDB,
} from "../lib/datetime";
import { getCustomerWhatsAppLink } from "../lib/whatsapp";
import { allServices as services, categories } from "../content";

export function Appointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- WALK-IN STATE ---
  const [showWalkInForm, setShowWalkInForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walkInData, setWalkInData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(
    categories[1] || "Nails",
  );

  // --- FETCH APPOINTMENTS ---
  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });

    if (!error && data) setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // --- CALCULATIONS FOR WALK-IN ---
  const selectedServices = services.filter((s) =>
    selectedServiceIds.includes(s.id),
  );
  const totalPrice = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0,
  );
  const combinedServiceNames = selectedServices.map((s) => s.name).join(" + ");
  const totalDuration = selectedServices.reduce(
    (sum, service) => sum + service.durationMinutes,
    0,
  );

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((sId) => sId !== id);
      }
      return [...prev, id];
    });
  };

  // --- SUBMIT WALK-IN BOOKING ---
  const handleWalkInSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedServiceIds.length === 0) {
      return alert("Please select at least one service.");
    }
    if (!walkInData.date || !walkInData.time) {
      return alert("Please select a date and time.");
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("appointments").insert({
        customer_name: walkInData.name,
        customer_phone: walkInData.phone,
        customer_email: "walkin@blasuu.com", // Placeholder
        service_id: selectedServiceIds.join(", "),
        service_name: combinedServiceNames,
        appointment_date: formatDateForDB(new Date(walkInData.date)),
        appointment_time: walkInData.time,
        total_price: totalPrice,
        deposit_amount: 0, // Walk-ins don't pay deposit online
        status: "confirmed", // Auto-confirm walk-ins
        booking_source: "offline",
        payment_status: "unpaid", // You can mark this paid later if needed
      });

      if (error) throw error;

      // Reset form and refresh list
      setShowWalkInForm(false);
      setWalkInData({ name: "", phone: "", date: "", time: "" });
      setSelectedServiceIds([]);
      fetchAppointments();
      alert("Walk-in booking saved successfully!");
    } catch (error: any) {
      alert("Error saving walk-in: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- EXISTING ACTIONS ---
  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", id);
    if (error) return alert("Error updating status: " + error.message);
    fetchAppointments();
  };

  const deleteAppointment = async (id: string) => {
    if (!window.confirm("Delete this appointment permanently?")) return;
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchAppointments();
  };

  if (loading) return <div className="p-8">Loading appointments...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif text-elephant">All Appointments</h1>
        <Button
          onClick={() => setShowWalkInForm(!showWalkInForm)}
          className="bg-burnt text-white-pure flex items-center gap-2">
          <Plus size={18} />
          {showWalkInForm ? "Close Form" : "New Walk-in"}
        </Button>
      </div>

      {/* WALK-IN FORM */}
      {showWalkInForm && (
        <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10 mb-8 shadow-sm animate-fade-in">
          <h2 className="text-lg font-semibold text-elephant mb-4">
            Add Walk-in Booking
          </h2>
          <form onSubmit={handleWalkInSubmit} className="space-y-6">
            {/* Customer Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                required
                type="text"
                placeholder="Customer Name"
                value={walkInData.name}
                onChange={(e) =>
                  setWalkInData({ ...walkInData, name: e.target.value })
                }
                className="w-full p-3 border border-elephant/20 rounded-xl bg-white-soft text-sm outline-none focus:border-burnt"
              />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                value={walkInData.phone}
                onChange={(e) =>
                  setWalkInData({ ...walkInData, phone: e.target.value })
                }
                className="w-full p-3 border border-elephant/20 rounded-xl bg-white-soft text-sm outline-none focus:border-burnt"
              />
              <div className="flex gap-2">
                <input
                  required
                  type="date"
                  value={walkInData.date}
                  onChange={(e) =>
                    setWalkInData({ ...walkInData, date: e.target.value })
                  }
                  className="w-full p-3 border border-elephant/20 rounded-xl bg-white-soft text-sm outline-none focus:border-burnt"
                />
                <input
                  required
                  type="time"
                  value={walkInData.time}
                  onChange={(e) =>
                    setWalkInData({ ...walkInData, time: e.target.value })
                  }
                  className="w-full p-3 border border-elephant/20 rounded-xl bg-white-soft text-sm outline-none focus:border-burnt"
                />
              </div>
            </div>

            {/* Service Selection (Multi-Select) */}
            <div>
              <p className="text-xs text-elephant-muted uppercase tracking-wider mb-3">
                Select Services
              </p>
              <div className="flex gap-2 overflow-x-auto pb-3 mb-2 custom-scrollbar">
                {categories
                  .filter((c) => c !== "All" && c !== "Special Packages")
                  .map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                        selectedCategory === cat
                          ? "bg-burnt text-white-pure border-burnt"
                          : "bg-white-pure text-elephant-muted border-elephant/20 hover:border-burnt/50"
                      }`}>
                      {cat}
                    </button>
                  ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {services
                  .filter((s) => s.category === selectedCategory)
                  .map((service) => {
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

              {/* Total Summary */}
              <div className="mt-4 p-3 bg-white-soft rounded-xl border border-elephant/10 flex justify-between text-sm">
                <span className="text-elephant-muted">Selected Total:</span>
                <span className="font-medium text-elephant">
                  {formatCurrency(totalPrice)} ({totalDuration} mins)
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowWalkInForm(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || selectedServiceIds.length === 0}
                className="bg-burnt text-white-pure">
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Walk-in"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* APPOINTMENTS LIST */}
      <div className="grid gap-4">
        {appointments.length === 0 ? (
          <p className="text-elephant-muted">No appointments found.</p>
        ) : (
          appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white-pure p-6 rounded-2xl border border-elephant/10 flex flex-col md:flex-row justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <Link
                    to={`/admin/appointments/${apt.id}`}
                    className="font-semibold text-lg hover:text-burnt transition-colors">
                    {apt.customer_name}
                  </Link>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      apt.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : apt.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                    }`}>
                    {apt.status.toUpperCase()}
                  </span>
                  {apt.booking_source === "offline" && (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                      WALK-IN
                    </span>
                  )}
                </div>
                <p className="text-sm text-elephant-muted">
                  <strong>Service:</strong> {apt.service_name} (
                  {formatCurrency(apt.total_price)})
                </p>
                <p className="text-sm text-elephant-muted">
                  <strong>Date:</strong>{" "}
                  {formatDateDisplay(apt.appointment_date)} at{" "}
                  {formatTimeDisplay(apt.appointment_time)}
                </p>
                <p className="text-sm text-elephant-muted">
                  <strong>Phone:</strong> {apt.customer_phone}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {apt.status !== "confirmed" && (
                  <Button
                    size="sm"
                    className="bg-green-600 text-white"
                    onClick={() => updateStatus(apt.id, "confirmed")}>
                    <CheckCircle size={16} className="mr-2" /> Confirm
                  </Button>
                )}
                {apt.status !== "cancelled" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => updateStatus(apt.id, "cancelled")}>
                    <XCircle size={16} className="mr-2" /> Cancel
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                  onClick={() =>
                    window.open(
                      getCustomerWhatsAppLink(
                        apt.customer_phone,
                        `Hello ${apt.customer_name}!`,
                      ),
                      "_blank",
                    )
                  }>
                  <MessageCircle size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => deleteAppointment(apt.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
