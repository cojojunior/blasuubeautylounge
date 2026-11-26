import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Wait 2.5 seconds, then go to Home
    const timer = setTimeout(() => {
      navigate("/");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-elephant flex items-center justify-center z-[9999]">
      <img
        src="/splash.webp"
        alt="Blasuu Splash"
        className="w-full h-full object-cover animate-pulse"
      />
    </div>
  );
}
