import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import { LogOut, CheckCircle, XCircle, MessageCircle } from "lucide-react";

export function Dashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

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

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      fetchAppointments(); // Refresh list
    } else {
      alert("Error updating status: " + error.message);
    }
  };

  const openWhatsApp = (phone: string, name: string) => {
    // Clean phone number and ensure it starts with 233 (Ghana code)
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
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-elephant/10">
          <div>
            <h1 className="text-3xl font-serif text-elephant">Dashboard</h1>
            <p className="text-sm text-elephant-muted">Manage your bookings</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2">
            <LogOut size={16} /> Logout
          </Button>
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
                {/* Customer Details */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">
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

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-2 md:items-center flex-shrink-0 border-t md:border-t-0 md:border-l border-elephant/10 pt-4 md:pt-0 md:pl-6">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => updateStatus(apt.id, "confirmed")}
                    disabled={apt.status === "confirmed"}>
                    <CheckCircle size={16} className="mr-2" /> Confirm
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => updateStatus(apt.id, "cancelled")}
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
