const CACHE_NAME = "calculator-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./calculate.css",
  "./app.js",
  "./manifest.json",
  "./theo.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.warn("Some files failed to cache:", err);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
