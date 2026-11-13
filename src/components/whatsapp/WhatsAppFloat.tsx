import { MessageCircle } from "lucide-react";
// Fixed the path from '../config/business' to use our new utility
import { getWhatsAppLink } from "../../lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppLink(
        "Hello Blasuu Lounge! I have a question about your services.",
      )}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1DA851] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
      aria-label="Chat on WhatsApp">
      <MessageCircle size={28} />
    </a>
  );
}
