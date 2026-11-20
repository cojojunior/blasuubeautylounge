import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "../lib/whatsapp";

export function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("ref");
  const isTest = searchParams.get("test_paid") === "true";

  const [status, setStatus] = useState<"loading" | "confirmed" | "pending">(
    "loading",
  );
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    if (!bookingId) return;

    const verifyPayment = async () => {
      // 1. If it's a test, manually update the database to confirmed
      if (isTest) {
        console.log("TEST MODE: Simulating Moolre Webhook...");
        const { error: updateError } = await supabase
          .from("appointments")
          .update({ status: "confirmed" })
          .eq("id", bookingId);

        if (updateError) {
          console.error("Failed to update status:", updateError);
          alert("Test Error: Could not update database. Check console.");
        } else {
          console.log("TEST MODE: Database updated successfully to confirmed.");
        }
      }

      // 2. Fetch the latest data
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("id", bookingId)
        .single();

      if (error) {
        console.error("Fetch error:", error);
        setStatus("pending");
        return false;
      }

      if (data) {
        setBookingData(data);
        if (data.status === "confirmed") {
          setStatus("confirmed");
          return true; // Stop polling
        } else {
          setStatus("pending");
        }
      }
      return false;
    };

    // Run immediately
    verifyPayment();

    // Poll every 2 seconds just in case
    const interval = setInterval(async () => {
      const isDone = await verifyPayment();
      if (isDone) clearInterval(interval);
    }, 2000);

    return () => clearInterval(interval);
  }, [bookingId, isTest]);

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
            <p className="text-elephant-muted text-sm">Please wait...</p>
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
              We haven't received confirmation yet. If you are testing, check
              the browser console for errors.
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
