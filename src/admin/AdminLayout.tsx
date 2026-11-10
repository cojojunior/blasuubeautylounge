import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
  useEffect(() => {
    // 1. Change the manifest to the admin version
    const manifestLink = document.querySelector('link[rel="manifest"]');
    const originalManifest =
      manifestLink?.getAttribute("href") || "/manifest.json";

    if (manifestLink) {
      manifestLink.setAttribute("href", "/admin-manifest.json");
    }

    // 2. Change the theme color to Burnt Orange for the admin app
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const originalTheme = themeMeta?.getAttribute("content") || "#2E2E2E";

    if (themeMeta) {
      themeMeta.setAttribute("content", "#C6511B");
    }

    // Cleanup: revert back to public settings when leaving admin
    return () => {
      if (manifestLink) manifestLink.setAttribute("href", originalManifest);
      if (themeMeta) themeMeta.setAttribute("content", originalTheme);
    };
  }, []);

  return (
    <div className="min-h-screen bg-elephant/5">
      <Outlet />
    </div>
  );
}
