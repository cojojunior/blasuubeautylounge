import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

export function InstallPwaBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Check if the app is already installed (standalone mode)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone;

    // 2. Check if the user has EVER seen/dismissed this banner (using localStorage)
    const hasSeenBanner = localStorage.getItem("pwa_banner_seen_once");

    if (isStandalone || hasSeenBanner) return;

    // 3. Listen for the browser's install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);

      // Mark it as seen immediately when it pops up, so even if they refresh
      // before the 10s timer ends, it won't show again.
      localStorage.setItem("pwa_banner_seen_once", "true");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  // Handle the silent 10-second timer
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      closeBanner();
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [isVisible]);

  const closeBanner = () => {
    setIsVisible(false);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the PWA install");
    } else {
      console.log("User dismissed the PWA install");
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-96 z-[90]"
      style={{ animation: "slideUp 0.5s ease-out forwards" }}>
      <div className="bg-white-pure rounded-2xl shadow-2xl border border-elephant/10 p-4 flex items-center gap-4 relative">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-burnt/10 flex items-center justify-center flex-shrink-0">
          <Download className="text-burnt" size={24} />
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-elephant">
            Install Blasuu App
          </h3>
          <p className="text-xs text-elephant-muted mt-0.5">
            Book faster, right from your home screen.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={closeBanner}
            className="text-elephant-muted hover:text-elephant transition-colors"
            aria-label="Close">
            <X size={16} />
          </button>
          <button
            onClick={handleInstallClick}
            className="bg-burnt text-white-pure text-xs font-medium px-4 py-2 rounded-lg hover:bg-burnt/90 transition-colors whitespace-nowrap shadow-sm">
            Install Now
          </button>
        </div>
      </div>
    </div>
  );
}
