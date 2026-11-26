import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

export function InstallPwaBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    // 1. Check if the app is already installed (running in standalone mode)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone;

    // 2. Check if the user previously dismissed the banner this session
    const hasDismissed = sessionStorage.getItem("pwa_banner_dismissed");

    if (isStandalone || hasDismissed) return;

    // 3. Listen for the browser's install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); // Prevent the default mini-infobar
      setDeferredPrompt(e); // Stash the event so it can be triggered later
      setIsVisible(true); // Show our custom banner
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Cleanup
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  // Handle the 10-second countdown
  useEffect(() => {
    if (!isVisible) return;

    if (timeLeft <= 0) {
      closeBanner();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isVisible, timeLeft]);

  const closeBanner = () => {
    setIsVisible(false);
    // Remember they dismissed it so we don't annoy them on every page reload
    sessionStorage.setItem("pwa_banner_dismissed", "true");
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the native browser install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the PWA install");
    } else {
      console.log("User dismissed the PWA install");
    }

    // Clear the deferred prompt and hide our banner
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-96 z-[90]"
      style={{ animation: "slideUp 0.5s ease-out forwards" }}>
      <div className="bg-white-pure rounded-2xl shadow-2xl border border-elephant/10 p-4 flex items-center gap-4 relative overflow-hidden">
        {" "}
        {/* Progress Bar (Visualizes the 10s) */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-burnt transition-all duration-1000 ease-linear"
          style={{ width: `${(timeLeft / 10) * 100}%` }}
        />
        <div className="w-12 h-12 rounded-xl bg-burnt/10 flex items-center justify-center flex-shrink-0">
          <Download className="text-burnt" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-elephant">
            Install Blasuu App
          </h3>
          <p className="text-xs text-elephant-muted mt-0.5">
            Book faster, right from your home screen.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={closeBanner}
            className="text-elephant-muted hover:text-elephant p-1 self-end"
            aria-label="Close">
            <X size={16} />
          </button>
          <button
            onClick={handleInstallClick}
            className="bg-burnt text-white-pure text-xs font-medium px-4 py-2 rounded-lg hover:bg-burnt/90 transition-colors whitespace-nowrap">
            Install Now
          </button>
        </div>
      </div>
    </div>
  );
}
