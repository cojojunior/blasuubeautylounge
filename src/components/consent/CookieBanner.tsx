import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setIsVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-elephant text-white-pure p-4 z-50 animate-slide-up shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-elephant-light">
          We use cookies to improve your experience. By continuing, you agree to
          our{" "}
          <Link to="/policies/cookies" className="text-gold hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex gap-3 w-full md:w-auto">
          <Button
            onClick={acceptCookies}
            size="sm"
            className="w-full md:w-auto">
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
