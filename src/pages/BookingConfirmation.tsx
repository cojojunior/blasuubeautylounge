import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  CheckCircle2,
  Loader2,
  MessageCircle,
  XCircle,
  Building2,
} from "lucide-react";
import { getWhatsAppLink } from "../lib/whatsapp";

export function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("ref");

  const [status, setStatus] = useState<
    "loading" | "confirmed" | "pending" | "notfound"
  >("loading");
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    if (!bookingId) {
      setStatus("notfound");
      return;
    }

    const checkStatus = async () => {
      const { data, error } = await supabase.rpc("get_booking_by_ref", {
        booking_id: bookingId,
      });

      if (error) return true;
      const booking = data && data.length > 0 ? data[0] : null;

      if (!booking) {
        setStatus("notfound");
        return true;
      }

      setBookingData(booking);

      if (booking.status === "confirmed") {
        setStatus("confirmed");
        return true;
      }

      setStatus("pending");
      return false;
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

  // Parse bank details if they exist
  const bankDetails = bookingData?.bank_details
    ? JSON.parse(bookingData.bank_details)
    : null;

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
              Please wait while we check your payment status...
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

        {status === "pending" && bankDetails && (
          <>
            <Building2 size={48} className="text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif mb-2">Pay via Bank Transfer</h2>
            <p className="text-elephant-muted text-sm mb-6">
              Please transfer <strong>GH₵ {bookingData.deposit_amount}</strong>{" "}
              to the following account. Your booking will be confirmed
              automatically once the transfer is received.
            </p>
            <div className="bg-white-pure p-4 rounded-xl border border-elephant/10 text-left mb-6">
              <p className="text-sm text-elephant-muted mb-1">Bank Name</p>
              <p className="font-semibold text-elephant mb-3">
                {bankDetails.bankname || "First Atlantic Bank"}
              </p>

              <p className="text-sm text-elephant-muted mb-1">Account Name</p>
              <p className="font-semibold text-elephant mb-3">
                {bankDetails.accountname}
              </p>

              <p className="text-sm text-elephant-muted mb-1">Account Number</p>
              <p className="text-2xl font-mono font-bold text-burnt tracking-wider">
                {bankDetails.accountno}
              </p>
            </div>
            <p className="text-xs text-elephant-muted mb-6">
              Use <strong>{bookingData.id.split("-")[0].toUpperCase()}</strong>{" "}
              as the transfer reference.
            </p>
            <Link
              to="/"
              className="text-burnt hover:underline text-sm font-medium">
              I have made the transfer
            </Link>
          </>
        )}

        {status === "pending" && !bankDetails && (
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
