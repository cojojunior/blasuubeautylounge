import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import {
  Calendar,
  PlusCircle,
  DollarSign,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { formatCurrency } from "../lib/currency";

export function Dashboard() {
  // --- STATE ---
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);

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

  return (
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
          {/* REDIRECT TO APPOINTMENTS PAGE WITH STATE */}
          <Link to="/admin/appointments" state={{ openWalkIn: true }}>
            <Button
              variant="outline"
              className="text-burnt border-burnt/30 hover:bg-burnt/5 px-3 md:px-4">
              <PlusCircle size={16} className="md:mr-2" />
              <span className="hidden md:inline">Add Walk-in</span>
            </Button>
          </Link>

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
            <h3 className="font-semibold text-elephant mb-1">View Payments</h3>
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
            <h3 className="font-semibold text-elephant mb-1">Block Time Off</h3>
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
  );
}
