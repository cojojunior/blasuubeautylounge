import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import {
  LogOut,
  CheckCircle,
  XCircle,
  MessageCircle,
  Calendar,
} from "lucide-react";

export function Dashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
    handleOAuthRedirect();

    // Check if calendar is already connected on load
    const params = new URLSearchParams(window.location.search);
    if (params.get("calendar") === "connected") {
      setIsCalendarConnected(true);
    }
  }, []);

  const handleOAuthRedirect = async () => {
    const params = new URLSearchParams(window.location.search);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (
      params.get("calendar") === "connected" &&
      session?.provider_refresh_token
    ) {
      const { error } = await supabase.functions.invoke("save-calendar-token", {
        body: { refreshToken: session.provider_refresh_token },
      });

      if (!error) {
        alert("Google Calendar connected successfully!");
        setIsCalendarConnected(true);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      } else {
        alert("Failed to save calendar token.");
      }
    }
  };

const connectCalendar = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // MUST include the email scope for Supabase to work
      scopes:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.events",
      redirectTo: `${window.location.origin}/admin/dashboard?calendar=connected`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) console.error("OAuth error:", error);
};

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });

    if (error) {
      console.error("Error fetching:", error);
    } else {
      setAppointments(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  // UPDATED: This now triggers the Google Calendar sync
  const updateStatus = async (
    id: string,
    newStatus: string,
    appointment: any,
  ) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Error updating status: " + error.message);
      return;
    }

    // If confirmed, sync to Google Calendar
    if (newStatus === "confirmed") {
      try {
        const { error: calError } = await supabase.functions.invoke(
          "sync-booking-to-calendar",
          {
            body: { appointment: { ...appointment, status: newStatus } },
          },
        );

        if (calError) throw calError;
        alert("Booking confirmed and added to Google Calendar!");
      } catch (err: any) {
        console.error(err);
        alert(
          "Booking confirmed, but failed to sync to calendar. Did you connect your calendar?",
        );
      }
    }

    fetchAppointments();
  };

  const openWhatsApp = (phone: string, name: string) => {
    let formattedPhone = phone.replace(/\D/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "233" + formattedPhone.substring(1);
    }
    const text = `Hello ${name}, this is Blasuu Beauty Lounge. We are confirming your appointment!`;
    window.open(`https://wa.me/${formattedPhone}?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white-soft p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-elephant/10 gap-4">
          <div>
            <h1 className="text-3xl font-serif text-elephant">Dashboard</h1>
            <p className="text-sm text-elephant-muted">Manage your bookings</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={connectCalendar}
              className={`flex items-center gap-2 ${
                isCalendarConnected
                  ? "text-green-600 border-green-200 bg-green-50"
                  : "text-blue-600 border-blue-200 hover:bg-blue-50"
              }`}>
              <Calendar size={16} />
              {isCalendarConnected ? "Calendar Connected" : "Connect Calendar"}
            </Button>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2">
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </header>

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
                            : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {apt.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-elephant-muted mb-1">
                    <strong>Service:</strong> {apt.service_name} (GH₵{" "}
                    {apt.total_price})
                  </p>
                  <p className="text-sm text-elephant-muted mb-1">
                    <strong>Date:</strong> {apt.appointment_date} at{" "}
                    {apt.appointment_time}
                  </p>
                  <p className="text-sm text-elephant-muted mb-1">
                    <strong>Phone:</strong> {apt.customer_phone}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:items-center flex-shrink-0 border-t md:border-t-0 md:border-l border-elephant/10 pt-4 md:pt-0 md:pl-6">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => updateStatus(apt.id, "confirmed", apt)} // <-- Passing the apt object here
                    disabled={apt.status === "confirmed"}>
                    <CheckCircle size={16} className="mr-2" /> Confirm
                  </Button>

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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
