import { X } from "lucide-react";
import { Button } from "../ui/Button";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export function PolicyModal({ isOpen, onClose, onAgree }: PolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-elephant/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white-pure w-full max-w-md rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[80vh] animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-elephant/10">
          <h3 className="font-serif font-semibold text-lg text-elephant">
            Policies & Terms
          </h3>
          <button
            onClick={onClose}
            className="text-elephant-muted hover:text-elephant p-1">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-elephant-muted leading-relaxed">
          <h4 className="font-semibold text-elephant">Booking Fee & Refunds</h4>
          <p>
            A booking fee is required to secure your appointment. 60% of your
            booking fee is refundable only if you cancel at least 15 days before
            your appointment date. The remaining 40% is non-refundable and
            covers administrative and reservation costs.
          </p>
          <p>
            Cancellations made within 15 days of the appointment, no-shows, and
            late arrivals are not refundable. Rescheduling carries your deposit
            over to the new date, provided it is done at least 15 days before
            the original appointment.
          </p>

          <h4 className="font-semibold text-elephant pt-2">
            Arrival & Lateness
          </h4>
          <p>
            Please arrive 10 minutes early. Lateness may result in a shortened
            service time to respect the next client's booking.
          </p>

          <h4 className="font-semibold text-elephant pt-2">Data & Privacy</h4>
          <p>
            We collect your name, phone number, and email to manage your
            booking. We do not sell your data. Your information is stored
            securely using Supabase. Payment details are handled entirely by
            Paystack.
          </p>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-elephant/10 bg-white-soft">
          <Button
            onClick={() => {
              onAgree();
              onClose();
            }}
            className="w-full">
            I Understand & Agree
          </Button>
        </div>
      </div>
    </div>
  );
}
