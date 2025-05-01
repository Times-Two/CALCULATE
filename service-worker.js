const CACHE_NAME = "calculator-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./calculate.css",
  "./app.js",
  "./manifest.json",
  "./theo.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(err => {
        console.warn("Cache failed:", err);
      });
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
