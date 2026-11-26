import { useState, useEffect } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Keep splash screen visible for 2.5 seconds before fading out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for fade-out animation (700ms) before removing from DOM
      setTimeout(onComplete, 700);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white-pure flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}>
      <div className="flex flex-col items-center">
        <img
          src="/icon-192.png"
          alt="Blasuu Beauty Lounge"
          className="w-48 md:w-64 lg:w-80 h-auto object-contain animate-[premiumLogoReveal_1.5s_ease-out_forwards]"
          style={{ opacity: 0, transform: "scale(0.95)" }} />

        
        <div className="mt-12 w-32 md:w-48 h-[2px] bg-elephant/10 overflow-hidden relative rounded-full">
          <div className="absolute top-0 left-0 h-full w-full bg-burnt origin-left animate-[premiumLoadBar_2s_ease-in-out_forwards]" />
        </div>
      </div>

      <style>{`
        @keyframes premiumLogoReveal {
          0% {
            opacity: 0;
            transform: scale(0.95);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }

        @keyframes premiumLoadBar {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
