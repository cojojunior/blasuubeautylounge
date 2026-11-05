import { Link } from "react-router-dom";

interface MobileNavProps {
  isOpen: boolean;
  navLinks: { name: string; path: string }[];
  currentPath: string;
  onClose: () => void;
}

export function MobileNav({
  isOpen,
  navLinks,
  currentPath,
  onClose,
}: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white-soft border-b border-elephant/10">
      <div className="px-4 pt-2 pb-6 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={onClose}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              currentPath === link.path
                ? "bg-burnt/5 text-burnt"
                : "text-elephant hover:bg-elephant/5"
            }`}>
            {link.name}
          </Link>
        ))}
        <div className="pt-4 border-t border-elephant/10 flex flex-col gap-3">
          <Link
            to="/book"
            onClick={onClose}
            className="block w-full text-center bg-burnt hover:bg-burnt-dark text-white-pure px-6 py-3 rounded-full text-base font-medium transition-colors">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
