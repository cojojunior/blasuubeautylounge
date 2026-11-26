import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import {
  Calendar,
  PlusCircle,
  X,
  DollarSign,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { formatCurrency } from "../lib/currency";
import { allServices as services } from "../content";

export function Dashboard() {
  // --- STATE ---
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [offlineForm, setOfflineForm] = useState({
    name: "",
    phone: "",
    email: "",
    serviceId: services[0].id,
    date: "",
    time: "09:00",
    paymentMethod: "cash" as "cash" | "momo",
  });
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Stats State
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingPayments: 0,
    totalRevenue: 0,
    upcomingToday: 0,
  });

  // --- INITIAL SETUP & AUTH LISTENER ---
  useEffect(() => {
    fetchStats();
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
        setBookedSlots(data.map((b) => b.appointment_time.substring(0, 5)));
      } else {
        setBookedSlots([]);
      }
    }
    fetchBookedSlots();
  }, [offlineForm.date]);

  // --- FETCH DASHBOARD STATS ---
  const fetchStats = async () => {
    const { data } = await supabase.from("appointments").select("*");
    if (data) {
      const today = new Date().toISOString().split("T")[0];

      setStats({
        totalBookings: data.length,
        pendingPayments: data.filter((d) => d.status === "pending_payment")
          .length,
        totalRevenue: data
          .filter((d) => d.status === "confirmed")
          .reduce((sum, d) => sum + Number(d.deposit_amount), 0),
        upcomingToday: data.filter(
          (d) => d.appointment_date === today && d.status === "confirmed",
        ).length,
      });
    }
  };

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

  // --- OFFLINE BOOKING SUBMIT ---
  const handleOfflineSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const service = services.find((s) => s.id === offlineForm.serviceId);
    if (!service) return;

    const totalPrice = service.price;
    const requiredDeposit = totalPrice; // Walk-ins pay FULL amount upfront

    try {
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
          payment_method: offlineForm.paymentMethod,
        })
        .select()
        .single();

      if (error) throw error;

      await supabase.functions.invoke("sync-booking-to-calendar", {
        body: { appointment: { ...data, status: "confirmed" } },
      });

      alert("Offline booking added and synced to Calendar!");
      setIsOfflineModalOpen(false);
      setOfflineForm({
        name: "",
        phone: "",
        email: "",
        serviceId: services[0].id,
        date: "",
        time: "09:00",
        paymentMethod: "cash",
      });
      fetchStats();
    } catch (err: any) {
      alert("Error adding offline booking: " + err.message);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-elephant/10 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-elephant">
              Dashboard
            </h1>
            <p className="text-sm text-elephant-muted">
              Overview of your salon's performance
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
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
          </div>
        </header>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10">
            <div className="flex items-center gap-3 mb-2 text-burnt">
              <Users size={20} />
              <h2 className="text-sm font-semibold uppercase tracking-wider">
                Total Bookings
              </h2>
            </div>
            <p className="text-3xl font-serif text-elephant">
              {stats.totalBookings}
            </p>
          </div>

          <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10">
            <div className="flex items-center gap-3 mb-2 text-blue-600">
              <Clock size={20} />
              <h2 className="text-sm font-semibold uppercase tracking-wider">
                Awaiting Payment
              </h2>
            </div>
            <p className="text-3xl font-serif text-elephant">
              {stats.pendingPayments}
            </p>
          </div>

          <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10">
            <div className="flex items-center gap-3 mb-2 text-green-600">
              <DollarSign size={20} />
              <h2 className="text-sm font-semibold uppercase tracking-wider">
                Deposits Collected
              </h2>
            </div>
            <p className="text-3xl font-serif text-elephant">
              {formatCurrency(stats.totalRevenue)}
            </p>
          </div>

          <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10">
            <div className="flex items-center gap-3 mb-2 text-purple-600">
              <Calendar size={20} />
              <h2 className="text-sm font-semibold uppercase tracking-wider">
                Today's Schedule
              </h2>
            </div>
            <p className="text-3xl font-serif text-elephant">
              {stats.upcomingToday}
            </p>
          </div>
        </div>

        {/* --- QUICK LINKS --- */}
        <h2 className="text-xl font-serif text-elephant mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/appointments"
            className="bg-white-pure p-6 rounded-2xl border border-elephant/10 hover:border-burnt/30 transition-all flex justify-between items-center group">
            <div>
              <h3 className="font-semibold text-elephant mb-1">
                Manage Appointments
              </h3>
              <p className="text-sm text-elephant-muted">
                View, confirm, and cancel bookings
              </p>
            </div>
            <ArrowRight
              size={20}
              className="text-elephant-muted group-hover:text-burnt transition-all"
            />
          </Link>

          <Link
            to="/admin/payments"
            className="bg-white-pure p-6 rounded-2xl border border-elephant/10 hover:border-burnt/30 transition-all flex justify-between items-center group">
            <div>
              <h3 className="font-semibold text-elephant mb-1">
                View Payments
              </h3>
              <p className="text-sm text-elephant-muted">
                Track deposits and balances
              </p>
            </div>
            <ArrowRight
              size={20}
              className="text-elephant-muted group-hover:text-burnt transition-all"
            />
          </Link>

          <Link
            to="/admin/blocked"
            className="bg-white-pure p-6 rounded-2xl border border-elephant/10 hover:border-burnt/30 transition-all flex justify-between items-center group">
            <div>
              <h3 className="font-semibold text-elephant mb-1">
                Block Time Off
              </h3>
              <p className="text-sm text-elephant-muted">
                Manage holidays or breaks
              </p>
            </div>
            <ArrowRight
              size={20}
              className="text-elephant-muted group-hover:text-burnt transition-all"
            />
          </Link>
        </div>
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
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
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

              {/* PAYMENT METHOD TOGGLE */}
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() =>
                    setOfflineForm({ ...offlineForm, paymentMethod: "cash" })
                  }
                  className={`flex-1 py-3 rounded-xl border font-medium text-sm transition-all ${
                    offlineForm.paymentMethod === "cash"
                      ? "bg-green-50 border-green-600 text-green-700"
                      : "bg-white-pure border-elephant/20 text-elephant-muted"
                  }`}>
                  Cash Payment
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setOfflineForm({ ...offlineForm, paymentMethod: "momo" })
                  }
                  className={`flex-1 py-3 rounded-xl border font-medium text-sm transition-all ${
                    offlineForm.paymentMethod === "momo"
                      ? "bg-blue-50 border-blue-600 text-blue-700"
                      : "bg-white-pure border-elephant/20 text-elephant-muted"
                  }`}>
                  MoMo (Moolre)
                </button>
              </div>

              <Button type="submit" className="w-full py-3 mt-4">
                Save & Sync to Calendar
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
