import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import { MessageCircle, Bell } from "lucide-react";
import { formatDateDisplay, formatTimeDisplay } from "../lib/datetime";
import { getCustomerWhatsAppLink } from "../lib/whatsapp";

export function Notifications() {
  const [tomorrowApts, setTomorrowApts] = useState<any[]>([]);
  const [pendingApts, setPendingApts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchApts() {
      // Get tomorrow's date in YYYY-MM-DD
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split("T")[0];

      // 1. Fetch confirmed appointments for tomorrow
      const { data: tomorrowData } = await supabase
        .from("appointments")
        .select("*")
        .eq("appointment_date", tomorrowStr)
        .eq("status", "confirmed");

      if (tomorrowData) setTomorrowApts(tomorrowData);

      // 2. Fetch pending payment appointments
      const { data: pendingData } = await supabase
        .from("appointments")
        .select("*")
        .eq("status", "pending_payment");

      if (pendingData) setPendingApts(pendingData);
    }
    fetchApts();
  }, []);

  const sendReminder = (
    phone: string,
    name: string,
    date: string,
    time: string,
  ) => {
    const msg = `Hello ${name}, this is Blasuu Beauty Lounge! Just a friendly reminder that you have an appointment tomorrow (${formatDateDisplay(date)}) at ${formatTimeDisplay(time)}. We look forward to seeing you! 💅✨`;
    window.open(getCustomerWhatsAppLink(phone, msg), "_blank");
  };

  const sendPaymentLink = (phone: string, name: string) => {
    const msg = `Hello ${name}, this is Blasuu Beauty Lounge. We noticed your booking is still pending. To secure your slot, please complete your 25% deposit. If you have any issues, reply here!`;
    window.open(getCustomerWhatsAppLink(phone, msg), "_blank");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-serif text-elephant mb-6">
        Notifications & Reminders
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Tomorrow's Reminders */}
        <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-burnt/10 text-burnt rounded-lg">
              <Bell size={20} />
            </div>
            <h2 className="text-lg font-semibold">Tomorrow's Reminders</h2>
          </div>
          <p className="text-sm text-elephant-muted mb-6">
            Send a quick WhatsApp message reminding clients of their upcoming
            appointment.
          </p>

          <div className="space-y-3">
            {tomorrowApts.length === 0 ? (
              <p className="text-sm text-elephant-muted italic">
                No appointments scheduled for tomorrow.
              </p>
            ) : (
              tomorrowApts.map((apt) => (
                <div
                  key={apt.id}
                  className="flex justify-between items-center p-3 bg-white-soft rounded-xl border border-elephant/5">
                  <div>
                    <p className="font-medium text-sm">{apt.customer_name}</p>
                    <p className="text-xs text-elephant-muted">
                      {formatTimeDisplay(apt.appointment_time)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600"
                    onClick={() =>
                      sendReminder(
                        apt.customer_phone,
                        apt.customer_name,
                        apt.appointment_date,
                        apt.appointment_time,
                      )
                    }>
                    <MessageCircle size={16} className="mr-2" /> Remind
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <MessageCircle size={20} />
            </div>
            <h2 className="text-lg font-semibold">Awaiting Payment</h2>
          </div>
          <p className="text-sm text-elephant-muted mb-6">
            Follow up with clients who haven't completed their deposit.
          </p>

          <div className="space-y-3">
            {pendingApts.length === 0 ? (
              <p className="text-sm text-elephant-muted italic">
                No pending payments.
              </p>
            ) : (
              pendingApts.map((apt) => (
                <div
                  key={apt.id}
                  className="flex justify-between items-center p-3 bg-white-soft rounded-xl border border-elephant/5">
                  <div>
                    <p className="font-medium text-sm">{apt.customer_name}</p>
                    <p className="text-xs text-elephant-muted">
                      {formatDateDisplay(apt.appointment_date)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600"
                    onClick={() =>
                      sendPaymentLink(apt.customer_phone, apt.customer_name)
                    }>
                    <MessageCircle size={16} className="mr-2" /> Follow Up
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
