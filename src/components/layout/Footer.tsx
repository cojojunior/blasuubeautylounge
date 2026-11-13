import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Globe, MessageCircle } from "lucide-react";
import { businessConfig } from "../../config/business";

export function Footer() {
  return (
    <footer className="bg-elephant text-white-pure pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Changed to 2 columns on mobile/tablet */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand & About (Spans full width on mobile) */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="/icon-512.png"
                alt="Blasuu Beauty Lounge"
                className="h-12 md:h-14 w-auto object-contain rounded-[2rem]"
              />
            </Link>

            <p className="text-elephant-light text-sm leading-relaxed max-w-xs mt-4">
              A premium beauty lounge offering luxury spa treatments, nails, and
              wellness in the heart of Accra.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href={businessConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-elephant-light hover:text-gold transition-colors"
                aria-label="Instagram">
                <Globe size={20} />
              </a>
              <a
                href={businessConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-elephant-light hover:text-gold transition-colors"
                aria-label="Facebook">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg text-white-pure mb-4">Explore</h3>
            <ul className="space-y-3 text-sm text-elephant-light">
              <li>
                <Link
                  to="/services"
                  className="hover:text-gold transition-colors">
                  Services & Packages
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-gold transition-colors">
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="hover:text-gold transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg text-white-pure mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-elephant-light">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-0.5 text-gold" />
                <span>{businessConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-gold" />
                <a
                  href={`tel:${businessConfig.phone}`}
                  className="hover:text-white-pure transition-colors">
                  {businessConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-gold" />
                <a
                  href={`mailto:${businessConfig.email}`}
                  className="hover:text-white-pure transition-colors">
                  {businessConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal (Starts on the left side of the second row on mobile) */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="font-serif text-lg text-white-pure mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-elephant-light">
              <li>
                <Link
                  to="/policies/terms"
                  className="hover:text-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/policies/booking-fee"
                  className="hover:text-gold transition-colors">
                  Booking Fee Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/policies/cancellation"
                  className="hover:text-gold transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/policies/privacy"
                  className="hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white-pure/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-elephant-light text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} {businessConfig.name}. All rights
            reserved.
          </p>
          <p>Designed for luxury. Built for you.</p>
        </div>
      </div>
    </footer>
  );
}
