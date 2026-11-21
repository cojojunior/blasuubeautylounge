const CACHE_NAME = "blasuu-cache-v3"; // Bumped to v3 to force update again
const urlsToCache = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  // 1. Only handle GET requests (never cache POST/PUT/DELETE to Supabase)
  if (event.request.method !== "GET") return;

  // 2. Ignore Supabase API calls completely. Let them go straight to the network.
  if (event.request.url.includes("supabase.co")) return;

  // 3. Handle Page Navigations (React Router) - Network First, fallback to cache
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If network fails (offline), serve the cached index.html
        return caches.match("/index.html");
      }),
    );
    return;
  }

  // 4. Handle Static Assets (Images, JS, CSS) - Cache First, fallback to network
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached asset if we have it
      if (response) return response;

      // Otherwise fetch from network
      return fetch(event.request).catch(() => {
        // If it's an image and network fails, you can return a placeholder here
        // For now, we just let it fail silently in the background
      });
    }),
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});
