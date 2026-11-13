import { businessConfig } from "../config/business";

// Helper to format a Ghanaian phone number for the admin to chat with a customer
const formatPhone = (phone: string) => {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "233" + cleaned.substring(1);
  }
  return cleaned;
};

// For the business number (used by customers)
export const getWhatsAppLink = (message: string) => {
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

// For arbitrary numbers (used by admin to chat with customers)
export const getCustomerWhatsAppLink = (phone: string, message: string) => {
  const formattedPhone = formatPhone(phone);
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};

// Generate the booking confirmation message
export const generateBookingMessage = (
  ref: string,
  service: string,
  date: string,
  time: string,
  name: string,
  deposit: number,
) => {
  return `Hello Blasuu Lounge! I'd like to confirm my booking.\n*Service:* ${service}\n*Date:* ${date}\n*Time:* ${time}\n*Name:* ${name}\n*Deposit Due:* GH₵${deposit}\n\nPlease confirm payment.\n*Ref:* ${ref}\n\n\nAdd your momo name:* \n\nThank you!`;
};
