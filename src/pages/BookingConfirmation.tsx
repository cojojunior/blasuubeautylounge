import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, MessageCircle, Calendar, Clock } from "lucide-react";
import { Button } from "../components/ui/Button";
import { businessConfig } from "../config/business";

export function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const bookingRef = searchParams.get("ref") || "N/A";
  const serviceName = searchParams.get("service") || "Your Treatment";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";

  const [countdown, setCountdown] = useState(10);

  // Auto-redirect to WhatsApp after 10 seconds
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleWhatsAppRedirect = () => {
    const text = `Hello Blasuu Lounge! I'd like to confirm my booking.%0A%0A*Ref:* ${bookingRef}%0A*Service:* ${serviceName}%0A*Date:* ${date}%0A*Time:* ${time}%0A%0APlease send payment details to confirm.`;
    window.location.href = `https://wa.me/${businessConfig.whatsappNumber}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-white-soft flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-white-pure p-8 rounded-3xl border border-elephant/10 shadow-lg text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>

        <h1 className="text-3xl font-serif text-elephant mb-2">
          Booking Received!
        </h1>
        <p className="text-elephant-muted mb-8 text-sm">
          Your appointment has been saved. To finalize your booking, please send
          the confirmation message to us on WhatsApp.
        </p>

        {/* Premium Details Box */}
        <div className="bg-white-soft p-5 rounded-2xl border border-elephant/10 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center border-b border-elephant/10 pb-3">
            <span className="text-xs font-semibold text-elephant-muted uppercase tracking-wider">
              Reference
            </span>
            <span className="text-sm font-mono font-medium text-elephant bg-elephant/5 px-2 py-1 rounded">
              {bookingRef}
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-elephant-muted uppercase tracking-wider block mb-1">
              Service
            </span>
            <span className="text-sm font-medium text-elephant">
              {serviceName}
            </span>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-burnt" />
              <span className="text-sm text-elephant">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-burnt" />
              <span className="text-sm text-elephant">{time}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleWhatsAppRedirect}
          className="w-full py-4 text-lg flex items-center justify-center gap-2 mb-4 bg-[#25D366] hover:bg-[#1DA851] text-white border-none shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02]">
          <MessageCircle size={20} />
          Send WhatsApp Message
        </Button>

        <p className="text-xs text-elephant-muted mb-6">
          {countdown > 0
            ? `Redirecting automatically in ${countdown} seconds...`
            : "Click the button above to send."}
        </p>

        <Link
          to="/"
          className="text-sm font-medium text-elephant hover:text-burnt transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
