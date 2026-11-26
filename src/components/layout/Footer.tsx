import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa6";
import { businessConfig } from "../../config/business";

export function Footer() {
  return (
    <footer className="w-full bg-[#0F1115] text-white-pure">
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
                <FaInstagram className="text-white-pure" />
              </a>
              <a
                href={businessConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-burnt hover:border-burnt transition-all">
                <FaFacebookF className="text-white-pure" />
              </a>
              <a
                href={businessConfig.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-burnt hover:border-burnt transition-all">
                <FaTiktok className="text-white-pure" />
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
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="font-serif font-semibold text-lg !text-white mb-4">
              Contact & Hours
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

              {/* NEW: Hours in Footer */}
              <li className="flex items-start gap-3 pt-2">
                <Clock
                  size={18}
                  className="text-gray-500 mt-0.5 flex-shrink-0"
                />
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-white-pure font-medium mb-1">
                    Hours
                  </span>
                  <span className="flex justify-between w-40">
                    <span>Mon, Wed-Fri:</span> <span>9:00 – 20:00</span>
                  </span>
                  <span className="flex justify-between w-40">
                    <span>Tue:</span> <span>10:00 – 20:00</span>
                  </span>
                  <span className="flex justify-between w-40">
                    <span>Sat:</span> <span>8:00 – 20:00</span>
                  </span>
                  <span className="flex justify-between w-40">
                    <span>Sun:</span> <span>14:00 – 19:30</span>
                  </span>
                </div>
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
