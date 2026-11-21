import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for login/logout changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  // Show a loading state while checking auth (prevents flashing the login page)
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white-soft">
        <p className="text-elephant-muted">Verifying access...</p>
      </div>
    );
  }

  // If not logged in, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  // If logged in, render the child routes (Outlet)
  return <Outlet />;
}
