import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { businessConfig } from "../../config/business";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Availability", path: "/availability" },
  { name: "Reviews", path: "/reviews" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white-soft/90 backdrop-blur-md border-b border-elephant/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - UPDATED */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <img
              src="/icon-512.png"
              alt="Blasuu Beauty Lounge"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-burnt ${
                  location.pathname === link.path
                    ? "text-burnt"
                    : "text-elephant"
                }`}>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${businessConfig.phone}`}
              className="flex items-center gap-2 text-sm font-medium text-elephant hover:text-burnt transition-colors">
              <Phone size={16} />
              {businessConfig.phone}
            </a>
            <Link
              to="/book"
              className="bg-burnt hover:bg-burnt-dark text-white-pure px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-elephant hover:text-burnt p-2"
              aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white-soft border-b border-elephant/10">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? "bg-burnt/5 text-burnt"
                    : "text-elephant hover:bg-elephant/5"
                }`}>
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-elephant/10 flex flex-col gap-3">
              <a
                href={`tel:${businessConfig.phone}`}
                className="flex items-center gap-2 px-3 py-2 text-elephant font-medium">
                <Phone size={18} />
                {businessConfig.phone}
              </a>
              <Link
                to="/book"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-burnt hover:bg-burnt-dark text-white-pure px-6 py-3 rounded-full text-base font-medium transition-colors">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
