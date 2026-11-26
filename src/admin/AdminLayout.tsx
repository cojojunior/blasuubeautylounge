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
import { SplashScreen } from "../components/sections/SplashScreen";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- ADDED: Splash state ---
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const manifestLink = document.querySelector('link[rel="manifest"]');
    const originalManifest =
      manifestLink?.getAttribute("href") || "/manifest.json";
    if (manifestLink) manifestLink.setAttribute("href", "/admin-manifest.json");

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const originalTheme = themeMeta?.getAttribute("content") || "#2E2E2E";
    if (themeMeta) themeMeta.setAttribute("content", "#C6511B");

    return () => {
      if (manifestLink) manifestLink.setAttribute("href", originalManifest);
      if (themeMeta) themeMeta.setAttribute("content", originalTheme);
    };
  }, []);

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
    <>
      {/* --- SPLASH SCREEN OVERLAY --- */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <div className="flex h-screen overflow-hidden bg-elephant/5">
        {/* --- MOBILE SIDEBAR OVERLAY --- */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-elephant/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* --- SIDEBAR --- */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white-pure border-r border-elephant/10 flex flex-col transform transition-transform duration-300 lg:static lg:translate-x-0 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          <div className="p-6 border-b border-elephant/10 flex justify-between items-center">
            <h1 className="text-xl font-serif text-elephant">Blasuu Admin</h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-elephant-muted hover:text-elephant">
              <X size={20} />
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

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile Header */}
          <header className="lg:hidden bg-white-pure border-b border-elephant/10 p-4 flex items-center gap-4 sticky top-0 z-30">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-elephant">
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-serif text-elephant">Admin</h1>
          </header>

          {/* Scrollable Page Content */}
          <div
            className={`flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 transition-opacity duration-1000 ${
              showSplash ? "opacity-0" : "opacity-100"
            }`}>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
