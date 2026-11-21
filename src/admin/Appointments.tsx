import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import { CheckCircle, XCircle, Trash2, MessageCircle } from "lucide-react";
import { formatCurrency } from "../lib/currency";
import { formatDateDisplay, formatTimeDisplay } from "../lib/datetime";
import { getCustomerWhatsAppLink } from "../lib/whatsapp";

export function Appointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      <h1 className="text-2xl font-serif text-elephant mb-6">
        All Appointments
      </h1>

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
