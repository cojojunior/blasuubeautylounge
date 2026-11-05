import { MapPin, Phone, Mail } from "lucide-react";
import { businessConfig } from "../../config/business";

export function LocationSection() {
  return (
    <section className="py-24 bg-white-pure">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Visit Us in Madina
            </h2>
            <p className="text-elephant-muted mb-8">
              Conveniently located in the heart of Accra. We look forward to
              welcoming you.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MapPin className="text-burnt" />
                <span>{businessConfig.address}</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-burnt" />
                <span>{businessConfig.phone}</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-burnt" />
                <span>{businessConfig.email}</span>
              </div>
            </div>
          </div>

          <div className="h-80 rounded-3xl overflow-hidden bg-elephant/5 relative border border-elephant/10">
            {/* Using a generic Google Maps embed for Accra */}
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.411456140866!2d-0.1666173!3d5.6830527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zLMKwNDEnMDAuMCJOIDDCsDA5JzU5LjgiVw!5e0!3m2!1sen!2sgh!4v1620000000000!5m2!1sen!2sgh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
