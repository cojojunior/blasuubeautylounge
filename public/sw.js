const CACHE_NAME = "blasuu-cache-v2"; // Bumped version to force update
const urlsToCache = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
  self.skipWaiting(); // Force the waiting service worker to become the active service worker
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests (ignore POST, etc.)
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // 1. Return cached response if found
        if (response) {
          return response;
        }

        // 2. If not in cache, fetch from network
        return fetch(event.request).then((networkResponse) => {
          // Optional: You can add logic here to cache new pages dynamically
          return networkResponse;
        });
      })
      .catch(() => {
        // 3. If BOTH cache and network fail, return the cached index.html
        // This allows React Router to handle the route client-side
        return caches.match("/index.html");
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
      .then(() => self.clients.claim()), // Take control of all pages immediately
  );
});
