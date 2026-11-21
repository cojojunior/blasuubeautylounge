import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  LayoutDashboard,
  CalendarDays,
  DollarSign,
  Scissors,
  Clock,
  Ban,
  Bell,
  ShieldCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // 1. Change the manifest to the admin version
    const manifestLink = document.querySelector('link[rel="manifest"]');
    const originalManifest =
      manifestLink?.getAttribute("href") || "/manifest.json";
    if (manifestLink) manifestLink.setAttribute("href", "/admin-manifest.json");

    // 2. Change the theme color to Burnt Orange for the admin app
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const originalTheme = themeMeta?.getAttribute("content") || "#2E2E2E";
    if (themeMeta) themeMeta.setAttribute("content", "#C6511B");

    // Cleanup: revert back to public settings when leaving admin
    return () => {
      if (manifestLink) manifestLink.setAttribute("href", originalManifest);
      if (themeMeta) themeMeta.setAttribute("content", originalTheme);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Appointments", path: "/admin/appointments", icon: CalendarDays },
    { name: "Payments", path: "/admin/payments", icon: DollarSign },
    { name: "Services", path: "/admin/services", icon: Scissors },
    { name: "Business Hours", path: "/admin/hours", icon: Clock },
    { name: "Blocked Slots", path: "/admin/blocked", icon: Ban },
    { name: "Notifications", path: "/admin/notifications", icon: Bell },
    { name: "Policies", path: "/admin/policies", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-elephant/5 flex flex-col md:flex-row">
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden bg-white-pure border-b border-elephant/10 p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-serif text-elephant">Blasuu Admin</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-elephant">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- SIDEBAR (Desktop) & SLIDE-OUT MENU (Mobile) --- */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white-pure border-r border-elephant/10 flex-col z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0 flex"
            : "-translate-x-full hidden md:flex"
        }`}>
        {/* Desktop Logo */}
        <div className="hidden md:block p-6 border-b border-elephant/10">
          <h1 className="text-xl font-serif text-elephant">Blasuu Admin</h1>
        </div>

        {/* Mobile Close Button */}
        <div className="md:hidden p-4 flex justify-end">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-elephant">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  isActive
                    ? "bg-burnt text-white-pure shadow-md"
                    : "text-elephant-muted hover:bg-elephant/5 hover:text-elephant"
                }`}>
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-elephant/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-all text-sm font-medium">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* --- MOBILE OVERLAY --- */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-elephant/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
