const CACHE_NAME = "blasuu-cache-v3";

// The core files we want to save offline so the app can boot without internet
const urlsToCache = ["/", "/index.html", "/manifest.json"];

// --- 1. INSTALL EVENT ---
// This runs when the Service Worker is first registered or when the CACHE_NAME changes.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Download and save the core files into the cache
      return cache.addAll(urlsToCache);
    }),
  );

  // This prevents the "blank screen" issue where the app is stuck on an old version.
  self.skipWaiting();
});

// --- 2. FETCH EVENT ---
// This intercepts every network request the app makes.
self.addEventListener("fetch", (event) => {
  // We only want to cache GET requests (like loading a page or an image).
  if (event.request.method !== "GET") return;

  // We want real-time data to always go directly to the network, never serve stale cache.
  if (event.request.url.includes("supabase.co")) return;

  // RULE C: Handle Page Navigations (e.g., user types /book in the URL bar)
  // Strategy: Network First. Try to get the latest page; if offline, serve the cached index.html.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/index.html");
      }),
    );
    return;
  }

  // Strategy: Cache First. Load instantly from cache; if not found, fetch from network.
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If the file is in the cache, return it immediately (blazing fast load times)
      if (response) return response;

      // If it's not in the cache, fetch it from the network
      return fetch(event.request).catch(() => {
     });
    }),
  );
});

// --- 3. ACTIVATE EVENT ---
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        // Loop through all existing caches
        return Promise.all(
          cacheNames.map((cacheName) => {
            // If the cache name is NOT in our whitelist (e.g., "blasuu-cache-v2"), delete it!
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      // Take control of all open pages immediately so the new cache rules apply instantly.
      .then(() => self.clients.claim()),
  );
});
