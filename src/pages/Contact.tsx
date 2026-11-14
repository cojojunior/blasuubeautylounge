import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { businessConfig } from "../config/business";
import { Button } from "../components/ui/Button";

export function Contact() {
  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-elephant">
            Get in Touch
          </h1>
          <p className="text-elephant-muted max-w-2xl mx-auto text-lg">
            We'd love to hear from you. Whether you have a question about our
            services or want to book a consultation, our team is ready to
            assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white-pure rounded-3xl border border-elephant/10 shadow-sm overflow-hidden">
          {/* Contact Details */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-serif mb-8">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-burnt/10 flex items-center justify-center flex-shrink-0 text-burnt">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-elephant">Location</h3>
                  <p className="text-elephant-muted text-sm mt-1">
                    {businessConfig.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-burnt/10 flex items-center justify-center flex-shrink-0 text-burnt">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-elephant">Phone</h3>
                  <a
                    href={`tel:${businessConfig.phone}`}
                    className="text-elephant-muted text-sm mt-1 hover:text-burnt">
                    {businessConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-burnt/10 flex items-center justify-center flex-shrink-0 text-burnt">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-elephant">Email</h3>
                  <a
                    href={`mailto:${businessConfig.email}`}
                    className="text-elephant-muted text-sm mt-1 hover:text-burnt">
                    {businessConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-burnt/10 flex items-center justify-center flex-shrink-0 text-burnt">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-elephant">Hours</h3>
                  <p className="text-elephant-muted text-sm mt-1">
                    Mon - Sat: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-elephant-muted text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-elephant/10">
              <a
                href={`https://wa.me/${businessConfig.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-full">
                <Button className="w-full">Chat with us on WhatsApp</Button>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="h-64 lg:h-auto bg-elephant/5 relative min-h-[400px]">
            <iframe
              title="Blasuu Beauty Lounge Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.411456140866!2d-0.1666173!3d5.6830527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zLMKwNDEnMDAuMCJOIDDCsDA5JzU5LjgiVw!5e0!3m2!1sen!2sgh!4v1620000000000!5m2!1sen!2sgh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
