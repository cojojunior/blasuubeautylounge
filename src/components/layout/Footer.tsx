import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Globe, MessageCircle } from "lucide-react";
import { businessConfig } from "../../config/business";

export function Footer() {
  return (
    // Removed the outer padding and white background. The footer is now full width.
    <footer className="w-full bg-[#0F1115] text-white-pure">
      {/* Inner container to keep the text centered and readable */}
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-6">
          {/* Brand, About & Contact Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img
                src="/icon-512.png"
                alt="Blasuu Logo"
                className="h-15 w-15 rounded-full object-contain bg-white"
              />
              <div>
                <p className="font-serif font-bold text-lg leading-tight text-white-pure">
                  Blasuu
                </p>
                <p className="text-xs text-gray-400">Beauty Lounge</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              Empowering your beauty journey with luxury spa treatments, nails,
              and wellness in the heart of Accra.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href={businessConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-burnt hover:border-burnt transition-all">
                <Globe size={18} className="text-white-pure" />
              </a>
              <a
                href={businessConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-burnt hover:border-burnt transition-all">
                <MessageCircle size={18} className="text-white-pure" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg !text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link
                  to="/services"
                  className="hover:text-burnt transition-colors">
                  Services & Packages
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-burnt transition-colors">
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="hover:text-burnt transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/availability"
                  className="hover:text-burnt transition-colors">
                  Live Availability
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg !text-white mb-4">
              Company
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-burnt transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-burnt transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-burnt transition-colors">
                  Careers & Training
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-burnt transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg !text-white mb-4">
              Contact & Legal
            </h3>
            <ul className="space-y-4 text-sm text-gray-400 mb-6">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-gray-500 mt-0.5 flex-shrink-0"
                />
                <span>{businessConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gray-500 flex-shrink-0" />
                <a
                  href={`tel:${businessConfig.phone}`}
                  className="hover:text-burnt transition-colors">
                  {businessConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gray-500 flex-shrink-0" />
                <a
                  href={`mailto:${businessConfig.email}`}
                  className="hover:text-burnt transition-colors">
                  {businessConfig.email}
                </a>
              </li>
            </ul>
            <ul className="space-y-2 text-xs text-gray-500">
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
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-px w-full bg-white/10 mb-4"></div>

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
          </div>
        </div>
      </div>
    </footer>
  );
}
