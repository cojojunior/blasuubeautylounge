import { businessConfig } from "../config/business";

export const getWhatsAppLink = (message: string) => {
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const generateBookingMessage = (
  ref: string,
  service: string,
  date: string,
  time: string,
  name: string,
  deposit: number,
) => {
  return `Hello Blasuu Lounge! I'd like to confirm my booking.\n\n*Ref:* ${ref}\n*Service:* ${service}\n*Date:* ${date}\n*Time:* ${time}\n*Name:* ${name}\n*Deposit Due:* GH₵${deposit}\n\nPlease confirm payment.\\n\n Add your momo name:* \\n\n Thank you!`;
};
