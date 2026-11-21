import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import {
  LogOut,
  CheckCircle,
  XCircle,
  MessageCircle,
  Calendar,
  Trash2,
  PlusCircle,
  X,
} from "lucide-react";
import { formatCurrency } from "../lib/currency";
import { formatDateDisplay, formatTimeDisplay } from "../lib/datetime";
import { getCustomerWhatsAppLink } from "../lib/whatsapp";
import { allServices as services } from "../content";

export function Dashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const navigate = useNavigate();

  // --- OFFLINE BOOKING STATE ---
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [offlineForm, setOfflineForm] = useState({
    name: "",
    phone: "",
    email: "",
    serviceId: services[0].id,
    date: "",
    time: "09:00",
  });

  // State to track booked slots for the offline modal
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // --- INITIAL SETUP & AUTH LISTENER ---
  useEffect(() => {
    fetchAppointments();
    checkCalendarStatus();

    let handled = false;
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (handled) return;
        if (event === "SIGNED_IN" && session?.provider_refresh_token) {
          handled = true;
          const { error } = await supabase.functions.invoke(
            "save-calendar-token",
            {
              body: { refreshToken: session.provider_refresh_token },
            },
          );

          if (!error) {
            alert("Google Calendar connected successfully!");
            setIsCalendarConnected(true);
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname,
            );
          }
        }
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  // --- FETCH BOOKED SLOTS FOR OFFLINE MODAL ---
  useEffect(() => {
    if (!offlineForm.date) {
      setBookedSlots([]);
      return;
    }

    async function fetchBookedSlots() {
      const { data, error } = await supabase
        .from("booked_slots")
        .select("appointment_time")
        .eq("appointment_date", offlineForm.date);

      if (!error && data) {
        setBookedSlots(data.map((b) => b.appointment_time));
      } else {
        setBookedSlots([]);
      }
    }
    fetchBookedSlots();
  }, [offlineForm.date]);

  // --- GOOGLE CALENDAR OAUTH ---
  const checkCalendarStatus = async () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("calendar") === "connected") {
      setIsCalendarConnected(true);
      return;
    }

    const { data: hasToken, error } = await supabase.rpc(
      "check_calendar_connection",
    );

    if (!error && hasToken) {
      setIsCalendarConnected(true);
    } else {
      connectCalendar();
    }
  };

  const connectCalendar = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes:
          "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.events",
        redirectTo: `${window.location.origin}/admin/dashboard?calendar=connected`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) console.error("OAuth error:", error);
  };

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  // --- UPDATE STATUS & SYNC ---
  const updateStatus = async (id: string, newStatus: string, apt: any) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", id);
    if (error) return alert("Error updating status: " + error.message);

    if (newStatus === "confirmed") {
      try {
        await supabase.functions.invoke("sync-booking-to-calendar", {
          body: { appointment: { ...apt, status: newStatus } },
        });
        alert("Booking confirmed and synced to Google Calendar!");
      } catch (err) {
        console.error("Sync failed", err);
        alert("Booking confirmed, but calendar sync failed.");
      }
    }
    fetchAppointments();
  };

  const deleteAppointment = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this appointment? This cannot be undone.",
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("appointments").delete().eq("id", id);

    if (error) {
      alert("Error deleting appointment: " + error.message);
    } else {
      fetchAppointments();
    }
  };

  const openWhatsApp = (phone: string, name: string) => {
    const message = `Hello ${name}, this is Blasuu Beauty Lounge. We are confirming your appointment!`;
    window.open(getCustomerWhatsAppLink(phone, message), "_blank");
  };

  // --- OFFLINE BOOKING SUBMIT ---
  const handleOfflineSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const service = services.find((s) => s.id === offlineForm.serviceId);
    if (!service) return;

    const totalPrice = service.price;
    const requiredDeposit = Math.round(totalPrice * 0.25);

    try {
      // 1. Insert directly into Supabase
      const { data, error } = await supabase
        .from("appointments")
        .insert({
          service_id: service.id,
          service_name: service.name,
          appointment_date: offlineForm.date,
          appointment_time: offlineForm.time,
          customer_name: offlineForm.name,
          customer_email: offlineForm.email || "no-email@blasuu.com",
          customer_phone: offlineForm.phone,
          total_price: totalPrice,
          deposit_amount: requiredDeposit,
          status: "confirmed",
          booking_source: "offline",
        })
        .select()
        .single();

      if (error) throw error;

      // 2. Sync to Google Calendar
      await supabase.functions.invoke("sync-booking-to-calendar", {
        body: { appointment: { ...data, status: "confirmed" } },
      });

      alert("Offline booking added and synced to Calendar!");
      setIsOfflineModalOpen(false);

      // Reset form
      setOfflineForm({
        name: "",
        phone: "",
        email: "",
        serviceId: services[0].id,
        date: "",
        time: "09:00",
      });

      // Refresh the list
      fetchAppointments();
    } catch (err: any) {
      alert("Error adding offline booking: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white-soft p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER --- */}
        <header className="flex flex-row justify-between items-center mb-8 pb-4 border-b border-elephant/10">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-elephant">
              Dashboard
            </h1>
            <p className="text-sm text-elephant-muted">Manage your bookings</p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="outline"
              onClick={() => setIsOfflineModalOpen(true)}
              className="text-burnt border-burnt/30 hover:bg-burnt/5 px-3 md:px-4">
              <PlusCircle size={16} className="md:mr-2" />
              <span className="hidden md:inline">Add Walk-in</span>
            </Button>

            {!isCalendarConnected && (
              <Button
                variant="outline"
                onClick={connectCalendar}
                className="text-blue-600 border-blue-200 px-3 md:px-4">
                <Calendar size={16} className="md:mr-2" />
                <span className="hidden md:inline">Connect Calendar</span>
              </Button>
            )}

            <Button
              variant="outline"
              onClick={handleLogout}
              className="px-3 md:px-4">
              <LogOut size={16} className="md:mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* --- APPOINTMENTS LIST --- */}
        {loading ? (
          <p className="text-elephant-muted text-center py-20">
            Loading appointments...
          </p>
        ) : appointments.length === 0 ? (
          <div className="text-center py-20 bg-white-pure rounded-3xl border border-elephant/10">
            <p className="text-elephant-muted">No appointments yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white-pure p-6 rounded-2xl border border-elephant/10 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-elephant">
                      {apt.customer_name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        apt.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : apt.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : apt.status === "pending_payment"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {apt.status === "pending_payment"
                        ? "AWAITING PAYMENT"
                        : apt.status.toUpperCase()}
                    </span>
                    {apt.booking_source === "offline" && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                        WALK-IN
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-elephant-muted mb-1">
                    <strong>Service:</strong> {apt.service_name} (
                    {formatCurrency(apt.total_price)})
                  </p>
                  <p className="text-sm text-elephant-muted mb-1">
                    <strong>Date:</strong>{" "}
                    {formatDateDisplay(apt.appointment_date)} at{" "}
                    {formatTimeDisplay(apt.appointment_time)}
                  </p>
                  <p className="text-sm text-elephant-muted mb-1">
                    <strong>Phone:</strong> {apt.customer_phone}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-2 md:items-center flex-shrink-0 border-t md:border-t-0 md:border-l border-elephant/10 pt-4 md:pt-0 md:pl-6">
                  {(apt.status === "pending" ||
                    apt.status === "pending_payment") && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => updateStatus(apt.id, "confirmed", apt)}>
                      <CheckCircle size={16} className="mr-2" /> Confirm
                    </Button>
                  )}

                  {apt.status !== "cancelled" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => updateStatus(apt.id, "cancelled", apt)}
                        disabled={apt.status === "cancelled"}>
                        <XCircle size={16} className="mr-2" /> Cancel
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() =>
                          openWhatsApp(apt.customer_phone, apt.customer_name)
                        }>
                        <MessageCircle size={16} className="mr-2" /> Chat
                      </Button>
                    </>
                  )}

                  {(apt.status === "cancelled" ||
                    apt.status === "pending_payment") && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-red-50"
                      onClick={() => deleteAppointment(apt.id)}>
                      <Trash2 size={16} className="mr-2" /> Delete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- OFFLINE BOOKING MODAL --- */}
      {isOfflineModalOpen && (
        <div className="fixed inset-0 bg-elephant/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white-pure rounded-2xl p-6 w-full max-w-md shadow-xl relative animate-fade-in">
            <button
              onClick={() => setIsOfflineModalOpen(false)}
              className="absolute top-4 right-4 text-elephant-muted hover:text-elephant">
              <X size={20} />
            </button>
            <h2 className="text-xl font-serif text-elephant mb-4">
              Add Walk-in Booking
            </h2>

            <form onSubmit={handleOfflineSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Customer Name"
                className="w-full p-3 border border-elephant/20 rounded-xl bg-white-soft text-sm"
                value={offlineForm.name}
                onChange={(e) =>
                  setOfflineForm({ ...offlineForm, name: e.target.value })
                }
              />

              <input
                required
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border border-elephant/20 rounded-xl bg-white-soft text-sm"
                value={offlineForm.phone}
                onChange={(e) =>
                  setOfflineForm({ ...offlineForm, phone: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email (Optional)"
                className="w-full p-3 border border-elephant/20 rounded-xl bg-white-soft text-sm"
                value={offlineForm.email}
                onChange={(e) =>
                  setOfflineForm({ ...offlineForm, email: e.target.value })
                }
              />

              <div className="relative">
                <select
                  className="w-full p-3 border border-elephant/20 rounded-xl bg-white-soft text-sm appearance-none cursor-pointer outline-none focus:border-burnt"
                  value={offlineForm.serviceId}
                  onChange={(e) =>
                    setOfflineForm({
                      ...offlineForm,
                      serviceId: e.target.value,
                    })
                  }>
                  {Array.from(new Set(services.map((s) => s.category))).map(
                    (category) => (
                      <optgroup key={category} label={category}>
                        {services
                          .filter((s) => s.category === category)
                          .map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} - {formatCurrency(s.price)}
                            </option>
                          ))}
                      </optgroup>
                    ),
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-elephant-muted">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  required
                  type="date"
                  className="w-1/2 p-3 border border-elephant/20 rounded-xl bg-white-soft text-sm"
                  value={offlineForm.date}
                  onChange={(e) =>
                    setOfflineForm({ ...offlineForm, date: e.target.value })
                  }
                />

                {/* Disables time slots that are already booked */}
                <select
                  className="w-1/2 p-3 border border-elephant/20 rounded-xl bg-white-soft text-sm"
                  value={offlineForm.time}
                  onChange={(e) =>
                    setOfflineForm({ ...offlineForm, time: e.target.value })
                  }>
                  {[
                    "09:00",
                    "10:00",
                    "11:00",
                    "13:00",
                    "14:00",
                    "15:00",
                    "16:00",
                  ].map((t) => {
                    const isBooked = bookedSlots.includes(t);
                    return (
                      <option key={t} value={t} disabled={isBooked}>
                        {t} {isBooked ? "(Booked)" : ""}
                      </option>
                    );
                  })}
                </select>
              </div>

              <Button type="submit" className="w-full py-3 mt-4">
                Save & Sync to Calendar
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
