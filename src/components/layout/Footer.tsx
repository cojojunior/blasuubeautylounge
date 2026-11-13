import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Globe, MessageCircle } from "lucide-react";
import { businessConfig } from "../../config/business";

export function Footer() {
  return (
    <footer className="bg-white-pure py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-[#0F1115] rounded-3xl p-8 md:p-12 text-white-pure shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand, About & Contact Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-4">
              <img
                src="/icon-512.png"
                alt="Blasuu Logo"
                className="h-15 w-15 rounded-[20%] object-contain"
              />
              <div>
                <p className="font-semibold text-2xl leading-normal text-white-pure">
                  Blasuu
                </p>
                <p className="text-[20px] text-gray-400 leading-tight">
                  Beauty Lounge
                </p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Empowering your beauty journey with luxury spa treatments, nails,
              and wellness in the heart of Accra.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mb-6">
              <a
                href={businessConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-burnt transition-colors">
                <Globe size={14} className="text-white-pure" />
              </a>
              <a
                href={businessConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-burnt transition-colors">
                <MessageCircle size={14} className="text-white-pure" />
              </a>
            </div>

            {/* Contact Details (Now using the unused icons) */}
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin
                  size={16}
                  className="text-gray-500 mt-0.5 flex-shrink-0"
                />
                <span>{businessConfig.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500 flex-shrink-0" />
                <a
                  href={`tel:${businessConfig.phone}`}
                  className="hover:text-white-pure transition-colors">
                  {businessConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500 flex-shrink-0" />
                <a
                  href={`mailto:${businessConfig.email}`}
                  className="hover:text-white-pure transition-colors">
                  {businessConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-semibold text-sm text-white-pure mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/services"
                  className="hover:text-white-pure transition-colors">
                  Services & Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/book"
                  className="hover:text-white-pure transition-colors">
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="hover:text-white-pure transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/availability"
                  className="hover:text-white-pure transition-colors">
                  Live Availability
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-sm text-white-pure mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white-pure transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white-pure transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white-pure transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white-pure transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links & Contact */}
          <div>
            <h3 className="font-semibold text-sm text-white-pure mb-4">
              Resources
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/policies/terms"
                  className="hover:text-white-pure transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/policies/privacy"
                  className="hover:text-white-pure transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/policies/cancellation"
                  className="hover:text-white-pure transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/policies/booking-fee"
                  className="hover:text-white-pure transition-colors">
                  Booking Fee Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-px w-full bg-white/10 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {businessConfig.name}. All rights
            reserved.
          </p>

          <div className="flex gap-6 text-xs text-gray-500">
            <Link
              to="/policies/privacy"
              className="hover:text-white-pure transition-colors">
              Privacy Policy
            </Link>
            <Link
              to="/policies/terms"
              className="hover:text-white-pure transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/policies/cookies"
              className="hover:text-white-pure transition-colors">
              Cookie Policy
            </Link>
            <Link
              to="/policies/refund"
              className="hover:text-white-pure transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
