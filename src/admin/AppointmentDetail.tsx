import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import { ArrowLeft, Save, Mail, MessageCircle } from "lucide-react";
import { formatCurrency } from "../lib/currency";
import { formatDateDisplay, formatTimeDisplay } from "../lib/datetime";
import { getCustomerWhatsAppLink } from "../lib/whatsapp";

export function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apt, setApt] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchAppointment() {
      const { data } = await supabase
        .from("appointments")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setApt(data);
        setAdminNotes(data.admin_notes || "");
      }
    }
    fetchAppointment();
  }, [id]);

  const handleSaveNotes = async () => {
    setIsSaving(true);
    await supabase
      .from("appointments")
      .update({ admin_notes: adminNotes })
      .eq("id", id);
    setIsSaving(false);
    alert("Notes saved!");
  };

  if (!apt) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-elephant-muted hover:text-elephant mb-6">
        <ArrowLeft size={20} /> Back to Appointments
      </button>

      <div className="bg-white-pure p-8 rounded-3xl border border-elephant/10 shadow-sm">
        <div className="flex justify-between items-start mb-8 pb-6 border-b border-elephant/10">
          <div>
            <h1 className="text-2xl font-serif text-elephant">
              {apt.customer_name}
            </h1>
            <p className="text-sm text-elephant-muted mt-1">
              Booking Ref: {apt.id.split("-")[0].toUpperCase()}
            </p>
          </div>
          <span
            className={`text-xs px-3 py-1.5 rounded-full font-medium ${
              apt.status === "confirmed"
                ? "bg-green-100 text-green-700"
                : apt.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
            }`}>
            {apt.status.toUpperCase()}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-elephant mb-4 uppercase tracking-wider">
              Customer Details
            </h3>
            <p className="text-sm mb-2">
              <strong className="text-elephant-muted font-normal">
                Phone:
              </strong>{" "}
              {apt.customer_phone}
            </p>
            <p className="text-sm mb-2">
              <strong className="text-elephant-muted font-normal">
                Email:
              </strong>{" "}
              {apt.customer_email}
            </p>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                className="text-green-600"
                onClick={() =>
                  window.open(
                    getCustomerWhatsAppLink(
                      apt.customer_phone,
                      `Hello ${apt.customer_name}`,
                    ),
                    "_blank",
                  )
                }>
                <MessageCircle size={16} className="mr-2" /> WhatsApp
              </Button>
              <Button size="sm" variant="outline">
                <Mail size={16} className="mr-2" /> Send Email
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-elephant mb-4 uppercase tracking-wider">
              Booking Details
            </h3>
            <p className="text-sm mb-2">
              <strong className="text-elephant-muted font-normal">
                Service:
              </strong>{" "}
              {apt.service_name}
            </p>
            <p className="text-sm mb-2">
              <strong className="text-elephant-muted font-normal">Date:</strong>{" "}
              {formatDateDisplay(apt.appointment_date)} at{" "}
              {formatTimeDisplay(apt.appointment_time)}
            </p>
            <p className="text-sm mb-2">
              <strong className="text-elephant-muted font-normal">
                Total Price:
              </strong>{" "}
              {formatCurrency(apt.total_price)}
            </p>
            <p className="text-sm mb-2">
              <strong className="text-elephant-muted font-normal">
                Deposit Paid:
              </strong>{" "}
              {formatCurrency(apt.deposit_amount)}
            </p>
          </div>
        </div>

        {/* Admin Notes */}
        <div className="pt-6 border-t border-elephant/10">
          <h3 className="text-sm font-semibold text-elephant mb-3 uppercase tracking-wider">
            Private Admin Notes
          </h3>
          <textarea
            className="w-full p-4 border border-elephant/20 rounded-xl bg-white-soft text-sm min-h-[120px] focus:outline-none focus:border-burnt"
            placeholder="Add notes here (e.g., allergies, customer requests, payment status)..."
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <Button onClick={handleSaveNotes} disabled={isSaving}>
              <Save size={16} className="mr-2" />{" "}
              {isSaving ? "Saving..." : "Save Notes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
