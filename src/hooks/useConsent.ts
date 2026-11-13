import { useState, useEffect } from "react";

export function useConsent() {
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    setHasConsented(consent === "true");
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setHasConsented(true);
  };

  return { hasConsented, acceptCookies };
}
