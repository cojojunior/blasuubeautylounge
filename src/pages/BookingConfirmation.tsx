import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { CheckCircle2, Loader2, MessageCircle, XCircle } from "lucide-react";
import { getWhatsAppLink } from "../lib/whatsapp";

export function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("ref");

  // Added "notfound" to the status types
  const [status, setStatus] = useState<
    "loading" | "confirmed" | "pending" | "notfound"
  >("loading");
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // If there's no ref ID in the URL, show not found immediately
    if (!bookingId) {
      setStatus("notfound");
      return;
    }

    const checkStatus = async () => {
      // Use the secure RPC we created in the SQL editor
      const { data, error } = await supabase.rpc("get_booking_by_ref", {
        booking_id: bookingId,
      });

      if (error) {
        console.error("Error fetching booking:", error);
        return true; // Stop polling on network/database error
      }

      // RPC returns an array. Grab the first item, or null if empty.
      const booking = data && data.length > 0 ? data[0] : null;

      if (!booking) {
        setStatus("notfound");
        return true; // Stop polling. The booking doesn't exist.
      }

      setBookingData(booking);

      if (booking.status === "confirmed") {
        setStatus("confirmed");
        return true; // Stop polling. We are done.
      }

      setStatus("pending");
      return false; // Keep polling. The webhook hasn't confirmed it yet.
    };

    checkStatus();
    const interval = setInterval(async () => {
      const isDone = await checkStatus();
      if (isDone) clearInterval(interval);
    }, 3000);

    return () => clearInterval(interval);
  }, [bookingId]);

  const handleWhatsApp = () => {
    if (!bookingData) return;
    const message = `Hello Blasuu Lounge! I just paid my deposit for booking ref *${bookingData.id.split("-")[0].toUpperCase()}*.\n\n*Service:* ${bookingData.service_name}\n*Date:* ${bookingData.appointment_date} at ${bookingData.appointment_time}\n\nPlease confirm my appointment!`;
    window.location.href = getWhatsAppLink(message);
  };

  return (
    <div className="min-h-screen bg-white-pure flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white-soft p-8 rounded-3xl border border-black/10 text-center shadow-lg">
        {status === "loading" && (
          <>
            <Loader2
              size={48}
              className="animate-spin text-burnt mx-auto mb-4"
            />
            <h2 className="text-2xl font-serif mb-2">Verifying Payment</h2>
            <p className="text-elephant-muted text-sm">
              Please wait while we confirm your transaction with Moolre...
            </p>
          </>
        )}

        {status === "confirmed" && (
          <>
            <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif mb-2">Payment Confirmed!</h2>
            <p className="text-elephant-muted text-sm mb-6">
              Your deposit has been received. Click below to finalize your
              appointment via WhatsApp.
            </p>
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2">
              <MessageCircle size={20} /> Send Booking to WhatsApp
            </button>
          </>
        )}

        {status === "pending" && (
          <>
            <Loader2
              size={48}
              className="animate-spin text-burnt mx-auto mb-4"
            />
            <h2 className="text-2xl font-serif mb-2">Payment Pending</h2>
            <p className="text-elephant-muted text-sm mb-6">
              We haven't received confirmation yet. If you just paid, please
              wait a moment.
            </p>
            <Link to="/" className="text-burnt hover:underline text-sm">
              Return Home
            </Link>
          </>
        )}

        {status === "notfound" && (
          <>
            <XCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif mb-2">Booking Not Found</h2>
            <p className="text-elephant-muted text-sm mb-6">
              We couldn't find this booking. Please check your link or contact
              us.
            </p>
            <Link to="/" className="text-burnt hover:underline text-sm">
              Return Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
